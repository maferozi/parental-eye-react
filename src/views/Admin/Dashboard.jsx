import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMqttContext } from "../../context/MqttContext";
import L from "leaflet";

const activeDeviceIcon = new L.Icon({
  iconUrl: "/location/active-device.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const cards = [
  { id: 1, img: "/totalUser.png", description: "Total Users", number: 10 },
  { id: 2, img: "/activeUser.png", description: "Active Users", number: 20 },
  { id: 3, img: "/totalDecive.png", description: "Total Devices", number: 30 },
  { id: 4, img: "/activeDevice.png", description: "Active Devices", number: 40 },
  { id: 5, img: "/moreInfo.png", description: "More Info" },
];

const DynamicMapView = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) return;

    if (locations.length === 1) {
      map.setView([locations[0].latitude, locations[0].longitude], 18);
    } else {
      const bounds = L.latLngBounds(locations.map((loc) => [loc.latitude, loc.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const Dashboard = () => {
  const { deviceLocations } = useMqttContext();
  const [filteredLocations, setFilteredLocations] = useState({});

  useEffect(() => {
    setFilteredLocations(deviceLocations);
  }, [deviceLocations]);

  const validDevices = Object.values(filteredLocations).filter(
    (loc) => loc?.latitude !== undefined && loc?.longitude !== undefined
  );

  const defaultCenter = [31.4989331, 74.3101176];
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="container">
        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          className="row justify-content-between m-auto gap-2 bg-primary p-4 rounded-5 shadow-md-black"
        >
          {cards.map((card) => (
            <motion.li variants={item} className="col-12 col-sm-6 col-md-4 col-lg-2" key={card.id}>
              <div className="card h-100 rounded-5">
                <div className="card-body d-flex flex-column justify-content-around align-items-center">
                  <img style={{ width: "30px" }} src={card?.img} alt="Img" />
                  <h6 className="text-center">{card?.description}</h6>
                  <h6 className="fw-bolder">{card?.number}</h6>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="row justify-content-around mt-5">
          <MapContainer center={defaultCenter} zoom={18} style={{ height: "500px", width: "100%" }} className="rounded-5">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <DynamicMapView locations={validDevices} />

            {Object.entries(filteredLocations).map(([deviceName, location]) => {
              if (!location || location.latitude === undefined || location.longitude === undefined) {
                return null;
              }

              return (
                <Marker key={deviceName} position={[location.latitude, location.longitude]} icon={activeDeviceIcon}>
                  <Tooltip direction="top" offset={[0, -25]} permanent>
                    <strong>{deviceName}</strong>
                  </Tooltip>
                  <Popup>
                    <strong>{deviceName}</strong>
                    <br />
                    Lat: {location.latitude}
                    <br />
                    Lng: {location.longitude}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
