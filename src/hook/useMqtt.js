import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { HIVEMQ_CONNECTION_STRING } from "../constants";
import { getActiveDevices } from "../api/device";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../utills/socket";

const INACTIVITY_THRESHOLD = 30000;

const useMqtt = () => {
  const [clients, setClients] = useState({}); // Store MQTT clients per device
  const [deviceLocations, setDeviceLocations] = useState({}); // Store active device locations
  const [lastSeen, setLastSeen] = useState({}); // Track last seen time

  // Fetch active devices when the device status changes
  const { data: usersData, refetch: refreshDevices } = useQuery({
    queryKey: ["activeDevices"],
    queryFn: async () => {
      try {
        return await getActiveDevices();
      } catch (error) {
        console.error("🚨 Error fetching active devices:", error);
        return { devices: [] }; // Return empty list to clear everything
      }
    },
  });

  useEffect(() => {
    socket.on("deviceStatusUpdate", refreshDevices);
    return () => socket.off("deviceStatusUpdate");
  }, []);

  useEffect(() => {
    if (!usersData?.devices?.length) {
      console.warn("❌ No active devices found. Clearing all clients.");

      // **Disconnect all clients & clear state**
      Object.values(clients).forEach((client) => client.end());

      setClients({});
      setDeviceLocations({});
      setLastSeen({});
      return;
    }

    const activeDevices = usersData.devices.reduce((acc, device) => {
      acc[device.deviceName] = device.password;
      return acc;
    }, {});

    const currentClients = Object.keys(clients);

    // **1. Remove Inactive Devices**
    currentClients.forEach((deviceName) => {
      if (!activeDevices[deviceName]) {
        console.warn(`❌ Removing inactive device: ${deviceName}`);
        clients[deviceName].end(); // Disconnect MQTT client

        setClients((prev) => {
          const updatedClients = { ...prev };
          delete updatedClients[deviceName];
          return updatedClients;
        });

        setDeviceLocations((prev) => {
          const updatedLocations = { ...prev };
          delete updatedLocations[deviceName]; // Remove from map
          return updatedLocations;
        });

        setLastSeen((prev) => {
          const updatedLastSeen = { ...prev };
          delete updatedLastSeen[deviceName];
          return updatedLastSeen;
        });
      }
    });

    // **2. Add Newly Active Devices**
    Object.entries(activeDevices).forEach(([deviceName, password]) => {
      if (clients[deviceName]) return; // Skip if already connected

      console.log(`✅ Connecting new active device: ${deviceName}`);

      const options = {
        username: deviceName,
        password,
        clientId: `mqtt_${deviceName}_${Math.random().toString(16).slice(3)}`,
        reconnectPeriod: 5000,
        connectTimeout: 10000,
        clean: true,
      };

      const mqttClient = mqtt.connect(HIVEMQ_CONNECTION_STRING, options);

      mqttClient.on("connect", () => {
        console.log(`📡 ${deviceName} Connected to MQTT Broker`);
        mqttClient.subscribe(`tracking/location/${deviceName}`);
      });

      mqttClient.on("message", (topic, payload) => {
        try {
          const message = JSON.parse(payload.toString());
          const receivedDeviceName = topic.split("/")[2];

          if (activeDevices[receivedDeviceName]) {
            setDeviceLocations((prev) => ({
              ...prev,
              [receivedDeviceName]: message,
            }));

            setLastSeen((prev) => ({
              ...prev,
              [receivedDeviceName]: Date.now(), // Update last seen time
            }));
          }
        } catch (error) {
          console.error("❌ Error processing MQTT message:", error);
        }
      });

      setClients((prev) => ({ ...prev, [deviceName]: mqttClient }));
    });

    return () => {
      Object.values(clients).forEach((client) => client.end());
    };
  }, [usersData]);

  return { deviceLocations };
};

export default useMqtt;
