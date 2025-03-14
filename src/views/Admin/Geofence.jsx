import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMqttContext } from "../../context/MqttContext";
import L from "leaflet";

// Active device icon
const activeDeviceIcon = new L.Icon({
  iconUrl: "/location/active-device.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Inactivity timeout (milliseconds)
const INACTIVITY_THRESHOLD = 10000; // 10 seconds

const GeofenceMap = () => {
  const { deviceLocations } = useMqttContext();
  const [filteredLocations, setFilteredLocations] = useState({}); // Maintain active devices
  const [lastSeen, setLastSeen] = useState({}); // Track last seen timestamps

  // Update last seen timestamps when new location data arrives
  useEffect(() => {
    const now = Date.now();

    setLastSeen((prev) => {
      const updated = { ...prev };
      Object.keys(deviceLocations).forEach((deviceName) => {
        updated[deviceName] = now; // Mark device as recently seen
      });
      return updated;
    });

    setFilteredLocations(deviceLocations); // Sync active locations
  }, [deviceLocations]);

  // Remove inactive devices after the threshold
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setFilteredLocations((prevLocations) => {
        const updatedLocations = { ...prevLocations };

        Object.keys(lastSeen).forEach((deviceName) => {
          if (now - lastSeen[deviceName] > INACTIVITY_THRESHOLD) {
            delete updatedLocations[deviceName]; // Remove inactive devices
          }
        });

        return updatedLocations;
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [lastSeen]);

  // Find first valid location to center the map
  const validDevices = Object.values(filteredLocations).filter(
    (loc) => loc?.latitude !== undefined && loc?.longitude !== undefined
  );

  const center = validDevices.length
    ? [validDevices[0].latitude, validDevices[0].longitude]
    : [31.5, 74.3]; // Default fallback location

  return (
    <MapContainer center={center} zoom={18} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render active device markers */}
      {Object.entries(filteredLocations).map(([deviceName, location]) => {
        if (!location || location.latitude === undefined || location.longitude === undefined) {
          return null;
        }

        return (
          <Marker
            key={deviceName}
            position={[location.latitude, location.longitude]}
            icon={activeDeviceIcon}
          >
            <Popup>
              <strong>{deviceName}</strong>
              <br />
              Status: ✅ Active
              <br />
              Lat: {location.latitude}
              <br />
              Lng: {location.longitude}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default GeofenceMap;
