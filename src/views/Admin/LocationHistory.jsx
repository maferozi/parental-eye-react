import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "leaflet/dist/leaflet.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLocationById, getUserWithLocationHistory } from "../../api/location";
import DataTable from "../../components/DataTable";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const LocationHistory = () => {
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const userId = searchParams.get("userId");  // Get userId from query params
  const queryClient = useQueryClient();

  // Fetch location data based on userId from query params
  const { data, isLoading, isError } = useQuery({
    queryKey: ["location", userId],
    queryFn: () => userId ? getLocationById({ userId }) : Promise.resolve(null),
    enabled: !!userId,  // Only fetch if userId exists
  });

  // Fetch user data
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["user with location"],
    queryFn: getUserWithLocationHistory,
  });

  // Extract path coordinates for Polyline
  const pathCoordinates = data?.location?.map((loc) => [
    loc.location.coordinates[1], // Latitude
    loc.location.coordinates[0], // Longitude
  ]) || [];

  const center = pathCoordinates.length > 0 ? pathCoordinates[0] : [31.5, 74.3];

  // Table Columns
  const columns = [
    { key: "fullName", title: "Name", accessorKey: "fullName", header: "Name" },
    { key: "status", title: "Status", accessorKey: "status", header: "Status" },
    { key: "phoneNumber", title: "Phone No", accessorKey: "phoneNumber", header: "Phone No" },
    { key: "deviceId", title: "Device ID", accessorKey: "deviceId", header: "Device ID" },
    { key: "action", title: "Action", accessorKey: "action", header: "Actions" },
  ];

  const toggle = () => setModal(!modal);

  // Filtered users based on search
  const filteredUsers = usersData?.users?.filter(user =>
    user.user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Handle View Click (Update Query Params)
  const handleViewClick = (userId) => {
    setSearchParams({ userId });  // Update query params
    queryClient.invalidateQueries(["location", userId]);  // Invalidate query
    setModal(true);  // Open modal
  };

  // Render row function
  const renderRow = (row) => (
    <tr key={row.id}>
      <td>{row.user?.fullName || "N/A"}</td>
      <td>{row.user?.status === 1 ? "Active" : "Inactive"}</td>
      <td>{row.user?.phoneNumber || "N/A"}</td>
      <td>{row.id || "N/A"}</td>
      <td className="text-primary cursor-pointer" onClick={() => handleViewClick(row.user?.id)}>
        View
      </td>
    </tr>
  );

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
            renderRow={renderRow}
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
          {isLoading ? (
            <p>Loading map...</p>
          ) : isError || !data?.location?.length ? (
            <p>Error loading map data.</p>
          ) : (
            <MapContainer center={center} zoom={18} style={{ height: "500px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Polyline positions={pathCoordinates} color="red" />
            </MapContainer>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LocationHistory;
