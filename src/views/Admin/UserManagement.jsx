import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable"; // Import DataTable component
import Notification from "../../components/Notification";
import { Dropdown } from "react-bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { addInvitedUser, deleteInvitedUser, getAllInvitedUser, getInvitedUserById, toggleStatusById } from "../../api/invitedUser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";

const notifications = [
  { id: 1, message: "You have a new message" },
  { id: 2, message: "Your profile was viewed" },
  { id: 3, message: "Update your password" },
];

const UserManagement = () => {
  const [modal, setModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNoChild = Number(searchParams.get("pageNoChild")) || 1;
  const pageSizeChild = Number(searchParams.get("pageSizeChild")) ||  5;

  const childSearchQuery = searchParams.get("childSearchQuery") ||  "";
  const driverSearchQuery = searchParams.get("driverSearchQuery") ||  "";

  // Fetch paired users
  const { data: childData, isLoading: childLoading, refetch:refetchChild } = useQuery({
    queryKey: ["childData", pageNoChild, pageSizeChild],
    queryFn: () => getAllInvitedUser({ pageNo: pageNoChild, limit: pageSizeChild, type:1, search: childSearchQuery }),
  });

  const pageNoDriver = Number(searchParams.get("pageNoDriver")) || 1;
  const pageSizeDriver = Number(searchParams.get("pageSizeDriver")) || 5;

  const { data: driverData, isLoading: driverLoading, refetch:refetchDriver } = useQuery({
    queryKey: ["driverData", pageNoDriver, pageSizeDriver],
    queryFn: () => getAllInvitedUser({ pageNo: pageNoDriver, limit: pageSizeDriver, type:2, search: driverSearchQuery }),
  });
  

  const handleChildPageChange = (newPageNo) => {
    setSearchParams({ pageNoChild: newPageNo, pageNoDriver});
    refetchChild();
  };

  const handleDriverPageChange = (newPageNo) => {
    setSearchParams({  pageNoDriver: newPageNo, pageNoChild });
    refetchDriver();
  };

  

  const column = [
    { key: "fullName", title: "Name", accessorKey: "fullName", header: "User Name" },
    { key: "type", title: "Type", accessorKey: "type", header: "User Type" },
    { key: "status", title: "Status", accessorKey: "status", header: "Pairing Status" },
    { key: "action", title: "Action", accessorKey: "action", header: "Actions" },
  ];

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>{item.fullName}</td>
      <td>{item.type === 2 ? "Driver" : "Child"}</td>
      <td>{item.status === 1 ? "Paired" : "Unpaired"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="light">
            <i className="ti ti-dots"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={async() => {
              await deleteInvitedUser(item.id);
              if(item.type === 1) refetchChild();
              if(item.type === 2) refetchDriver();
            }}>
              Delete
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>{handdleUpdateUser(item.id)}}>Update</Dropdown.Item>
            {item.status == 1 && <Dropdown.Item onClick={()=>{handdleUnpair(item.id, item.type)}}>Unpair</Dropdown.Item>}
            {item.status == 2 && <Dropdown.Item onClick={()=>{handdleUnpair(item.id, item.type)}}>Pair</Dropdown.Item>}
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );



  const handdleUnpair = async(id, type)=>{
    try {
      await toggleStatusById(id);
      if(type === 1) refetchChild();
      if(type === 2) refetchDriver();
    }
    catch (error) {
      console.error("Error toggling user status:", error);
  }
}

  const [formValues, setFormValues] = useState({
    type: "",
    fullName: "",
    birthDate: "",
    phoneNumber: "",
    id: null,
  });

  const toggle = () => setModal(!modal);

  const handdleUpdateUser = async (id) => {
    try {
      const res = await getInvitedUserById(id);

      setFormValues({
        type: String(res.data.type), // Ensure type is a string for Formik's validation
        fullName: res.data.fullName,
        birthDate: new Date(res.data.birthDate).toISOString().split("T")[0],
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
    fullName: "",
    birthDate: "",
    phoneNumber: "",
    id: null,
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required").oneOf(["1", "2"], "Invalid type"),
    fullName: Yup.string().required("Full Name is required").min(3, "Name must be at least 3 characters"),
    birthDate: Yup.date().required("Birth Date is required").max(new Date(), "Birth date cannot be in the future"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^\d{10,15}$/, "Phone Number must be between 10 and 15 digits"),
  });

  const handleSubmit =async (values, { resetForm }) => {
  
    await addInvitedUser(values);
    console.log(values);
    toggle();
    resetForm();
    setFormValues({
      type: "",
      fullName: "",
      birthDate: "",
      phoneNumber: "",
      id: null,
    })
    if(values.type === "1") refetchChild();
    if(values.type === "2") refetchDriver();
  };


  return (
    <div>
      <div className="d-flex justify-content-between">
        <button onClick={toggle} className="btn btn-primary">Add User</button>
      </div>
      <div className="row justify-content-around mt-5">
         <div className="col-12 col-sm-12 col-md-12 col-lg-8 p-4 border rounded-5 shadow-md">
          <div className="d-flex justify-content-between align-items-center">
          <h4>Childrens</h4>
          <input className="form-control rounded-pill" style={{width:"10rem"}} type="text" placeholder="Search" onChange={async(e)=>{
            const newParams = new URLSearchParams(searchParams);
            newParams.set("childSearchQuery", e.target.value);
            await setSearchParams(newParams);
            refetchChild();
          }}/>
         </div>
       {childData && <DataTable
            loading={childLoading}
            columns={column}
            data={childData.data}
            renderRow={renderRow}
            pageSize={childData.limit}
            pageNo={childData.pageNo}
            totalCount={childData.count}
            onPageChange={handleChildPageChange}
            noDataTitle="No paired users available."
        />}
        {childLoading &&
        <div className="w-100">
          <Skeleton count={1}  height={50}/>
          <Skeleton count={5}  height={40} /> 
          </div>}
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-4">
          <Notification notifications={notifications} />
        </div>
      </div>


      <div className="border rounded-5 shadow-md p-4 mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Drivers</h4>
        <input className="form-control rounded-pill" style={{width:"10rem"}} type="text" placeholder="Search" onChange={async(e)=>{
            const newParams = new URLSearchParams(searchParams);
            newParams.set("driverSearchQuery", e.target.value);
            await setSearchParams(newParams);
            refetchDriver();
        }}/>
        </div>
        {driverData && (
          <DataTable
            loading={driverLoading}
            columns={column}
            data={driverData.data}
            renderRow={renderRow}
            pageSize={driverData.limit}
            pageNo={driverData.pageNo}
            totalCount={driverData.count}
            onPageChange={handleDriverPageChange}
            noDataTitle="No paired users available."
          />
        )}
                {driverLoading &&
        <div className="w-100">
          <Skeleton count={1}  height={50}/>
          <Skeleton count={5}  height={40}/> 
          </div>}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New User</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="type">User Type</label>
                  <Field as="select" name="type" className="form-control">
                    <option value="">Select Type</option>
                    <option value="1">Child</option>
                    <option value="2">Driver</option>
                  </Field>
                  <ErrorMessage name="type" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="fullName">Full Name</label>
                  <Field type="text" name="fullName" className="form-control" placeholder="Enter full name" />
                  <ErrorMessage name="fullName" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="birthDate">Birth Date</label>
                  <Field type="date" name="birthDate" className="form-control" />
                  <ErrorMessage name="birthDate" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field type="text" name="phoneNumber" className="form-control" placeholder="Enter phone number" />
                  <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
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
