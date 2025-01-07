import React, { useState } from "react";
import DataTable from "../../components/DataTable"; // Import DataTable component
import Notification from "../../components/Notification";
import { Dropdown } from "react-bootstrap";

const pairTableData = [
  { id: 1, name: "John Doe", type: "Driver", status: "pair", deviceStatus: "Online" },
  { id: 2, name: "Jane Smith", type: "Child", status: "pair", deviceStatus: "Offline" },
  // Add more paired data...
];

const unpairTableData = [
  { id: 1, name: "Sam Brown", type: "Child", status: "unpair" },
  { id: 2, name: "Lisa White", type: "Child", status: "unpair" },
  // Add more unpaired data...
];

const notifications = [
  { id: 1, message: "You have a new message" },
  { id: 2, message: "Your profile was viewed" },
  { id: 3, message: "Update your password" },
];

const UserManagement = () => {
  const [pairedUsers] = useState(pairTableData);
  const [unpairedUsers] = useState(unpairTableData);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 10; // Define page size
  const totalCount = pairedUsers.length; // For paired users

  const handlePageChange = (newPageNo) => {
    setPageNo(newPageNo); // Update the page number on pagination change
  };

  const pairedColumns = [
    {
      key: "name",
      title: "Name",
      accessorKey: "name", // Specifies the key to access the data for this column
      header: "User Name" // Specifies the header label
    },
    {
      key: "type",
      title: "Type",
      accessorKey: "type", // Specifies the key to access the data for this column
      header: "User Type" // Specifies the header label
    },
    {
      key: "status",
      title: "Status",
      accessorKey: "status", // Specifies the key to access the data for this column
      header: "Pairing Status" // Specifies the header label
    },
    {
      key: "deviceStatus",
      title: "Device Status",
      accessorKey: "deviceStatus", // Specifies the key to access the data for this column
      header: "Device Connection Status" // Specifies the header label
    },
    {
      key: "action",
      title: "Action",
      accessorKey: "action", // No need for an accessor key in this case, as actions are fixed
      header: "Actions" // Specifies the header label
    },
  ];
  const unPairedColumns = [
    {
      key: "name",
      title: "Name",
      accessorKey: "name", // Specifies the key to access the data for this column
      header: "User Name" // Specifies the header label
    },
    {
      key: "type",
      title: "Type",
      accessorKey: "type", // Specifies the key to access the data for this column
      header: "User Type" // Specifies the header label
    },
    {
      key: "status",
      title: "Status",
      accessorKey: "status", // Specifies the key to access the data for this column
      header: "Pairing Status" // Specifies the header label
    },
    {
      key: "action",
      title: "Action",
      accessorKey: "action", // No need for an accessor key in this case, as actions are fixed
      header: "Actions" // Specifies the header label
    },
  ];

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>{item.name}</td> {/* Accessor for name */}
      <td>{item.type}</td> {/* Accessor for type */}
      <td>{item.status}</td> {/* Accessor for status */}
      {item.deviceStatus && <td>{item.deviceStatus || "N/A"}</td>} {/* Accessor for deviceStatus */}
      <td>
        <Dropdown className="me-auto align-self-end ">
          <Dropdown.Toggle
            variant="light"
            className="d-flex align-items-center border-0 shadow-md"
          >
            <i className="ti ti-dots"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => alert(`Actions for user ID: ${item.id}`)}>
              Delete
            </Dropdown.Item>
            <Dropdown.Item>Update</Dropdown.Item>
            <Dropdown.Item>Unpair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary">Add User</button>
      </div>

      <div className="border rounded-5 shadow-md p-4 mt-5">
      <h4>Paired Users</h4>
          <DataTable
            loading={loading}
            columns={pairedColumns}
            data={pairedUsers}
            renderRow={renderRow}
            pageSize={pageSize}
            pageNo={pageNo}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            noDataTitle="No paired users available."
          />

      </div>
      <div className="row justify-content-around mt-5">
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 p-4 border rounded-5 shadow-md">
        <h4>Unpaired Users</h4>
        <DataTable
          loading={loading}
          columns={unPairedColumns}
          data={unpairedUsers}
          renderRow={renderRow}
          pageSize={pageSize}
          pageNo={pageNo}
          totalCount={unpairedUsers.length}
          onPageChange={handlePageChange}
          noDataTitle="No unpaired users available."
        />
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-4">
          <Notification notifications={notifications} />
        </div>
      </div>

    </div>
  );
};

export default UserManagement;
