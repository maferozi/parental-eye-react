import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "leaflet/dist/leaflet.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLocationById, getUserWithLocationHistory } from "../../api/location";
import DataTable from "../../components/DataTable";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LocationHistory = () => {
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const userId = searchParams.get("userId");
  const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : today;
  const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : today;
  
  const queryClient = useQueryClient();

  // Get today's date
  const today = new Date();

  // Formik Initial Values
  const initialValues = {
    startDate: today,
    endDate: today,
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
  });

  // Fetch location data based on userId and date range
  const { data, isLoading, isError } = useQuery({
    queryKey: ["location", userId, startDate, endDate],
    queryFn: () =>
      userId
        ? getLocationById({ 
            userId, 
            startDate: startDate ? startDate.toISOString().split("T")[0] : null, 
            endDate: endDate ? endDate.toISOString().split("T")[0] : null 
          })
        : Promise.resolve(null),
        enabled: !!userId && !!startDate && !!endDate
  });

  // Fetch user data
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["user with location"],
    queryFn: getUserWithLocationHistory,
  });

  const pathCoordinates =
    data?.location?.map((loc) => [loc.location.coordinates[1], loc.location.coordinates[0]]) || [];

  const center = pathCoordinates.length > 0 ? pathCoordinates[0] : [31.5, 74.3];

  const columns = [
    { key: "fullName", title: "Name", accessorKey: "fullName", header: "Name" },
    { key: "status", title: "Status", accessorKey: "status", header: "Status" },
    { key: "phoneNumber", title: "Phone No", accessorKey: "phoneNumber", header: "Phone No" },
    { key: "deviceId", title: "Device ID", accessorKey: "deviceId", header: "Device ID" },
    { key: "action", title: "Action", accessorKey: "action", header: "Actions" },
  ];

  const toggle = () => setModal(!modal);

  const filteredUsers =
    usersData?.users?.filter((user) => user.user.fullName.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  const handleViewClick = (userId) => {
    setSearchParams({ 
      userId, 
      startDate: initialValues.startDate.toISOString().split("T")[0], 
      endDate: initialValues.endDate.toISOString().split("T")[0] 
    });
    queryClient.invalidateQueries(["location", userId, initialValues.startDate, initialValues.endDate]);
   
    setModal(true);
  };

  return (
    <div>
      <div className="mt-5 border rounded-5 shadow-md p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>User Details</h3>
          <input
            className="form-control rounded-pill mb-3"
            style={{ width: "15rem" }}
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {usersLoading ? (
          <div className="w-100">
            <Skeleton count={1} height={50} />
            <Skeleton count={5} height={40} />
          </div>
        ) : (
          <DataTable
            loading={usersLoading}
            columns={columns}
            data={filteredUsers.slice((pageNo - 1) * pageSize, pageNo * pageSize)}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.user?.fullName || "N/A"}</td>
                <td>{row.user?.status === 1 ? "Active" : "Inactive"}</td>
                <td>{row.user?.phoneNumber || "N/A"}</td>
                <td>{row.id || "N/A"}</td>
                <td className="text-primary cursor-pointer" onClick={() => handleViewClick(row.user?.id)}>
                  View
                </td>
              </tr>
            )}
            pageSize={pageSize}
            pageNo={pageNo}
            totalCount={filteredUsers.length}
            onPageChange={setPageNo}
            noDataTitle="No users found."
          />
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Location History</ModalHeader>
        <ModalBody>
          {/* Date Picker Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setSearchParams({ userId, startDate: values.startDate, endDate: values.endDate });
              queryClient.invalidateQueries(["location", userId, values.startDate, values.endDate]);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="mb-3">
                <div className="d-flex gap-3 ">
                  <div>
                    <label>Start Date:</label>
                    <Field name="startDate">
                      {({ field }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          onChange={(date) => setFieldValue("startDate", date)}
                          className="form-control"
                        />
                      )}
                    </Field>
                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                  </div>
                  <div>
                    <label>End Date:</label>
                    <Field name="endDate">
                      {({ field }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          onChange={(date) => setFieldValue("endDate", date)}
                          className="form-control"
                        />
                      )}
                    </Field>
                    <ErrorMessage name="endDate" component="div" className="text-danger" />
                  </div>
                  <Button type="submit" color="primary" className="mt-4">Filter</Button>
                </div>
              </Form>
            )}
          </Formik>

          
          {isLoading ? (
            <p>Loading map...</p>
          ) : isError || !data?.location?.length ? (
            <p>No location data available for the selected date range.</p>
          ) : (
            <MapContainer center={center} zoom={18} style={{ height: "500px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
              <Polyline positions={pathCoordinates} color="red" />
            </MapContainer>
          )}
          
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LocationHistory;
