import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { Dropdown } from "react-bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useQuery } from "@tanstack/react-query";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";
import { addDevice, deleteDevice, getAllDevices, assignDeviceToParent, unAssignParent } from "../../api/device";
import { getAdminParent } from "../../api/auth";

const DeviceManagement = () => {
  const [modal, setModal] = useState(false);
  const [parents, setParents] = useState([]);
  const [unassignedDevices, setUnassignedDevices] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNo = Number(searchParams.get("pageNo")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data: devices, isLoading, refetch } = useQuery({
    queryKey: ["devices", pageNo, pageSize, searchQuery],
    queryFn: () => getAllDevices({ pageNo, limit: pageSize, search: searchQuery }),
  });

  const handlePageChange = (newPageNo) => {
    setSearchParams({ pageNo: newPageNo });
    refetch();
  };

  useEffect(() => {
    fetchParents();
    fetchUnassignedDevices();
  }, [devices]);

  const fetchParents = async () => {
    try {
      const response = await getAdminParent();
      setParents(response.data);
    } catch (error) {
      console.error("Error fetching parents:", error);
    }
  };

  const fetchUnassignedDevices = async () => {
    try {
      const response = await getAllDevices({ pageNo: 1, limit: 100, search: "" });
      const unassigned = response.data.filter((device) => !device.parentId);
      setUnassignedDevices(unassigned);
    } catch (error) {
      console.error("Error fetching unassigned devices:", error);
    }
  };

  const assignDevice = async (values, { resetForm }) => {
    const parentId = parseInt(values.parentId, 10);
    const deviceId = parseInt(values.deviceId, 10);
  
    if (isNaN(parentId) || isNaN(deviceId)) {
      console.error("Invalid IDs: Parent ID or Device ID is not a number");
      alert("Invalid parent or device selection.");
      return;
    }
  
    try {
      await assignDeviceToParent({ parentId, deviceId });
      resetForm();
      refetch();
    } catch (error) {
      console.error("Error assigning device:", error);
      alert("Failed to assign device.");
    }
  };

  const column = [
    { key: "deviceName", title: "Device Name", accessorKey: "deviceName", header: "Device Name" },
    { key: "password", title: "Password", accessorKey: "password", header: "Password" },
    { key: "parentId", title: "ParentId", accessorKey: "parentId", header: "Parent Id" },
    { key: "userId", title: "UserId", accessorKey: "userId", header: "User Id" },
    { key: "status", title: "Status", accessorKey: "status", header: "Status" },
    { key: "action", title: "Action", accessorKey: "action", header: "Actions" },
  ];

  const renderRow = (item) => (
    <tr key={item.id} className={`${item.parentId == null ? "text-warning": ""}`}>
      <td>{item.deviceName}</td>
      <td>{item.password}</td>
      <td>{item.parentId != null ? item?.parentId : "Unassigned"}</td>
      <td>{item.userId != null ? item.userId : "Free"}</td>
      <td>{item.status == 2 ? "Active" : "Inactive"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="light">
            <i className="ti ti-dots"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>

            <Dropdown.Item
              onClick={async () => {
                await deleteDevice(item.id);
                refetch();
              }}
            >
              <i className="ti ti-trash text-danger "></i>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={async () => {
                await unAssignParent(item.id);
                refetch();
              }}
              className="text-warning"
            >
              Unassign
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );

  const toggle = () => setModal(!modal);

  const validationSchema = Yup.object({
    name: Yup.string().required("Device Name is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const assignValidationSchema = Yup.object({
    parentId: Yup.string().required("Parent selection is required"),
    deviceId: Yup.string().required("Device selection is required"),
  });
  

  const handleSubmit = async (values, { resetForm }) => {
    await addDevice(values);
    toggle();
    resetForm();
    refetch();
  };

  return (
    <div>
        <h3 className="mb-4">Device Management</h3>
      <div className="d-flex justify-content-between">
        <button onClick={toggle} className="btn btn-primary">Add Device</button>
      </div>
      <div className="mt-5 border rounded-5 shadow-md p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Devices</h4>
          <input className="form-control rounded-pill" style={{ width: "10rem" }} type="text" placeholder="Search" onChange={async (e) => {
            setSearchParams({ searchQuery: e.target.value });
            refetch();
          }} />
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
        initialValues={{ parentId: "", deviceId: "" }}
        validationSchema={assignValidationSchema}
        onSubmit={assignDevice}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 border p-4 rounded-5">
            <h5>Assign Device to Parent</h5>
            <div className="mb-3">
              <label>Select Parent:</label>
              <Field as="select" name="parentId" className="form-control">
                <option value="">-- Select Parent --</option>
                {parents.map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.firstName + " " + parent.lastName + " | " + parent.email} 
                  </option>
                ))}
              </Field>
              <ErrorMessage name="parentId" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label>Select Unassigned Device:</label>
              <Field as="select" name="deviceId" className="form-control">
                <option value="">-- Select Device --</option>
                {unassignedDevices.map((device) => (
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
        <ModalHeader toggle={toggle}>Add New Device</ModalHeader>
        <ModalBody>
          <Formik initialValues={{ name: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name">Device Name</label>
                  <Field type="text" name="name" className="form-control" placeholder="Enter device name" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Device Password</label>
                  <Field type="password" name="password" className="form-control" placeholder="Enter device password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <ModalFooter>
                  <Button color="primary" type="submit" disabled={isSubmitting}>Add Device</Button>
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

export default DeviceManagement;
