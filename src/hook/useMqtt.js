import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { HIVEMQ_CONNECTION_STRING } from "../constants";
import { getActiveDevices } from "../api/device";
import { useQuery } from "@tanstack/react-query";
import { socket } from "../utills/socket";

const useMqtt = () => {
  const [clients, setClients] = useState({}); // Store MQTT clients per device
  const [deviceLocations, setDeviceLocations] = useState({}); // Store active device locations
  const [stats, setStats] = useState();


  // Fetch active devices when the device status changes
  const { data: usersData, refetch: refreshDevices } = useQuery({
    queryKey: ["activeDevices"],
    queryFn: async () => {
      try {
        return await getActiveDevices();
      } catch (error) {
        console.error("🚨 Error fetching active devices:", error);
        return { devices: [] };
      }
    },
  });

  useEffect(() => {
    socket.on("deviceStatusUpdate", refreshDevices);
    return () => socket.off("deviceStatusUpdate");
  }, []);

  useEffect(() => {

    setStats({
      totalDevices:usersData?.totalCount || 0,
      activeDevices:usersData?.activeCount || 0,
      totalUsers: usersData?.totalUsers || 0,
    })


    if (!usersData?.devices?.length) {
      // Disconnect all clients & clear state
      Object.values(clients).forEach((client) => client.end());
      setClients({});
      setDeviceLocations({});
      return;
    }

    const activeDevices = usersData.devices.reduce((acc, device) => {
      acc[device.deviceName] = [device.password, `${device.user.firstName} ${device.user.lastName}`];
      return acc;
    }, {});

    const currentClients = Object.keys(clients);

    // Remove Inactive Devices
    currentClients.forEach((deviceName) => {
      if (!activeDevices[deviceName]) {
        console.warn(`❌ Removing inactive device: ${deviceName}`);
        clients[deviceName].end();

        setClients((prev) => {
          const updated = { ...prev };
          delete updated[deviceName];
          return updated;
        });

        setDeviceLocations((prev) => {
          const updated = { ...prev };
          delete updated[deviceName];
          return updated;
        });
      }
    });

    // Add Newly Active Devices
    Object.entries(activeDevices).forEach(([deviceName, [password, fullName]]) => {
      if (clients[deviceName]) return;

      console.log(`✅ Connecting new active device: ${deviceName} (${fullName})`);

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
            const [, fullName] = activeDevices[receivedDeviceName];
            setDeviceLocations((prev) => ({
              ...prev,
              [receivedDeviceName]: {
                ...message,
                fullName,
              },
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



  return { deviceLocations, stats };
};

export default useMqtt;
