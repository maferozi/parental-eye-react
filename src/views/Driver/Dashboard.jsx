
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMqttContext } from "../../context/MqttContext";
import L, { icon } from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; // for submitting time to backend
import { getDeviceMoniteringTime, setDeviceMoniteringTime } from "../../api/device";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const timeSchema = Yup.object().shape({
  location_start_time: Yup.string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)')
    .required('Start time is required'),
  location_end_time: Yup.string()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)')
    .required('End time is required')
    .test('is-after-start', 'End time must be after start time', function (value) {
      const { location_start_time } = this.parent;
      if (!location_start_time || !value) return true; // Skip if any is missing

      // Convert to minutes since midnight
      const [startHour, startMinute] = location_start_time.split(':').map(Number);
      const [endHour, endMinute] = value.split(':').map(Number);

      const startTotal = startHour * 60 + startMinute;
      const endTotal = endHour * 60 + endMinute;

      return endTotal > startTotal;
    }),
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
  const { deviceLocations, stats } = useMqttContext();
  const [filteredLocations, setFilteredLocations] = useState({});
  const [showModal, setShowModal] = useState(false);

    const { data: timeData, isLoading, refetch } = useQuery({
      queryKey: ["timeData"],
      queryFn: () => getDeviceMoniteringTime(),
    });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleTimeSubmit = async (values) => {
    const withSeconds = {
    location_start_time: values.location_start_time + ':00',
    location_end_time: values.location_end_time + ':00',
    };
    console.log(withSeconds);
    try {
        const res = await setDeviceMoniteringTime(withSeconds);
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Error setting time:", error);
              Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
    }
  };

  const cards = [
    { id: 1, img: "/totalUser.webp", description: "Total Users", number: stats?.totalUsers },
    { id: 3, img: "/totalDecive.webp", description: "Total Devices", number: stats?.totalDevices },
    { id: 4, img: "/activeDevice.webp", description: "Active Devices", number: stats?.activeDevices },
    {
      id: 5,
      img: "/moreInfo.webp",
      description: "More Info",
    },
  ];

  useEffect(() => {
    setFilteredLocations(deviceLocations);
  }, [deviceLocations]);

  const validDevices = Object.values(filteredLocations).filter(
    (loc) => loc?.latitude !== undefined && loc?.longitude !== undefined
  );

  const defaultCenter = [31.4989331, 74.3101176];

  return (
    <div className="d-flex flex-column align-items-center">
        <div className="align-self-start d-flex gap-2 mb-3">
        <div className="btn btn-primary btn-lg  align-self-start rounded-5 p-3" onClick={handleOpenModal}>Set Monitering Time</div>
        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
            <span>Start time: {isLoading?<span>Loading</span>:timeData.data[0]?.location_start_time || "NULL"}</span>
            <span>End time: {isLoading?<span>Loading</span>:timeData.data[0]?.location_end_time || "NULL"}</span>
            
        </div>
        </div>
      <div className="container">
        <motion.ul
          variants={container}
          initial="hidden"
          animate="visible"
          className="row justify-content-between m-auto gap-2 bg-primary p-4 rounded-5 shadow-md-black"
        >
          {cards.map((card) => (
            <motion.li
              variants={item}
              className="col-12 col-sm-6 col-md-4 col-lg-2"
              key={card.id}
              onClick={card.onClick}
              style={{ cursor: card.onClick ? "pointer" : "default" }}
            >
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
              const { fullName } = location;
              return (
                <Marker key={deviceName} position={[location.latitude, location.longitude]}>
                  <Tooltip direction="top" offset={[0, -25]} permanent>
                    <strong>{fullName}</strong>
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

      {/* Time Setting Modal */}
<Modal show={showModal} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Set Monitoring Time</Modal.Title>
  </Modal.Header>

  {isLoading ? (
    <Modal.Body>
      <p className="text-center">Loading...</p>
    </Modal.Body>
  ) : (
    <Formik
      enableReinitialize
      initialValues={{
        location_start_time: timeData?.data[0]?.location_start_time?.slice(0, 5) || "",
        location_end_time: timeData?.data[0]?.location_end_time?.slice(0, 5) || "",
      }}
      validationSchema={timeSchema}
      onSubmit={handleTimeSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Field type="time" name="location_start_time"  className="form-control" />
              <div className="text-danger small">
                <ErrorMessage name="location_start_time" />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Field type="time" name="location_end_time" className="form-control" />
              <div className="text-danger small">
                <ErrorMessage name="location_end_time" />
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Save
            </Button>
          </Modal.Footer>
        </FormikForm>
      )}
    </Formik>
  )}
</Modal>
    </div>
  );
};

export default Dashboard;
