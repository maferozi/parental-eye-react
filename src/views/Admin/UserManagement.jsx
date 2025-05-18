import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable"; // Import DataTable component
import Notification from "../../components/Notification";
import { Dropdown } from "react-bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import {
  addInvitedUser,
  deleteInvitedUser,
  getAllInvitedUser,
  getInvitedUserById,
  toggleStatusById,
} from "../../api/invitedUser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";

const UserManagement = () => {
  const [modal, setModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNoChild = Number(searchParams.get("pageNoChild")) || 1;
  const pageSizeChild = Number(searchParams.get("pageSizeChild")) || 5;

  const childSearchQuery = searchParams.get("childSearchQuery") || "";
  const driverSearchQuery = searchParams.get("driverSearchQuery") || "";
  const gardianSearchQuery = searchParams.get("gardianSearchQuery") || "";

  // Fetch paired users
  const {
    data: childData,
    isLoading: childLoading,
    refetch: refetchChild,
  } = useQuery({
    queryKey: ["childData", pageNoChild, pageSizeChild],
    queryFn: () =>
      getAllInvitedUser({
        pageNo: pageNoChild,
        limit: pageSizeChild,
        role: 4,
        search: childSearchQuery,
      }),
  });

  const pageNoDriver = Number(searchParams.get("pageNoDriver")) || 1;
  const pageSizeDriver = Number(searchParams.get("pageSizeDriver")) || 5;
  const pageNoGardian = Number(searchParams.get("pageNoGardian")) || 1;
  const pageSizeGardian = Number(searchParams.get("pageSizeGardian")) || 5;

  const {
    data: driverData,
    isLoading: driverLoading,
    refetch: refetchDriver,
  } = useQuery({
    queryKey: ["driverData", pageNoDriver, pageSizeDriver],
    queryFn: () =>
      getAllInvitedUser({
        pageNo: pageNoDriver,
        limit: pageSizeDriver,
        role: 5,
        search: driverSearchQuery,
      }),
  });

  const {
    data: parentData,
    isLoading: parentLoading,
    refetch: refetchParent,
  } = useQuery({
    queryKey: ["parentData", pageNoGardian, pageSizeGardian],
    queryFn: () =>
      getAllInvitedUser({
        pageNo: pageNoGardian,
        limit: pageSizeGardian,
        role: 3,
        search: gardianSearchQuery,
      }),
  });

  const handleChildPageChange = (newPageNo) => {
    setSearchParams({ pageNoChild: newPageNo, pageNoDriver,pageNoGardian });
    refetchChild();
  };

  const handleDriverPageChange = (newPageNo) => {
    setSearchParams({ pageNoDriver: newPageNo, pageNoChild,pageNoGardian });
    refetchDriver();
  };
  const handleGardianPageChange = (newPageNo) => {
    setSearchParams({ pageNoGardian: newPageNo, pageNoChild, pageNoDriver });
    refetchDriver();
  };

  const columnChild = [
    {
      key: "id",
      title: "ID",
      accessorKey: "id",
      header: "ID",
    },
    {
      key: "fullName",
      title: "Name",
      accessorKey: "fullName",
      header: "User Name",
    },
    { key: "type", title: "Type", accessorKey: "type", header: "User Type" },
    {
      key: "status",
      title: "Status",
      accessorKey: "status",
      header: "Pairing Status",
    },
    {
      key: "parentId",
      title: "Gardian Id",
      accessorKey: "parentId",
      header: "Gardian Id",
    },
    {
      key: "driverId",
      title: "Driver Id",
      accessorKey: "driverId",
      header: "Driver Id",
    },
    {
      key: "action",
      title: "Action",
      accessorKey: "action",
      header: "Actions",
    },
  ];
  const columnDriver = [
    {
      key: "id",
      title: "ID",
      accessorKey: "id",
      header: "ID",
    },
    {
      key: "fullName",
      title: "Name",
      accessorKey: "fullName",
      header: "User Name",
    },
    { key: "type", title: "Type", accessorKey: "type", header: "User Type" },
    {
      key: "status",
      title: "Status",
      accessorKey: "status",
      header: "Pairing Status",
    },
    {
      key: "action",
      title: "Action",
      accessorKey: "action",
      header: "Actions",
    },
  ];

  const columnGardian = [
    {
      key: "id",
      title: "ID",
      accessorKey: "id",
      header: "ID",
    },
    {
      key: "fullName",
      title: "Name",
      accessorKey: "fullName",
      header: "User Name",
    },
    { key: "type", title: "Type", accessorKey: "type", header: "User Type" },
    {
      key: "action",
      title: "Action",
      accessorKey: "action",
      header: "Actions",
    },
  ];

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        {item.id}
      </td>
      <td>
        {item.firstName} {item.lastName}
      </td>
      <td>{item.role === 4 ? "Child" : "Driver"}</td>
      {item.role === 4 || item.role === 5 && <td className={`${item.status == 1 ? "text-success" : "text-warning"}`}>
        {item.status === 1 ? "Paired" : "Unpaired"}
      </td>}
      {item.role === 4 && <td>{item.parentId || "Free"}</td>}
      {item.role === 4 && <td>{item.driverId || "Free"}</td>}
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="light">
            <i className="ti ti-dots"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className="text-danger"
              onClick={async () => {
                await deleteInvitedUser(item.id);
                if (item.role === 4) refetchChild();
                if (item.role === 5) refetchDriver();
              }}
            >
              Delete
            </Dropdown.Item>
            {item.status == 1 && (
              <Dropdown.Item
                className="text-danger"
                onClick={() => {
                  handdleUnpair(item.id, item.type);
                }}
              >
                Unpair
              </Dropdown.Item>
            )}
            {item.status == 2 && (
              <Dropdown.Item
                className="text-success"
                onClick={() => {
                  handdleUnpair(item.id, item.type);
                }}
              >
                Pair
              </Dropdown.Item>
            )}
            <Dropdown.Item
              className="text-warning"
              onClick={() => {
                handdleUpdateUser(item.id);
              }}
            >
              Update
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );

  const handdleUnpair = async (id, role) => {
    try {
      await toggleStatusById(id);
      if (role === 1) refetchChild();
      if (role === 2) refetchDriver();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const [formValues, setFormValues] = useState({
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "Jon*1234",
    phoneNumber: "",
    parentId: "",
    driverId: "",
    id: "",
  });

  const toggle = () => setModal(!modal);

  const handdleUpdateUser = async (id) => {
    try {
      const res = await getInvitedUserById(id);

      setFormValues({
        type: String(res.data.type),
        firstName: res.data.firstName, // Correct field
        lastName: res.data.lastName, // Correct field
        email: res.data.email,
        phoneNumber: res.data.phoneNumber,
        id: res.data.id,
      });

      toggle();
    } catch (error) {
      console.error("Error fetching user data for update:", error);
    }
  };

  const initialValues = {
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "Jon*1234",
    phoneNumber: "",
    parentId: "",
    driverId: "",
    id: null,
  };

  const validationSchema = Yup.object({
    type: Yup.string()
      .required("Type is required")
      .oneOf(["3", "4", "5"], "Invalid type"),
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^\d{10,15}$/, "Phone Number must be between 10 and 15 digits"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    await addInvitedUser(values);
    toggle();
    resetForm();
    setFormValues({
      type: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "Jon*1234",
      phoneNumber: "",
      parentId: "",
      driverId: "",
      id: null,
    });
    if (values.type === "4") refetchChild();
    if (values.type === "5") refetchDriver();
    if (values.type === "3") refetchParent();
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button onClick={toggle} className="btn btn-primary">
          Add User
        </button>
      </div>
      <div className="row justify-content-around mt-5">
        <div className="col-12  p-4 border rounded-5 shadow-md">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Childrens</h4>
            <input
              className="form-control rounded-pill"
              style={{ width: "10rem" }}
              type="text"
              placeholder="Search"
              onChange={async (e) => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set("childSearchQuery", e.target.value);
                await setSearchParams(newParams);
                refetchChild();
              }}
            />
          </div>
          {childData && (
            <DataTable
              loading={childLoading}
              columns={columnChild}
              data={childData.data}
              renderRow={renderRow}
              pageSize={childData.limit}
              pageNo={childData.pageNo}
              totalCount={childData.count}
              onPageChange={handleChildPageChange}
              noDataTitle="No paired users available."
            />
          )}
          {childLoading && (
            <div className="w-100">
              <Skeleton count={1} height={50} />
              <Skeleton count={5} height={40} />
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-5 shadow-md p-4 mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Drivers</h4>
          <input
            className="form-control rounded-pill"
            style={{ width: "10rem" }}
            type="text"
            placeholder="Search"
            onChange={async (e) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("driverSearchQuery", e.target.value);
              await setSearchParams(newParams);
              refetchDriver();
            }}
          />
        </div>
        {driverData && (
          <DataTable
            loading={driverLoading}
            columns={columnDriver}
            data={driverData.data}
            renderRow={renderRow}
            pageSize={driverData.limit}
            pageNo={driverData.pageNo}
            totalCount={driverData.count}
            onPageChange={handleDriverPageChange}
            noDataTitle="No paired users available."
          />
        )}
        {driverLoading && (
          <div className="w-100">
            <Skeleton count={1} height={50} />
            <Skeleton count={5} height={40} />
          </div>
        )}
      </div>

      <div className="border rounded-5 shadow-md p-4 mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Gardian</h4>
          <input
            className="form-control rounded-pill"
            style={{ width: "10rem" }}
            type="text"
            placeholder="Search"
            onChange={async (e) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set("gardianSearchQuery", e.target.value);
              await setSearchParams(newParams);
              refetchParent();
            }}
          />
        </div>
        {driverData && (
          <DataTable
            loading={parentLoading}
            columns={columnGardian}
            data={parentData.data}
            renderRow={renderRow}
            pageSize={parentData.limit}
            pageNo={parentData.pageNo}
            totalCount={parentData.count}
            onPageChange={handleDriverPageChange}
            noDataTitle="No paired users available."
          />
        )}
        {parentLoading && (
          <div className="w-100">
            <Skeleton count={1} height={50} />
            <Skeleton count={5} height={40} />
          </div>
        )}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {formValues.id ? "Update User" : "Add New User"}
        </ModalHeader>
        <ModalBody>
          <Formik
            key={formValues.id}
            initialValues={formValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="type">User Type</label>
                  <Field as="select" name="type" className="form-control">
                    <option value="">Select Type</option>
                    <option value="4">Child</option>
                    <option value="3">Guardian</option>
                    <option value="5">Driver</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {values.type === "4" && (
                  <>
                    {/* Parent Selection */}
                    <div className="d-flex justify-content-between align-items-center gap-3">
                      <div className="mb-3 w-100">
                        <label>Select Parent:</label>
                        <Field
                          as="select"
                          name="parentId"
                          className="form-control"
                        >
                          <option value="">-- Select Parent --</option>
                          {!parentLoading &&
                            parentData?.data.map((parent) => (
                              <option key={parent.id} value={parent.id}>
                                {parent.id +
                                  " | " +
                                  parent.firstName +
                                  " " +
                                  parent.lastName}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="parentId"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Driver Selection */}
                      <div className="mb-3 w-100">
                        <label>Select Driver:</label>
                        <Field
                          as="select"
                          name="driverId"
                          className="form-control"
                        >
                          <option value="">-- Select Driver --</option>
                          {!driverLoading &&
                            driverData?.data.map((driver) => (
                              <option key={driver.id} value={driver.id}>
                                {driver.id +
                                  " | " +
                                  driver.firstName +
                                  " " +
                                  driver.lastName}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="driverId"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div className="mb-3 w-100">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter first name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3 w-100">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter last name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div className="mb-3 w-100">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="text"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3 w-100">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <ModalFooter>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    {formValues.id ? "Update User" : "Add User"}
                  </Button>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserManagement;
