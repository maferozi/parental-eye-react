import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { Dropdown } from "react-bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";
import {  assignDeviceToChild, deleteDevice, getAllDevices, getUnassignedChild, unAssignChild } from "../../api/device";

const AdminDeviceManagement = () => {
  const [modal, setModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();


  const pageNo = Number(searchParams.get("pageNo")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data: devices, isLoading, refetch:refetchDevice } = useQuery({
    queryKey: ["adminDevices", pageNo, pageSize, searchQuery],
    queryFn: () => getAllDevices({ pageNo, limit: pageSize, search: searchQuery }),
  });

  function refetch(){
    refetchDevice();
    refetchUnassignedChild();
    refetchUnassignedDevice();
  }

  const handlePageChange = (newPageNo) => {
    setSearchParams({ pageNo: newPageNo });
    refetch();
  };

  const toggle = () => setModal(!modal);

  const validationSchema = Yup.object({
    amount: Yup.string().required("No of devices is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // await requestDevice(values);
    toggle();
    resetForm();
  };


  // Fetch Unassigned Children
  const { data: children, isLoading: loadingChildren, error: childError, refetch:refetchUnassignedChild } = useQuery({
    queryKey: ["unassignedChildren"],
    queryFn: ()=>getUnassignedChild(),
  });

  // Fetch unassigned devices
  const { data: unassignedDevices, isLoading: loadingDevices, error: deviceError, refetch:refetchUnassignedDevice } = useQuery({
    queryKey: ["unassignedDevices"],
    queryFn: async () => {
      const response = await getAllDevices({ pageNo: 1, limit: 100, search: "" });
      return response.data.filter((device) => !device.userId);
    },
  });

  const assignDevice = async (values, { resetForm }) => {
    const childId = parseInt(values.childId, 10);
    const deviceId = parseInt(values.deviceId, 10);
  
    if (isNaN(childId) || isNaN(deviceId)) {
      console.error("Invalid IDs: Child ID or Device ID is not a number");
      alert("Invalid child or device selection.");
      return;
    }
  
    try {
      await assignDeviceToChild({ childId, deviceId });
      resetForm();
      refetch();
    } catch (error) {
      console.error("Error assigning device:", error);
      alert("Failed to assign device.");
    }
  };
  const assignValidationSchema = Yup.object({
    childId: Yup.string().required("Child selection is required"),
    deviceId: Yup.string().required("Device selection is required"),
  });

  const column = [
    { key: "deviceName", title: "Device Name", accessorKey: "deviceName", header: "Device Name" },
    { key: "userId", title: "User", accessorKey: "userId", header: "User" },
    { key: "status", title: "Status", accessorKey: "status", header: "Status" },
    { key: "action", title: "Action", accessorKey: "action", header: "Actions" },
  ];

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>{item.deviceName}</td>
      <td>{item.userId != null ? item.userId : 'Free'}</td>
      <td>{item.status === 2 ? "Active" : "Inactive"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="light">
            <i className="ti ti-dots"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={async () => {
              await unAssignChild(item.id);
              refetch();
            }}
            className="text-warning">
              Unassign
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button onClick={toggle} className="btn btn-primary">Request Device</button>
      </div>
      <div className="mt-5 border rounded-5 shadow-md p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Devices</h4>
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
        {devices && (
          <DataTable
            loading={isLoading}
            columns={column}
            data={devices.data}
            renderRow={renderRow}
            pageSize={devices.limit}
            pageNo={devices.pageNo}
            totalCount={devices.count}
            onPageChange={handlePageChange}
            noDataTitle="No devices available."
          />
        )}
        {isLoading && (
          <div className="w-100">
            <Skeleton count={1} height={50} />
            <Skeleton count={5} height={40} />
          </div>
        )}
      </div>

      <h3 className="mt-3">Assign Devices</h3>

      <Formik
        initialValues={{ childId: "", deviceId: "" }}
        validationSchema={assignValidationSchema}
        onSubmit={assignDevice}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 border p-4 rounded-5">
            <h5>Assign Device to Parent</h5>
            <div className="mb-3">
              <label>Select Parent:</label>
              <Field as="select" name="childId" className="form-control">
                <option value="">-- Select Child --</option>
                {!loadingChildren && children.data.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.id + " | " + child.fullName} 
                  </option>
                ))}
              </Field>
              <ErrorMessage name="childId" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Select Unassigned Device:</label>
              <Field as="select" name="deviceId" className="form-control">
                <option value="">-- Select Device --</option>
                {!loadingDevices && unassignedDevices.map((device) => (
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

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Request a New Device</ModalHeader>
        <ModalBody>
          <Formik initialValues={{ amount:'' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="amount">Enter Required No of devices</label>
                  <Field type="number" name="amount" className="form-control mt-2" placeholder="Enter the required amount in number" />
                  <ErrorMessage name="amount" component="div" className="text-danger" />
                </div>
                <ModalFooter>
                  <Button color="primary" type="submit" disabled={isSubmitting}>Request Device</Button>
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AdminDeviceManagement;