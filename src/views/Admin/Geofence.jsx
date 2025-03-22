import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, FeatureGroup, Polygon, Polyline, Circle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Dropdown } from "react-bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import { getGeofenceData, createGeofence, deleteGeofence, assignGeofenceToDevice, unassignGeofenceToDevice, getAssignedGeofenceDevices } from "../../api/geofence";
import DataTable from "../../components/DataTable";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getAllDevices } from "../../api/device";
import * as Yup from "yup";

const Geofence = () => {
  const [modal, setModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [newGeofence, setNewGeofence] = useState(null);
  const [geofenceName, setGeofenceName] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const pageNo = Number(searchParams.get("pageNo")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 5;
    const searchQuery = searchParams.get("searchQuery") || "";

  // Fetch geofences using React Query
  const { data:geoDataFetch, isLoading, refetch } = useQuery({
    queryKey: ["geofences"],
    queryFn: ()=>getGeofenceData({ pageNo, limit: pageSize, search: searchQuery })
  });
  const { data: deviceAssign, isLoading: deviceLoading, refetch: deviceRefetch } = useQuery({
    queryKey: ["device"],
    queryFn: ()=>getAllDevices()
  });
  
  const { data: assignedDevices, isLoading: assignedDevicesLoading, refetch: assignedDevicesRefetch } = useQuery({
    queryKey: ["assignedDevices"],
    queryFn: ()=>getAssignedGeofenceDevices()
  });

  const handlePageChange = (newPageNo) => {
    setSearchParams({ pageNo: newPageNo });
    refetch();
  };

  const [viewModal, setViewModal] = useState(false);
  const [selectedGeofence, setSelectedGeofence] = useState(null);

  const handleViewGeofence = (geofence) => {
    setSelectedGeofence(geofence);
    setViewModal(true);
  };

  const toggleModal = () => {
    setModal(!modal);
    setSelectedType(null);
    setNewGeofence(null);
    setGeofenceName("");
  };

  const toggleViewModal = () => {
    setViewModal(!viewModal);
    setSelectedGeofence(null);
  };

  const startDrawing = (type) => {
    setSelectedType(type);
    setNewGeofence(null);
  };

  const onCreated = (e) => {
    const { layerType, layer } = e;
    let geoData = null;

    if (layerType === "polygon") {
      let coords = layer.getLatLngs()[0].map((point) => [point.lng, point.lat]);
      coords.push(coords[0]);
      geoData = { type: "area", coordinates: [coords] };
    } else if (layerType === "circle") {
      geoData = { type: "circle", center: [layer.getLatLng().lng, layer.getLatLng().lat], radius: layer.getRadius() };
    } else if (layerType === "polyline") {
      geoData = { type: "route", coordinates: layer.getLatLngs().map((point) => [point.lng, point.lat]) };
    }

    setNewGeofence(geoData);
  };

  const saveGeofence = async () => {
    if (!geofenceName) return alert("Please enter a name for the geofence!");
    if (!newGeofence) return alert("Please draw a geofence first!");

    try {
      let payload = { name: geofenceName, type: newGeofence.type };
      if (newGeofence.type === "circle") {
        payload.center = newGeofence.center;
        payload.radius = newGeofence.radius;
      } else {
        payload.coordinates = newGeofence.coordinates;
      }

      await createGeofence(payload);
      refetch(); // Refresh data after creating geofence
      assignedDevicesRefetch();
      toggleModal();
    } catch (error) {
      console.error("Error saving geofence:", error);
      alert("Failed to save geofence.");
    }
  };

  // Define columns
  const columns = [
    { key: "name", title: "Geofence Name", accessorKey: "name", header: "Geofence Name" },
    { key: "type", title: "Type", accessorKey: "type", header: "Type" },
    { key: "view", title: "View", accessorKey: "view", header: "View" },
    { key: "action", title: "Action", accessorKey: "action", header: "Actions" },
  ];



  // Render row function
  const renderRow = (item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td className={item.type === "circle" ? "text-primary" : "text-success"}>
        {item.type=== "circle" &&<i className="fs-7 ti ti-circle"> </i>}
        {item.type=== "area" &&<i className="fs-7 ti ti-polygon"> </i>}
        {item.type=== "route" &&<i className="fs-7 ti ti-line"> </i>}
        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
      </td>
      <td onClick={() => handleViewGeofence(item)} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
        View
      </td>
      <td>
  <Dropdown>
    <Dropdown.Toggle variant="light">
      <i className="ti ti-dots"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu>

      <Dropdown.Item
        onClick={async () => {
          await deleteGeofence(item.id); // Replace with actual delete function
          refetch();
        }}
        className="text-danger"
      >
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</td>
    </tr>
  );

  const assignValidationSchema = Yup.object({
    geofenceId: Yup.string().required("Geofence selection is required"),
    deviceId: Yup.string().required("Device selection is required"),
  });



 const assignGeofence = async (values, { resetForm }) => {
    const geofenceId = parseInt(values.geofenceId, 10);
    const deviceId = parseInt(values.deviceId, 10);
  
    if (isNaN(geofenceId) || isNaN(deviceId)) {
      console.error("Invalid IDs: Child ID or Device ID is not a number");
      alert("Invalid child or device selection.");
      return;
    }
  
    try {
      await assignGeofenceToDevice({ geofenceId, deviceId });
      resetForm();
      refetch();
      assignedDevicesRefetch();
    } catch (error) {
      alert("Failed to assign device.");
    }
  };


  const unassignValidationSchema = Yup.object({
    ungeofenceId: Yup.string().required("Geofence selection is required"),
    undeviceId: Yup.string().required("Device selection is required"),
  });



  //UNASSIGN GEOFENCE

 const unassignGeofence = async (values, { resetForm }) => {
    const ungeofenceId = parseInt(values.ungeofenceId, 10);
    const undeviceId = parseInt(values.undeviceId, 10);
  
    if (isNaN(ungeofenceId) || isNaN(undeviceId)) {
      console.error("Invalid IDs: Child ID or Device ID is not a number");
      alert("Invalid child or device selection.");
      return;
    }
  
    try {
      await unassignGeofenceToDevice({ geofenceId:ungeofenceId, deviceId:undeviceId });
      resetForm();
      refetch();
      assignedDevicesRefetch();
    } catch (error) {
      alert("Failed to assign device.");
    }
  };

  const [selectedAssignedGeofence, setSelectedAssignedGeofence] = useState(""); // Store selected Geofence ID

  // Find the selected geofence and get its devices
  const selectedAssignedGeofenceData = assignedDevices?.data?.find(
    (geo) => geo.id === Number(selectedAssignedGeofence)
  );
  const filteredDevices = selectedAssignedGeofenceData?.devices || []; // Get devices for selected Geofence


  return (
    <div>
      <div className="d-flex justify-content-between">
        <Button color="primary" onClick={toggleModal}>Add New Geofence</Button>
      </div>

      <div className="border p-4 rounded-5 shadow-md mt-5">
      <div className="d-flex align-items-center justify-content-between">
          <h4>Existing Geofences</h4>
          <input
            className="form-control rounded-pill"
            style={{ width: "10rem" }}
            type="text"
            placeholder="Search"
            onChange={async (e) => {
              setSearchParams({ searchQuery: e.target.value });
              refetch();
            }}
          />
        </div>
        <DataTable
          loading={isLoading}
          columns={columns}
          data={geoDataFetch?.data || []}
          renderRow={renderRow}
          pageSize={geoDataFetch?.limit || 5}
          pageNo={geoDataFetch?.pageNo || 1}
          totalCount={geoDataFetch?.count || 5}
          onPageChange={handlePageChange}
          noDataTitle="No geofences available."
        />
      </div>


<h3 className="mt-3">Assign Geofence</h3>

      <Formik
        initialValues={{ geofenceId: "", deviceId: "" }}
        validationSchema={assignValidationSchema}
        onSubmit={assignGeofence}
      >
        {({ isSubmitting }) => (
          <Form className="border p-4 rounded-5 mt-4">
            <h5>Assign Geofence to Device</h5>
            <div className="mb-3">
              <label>Select Geofence:</label>
              <Field as="select" name="geofenceId" className="form-control">
                <option value="">-- Select Geofence --</option>
                {!isLoading && geoDataFetch.data.map((geo) => (
                  <option key={geo.id} value={geo.id}>
                    {geo.id + " | " + geo.name} 
                  </option>
                ))}
              </Field>
              <ErrorMessage name="geofenceId" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Select Device:</label>
              <Field as="select" name="deviceId" className="form-control">
                <option value="">-- Select Device --</option>
                {!deviceLoading && deviceAssign.data.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.deviceName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="deviceId" component="div" className="text-danger" />
            </div>

            <Button color="primary" type="submit" disabled={isSubmitting}>
              Assign Device
            </Button>
          </Form>
        )}
      </Formik>









<h3 className="mt-3">Unassign Geofence</h3>

<Formik
  initialValues={{ ungeofenceId: "", undeviceId: "" }}
  validationSchema={unassignValidationSchema}
  onSubmit={unassignGeofence}
>
  {({ isSubmitting, setFieldValue, values }) => ( // <-- Extract `setFieldValue` and `values`
    <Form className="border p-4 rounded-5 mt-4">
      <h5>UnAssign Geofence to Device</h5>

      {/* Geofence Dropdown */}
      <div className="mb-3">
        <label>Select Geofence:</label>
        <Field
          as="select"
          name="ungeofenceId"
          className="form-control"
          value={values.ungeofenceId} // <-- Ensure Formik controls the selected value
          onChange={(e) => {
            const selectedGeofence = e.target.value;
            setSelectedAssignedGeofence(selectedGeofence); // Update local state if needed
            setFieldValue("ungeofenceId", selectedGeofence); // Update Formik state
            setFieldValue("undeviceId", ""); // Reset device selection
          }}
        >
          <option value="">-- Select Geofence --</option>
          {!assignedDevicesLoading &&
            assignedDevices?.data?.map((geo) => (
              <option key={geo.id} value={geo.id}>
                {geo.id + " | " + geo.name}
              </option>
            ))}
        </Field>
        <ErrorMessage name="ungeofenceId" component="div" className="text-danger" />
      </div>

      {/* Device Dropdown */}
      <div className="mb-3">
        <label>Select Device:</label>
        <Field
          as="select"
          name="undeviceId"
          className="form-control"
          value={values.undeviceId} // <-- Ensure Formik controls the selected value
          onChange={(e) => setFieldValue("undeviceId", e.target.value)}
        >
          <option value="">-- Select Device --</option>
          {filteredDevices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.deviceName}
            </option>
          ))}
        </Field>
        <ErrorMessage name="undeviceId" component="div" className="text-danger" />
      </div>

      <Button color="warning" type="submit" disabled={isSubmitting}>
        UnAssign Device
      </Button>
    </Form>
  )}
</Formik>











      {/* Modal for Geofence Selection & Map */}
      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Create Geofence</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column gap-3 my-3">
            <Label for="geofenceName">Geofence Name</Label>
            <Input
              type="text"
              id="geofenceName"
              value={geofenceName}
              onChange={(e) => setGeofenceName(e.target.value)}
              placeholder="Enter geofence name"
            />
          </div>

          <div className="d-flex justify-content-between gap-3">
            <Button color={selectedType === "area" ? "success" : "secondary"} onClick={() => startDrawing("area")}>Polygon</Button>
            <Button color={selectedType === "route" ? "success" : "secondary"} onClick={() => startDrawing("route")}>Polyline</Button>
            <Button color={selectedType === "circle" ? "success" : "secondary"} onClick={() => startDrawing("circle")}>Circle</Button>
          </div>

          <MapContainer center={[31.4989331, 74.3101176]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FeatureGroup>
              {selectedType && (
                <EditControl
                  position="topright"
                  draw={{ polygon: selectedType === "area", polyline: selectedType === "route", circle: selectedType === "circle", rectangle: false, marker: false }}
                  onCreated={onCreated}
                />
              )}
            </FeatureGroup>
          </MapContainer>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveGeofence}>{isLoading ? "Saving..." : "Add Geofence"}</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>









      <Modal isOpen={viewModal} toggle={toggleViewModal} size="lg">
        <ModalHeader toggle={toggleViewModal}>View Geofence</ModalHeader>
        <ModalBody>
          <h5>{selectedGeofence?.name}</h5>
          <MapContainer center={[31.4989331, 74.3101176]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FeatureGroup>
              {selectedGeofence?.type === "circle" && selectedGeofence.center && (
                <Circle center={[selectedGeofence.center.coordinates[1], selectedGeofence.center.coordinates[0]]} radius={selectedGeofence.radius} color="blue" />
              )}
              {selectedGeofence?.type === "area" && selectedGeofence.area && (
                <Polygon positions={selectedGeofence.area.coordinates[0].map(([lng, lat]) => [lat, lng])} color="green" />
              )}
              {selectedGeofence?.type === "route" && selectedGeofence.path && (
                <Polyline positions={selectedGeofence.path.coordinates.map(([lng, lat]) => [lat, lng])} color="red" />
              )}
            </FeatureGroup>
          </MapContainer>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleViewModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Geofence;
