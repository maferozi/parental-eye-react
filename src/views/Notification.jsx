// src/views/Notification.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { getNotification } from '../api/notification';
import DataTable from '../components/DataTable';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSearchParams } from 'react-router-dom';

// Fix Leaflet default icon issues in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Notification = () => {
  const { userId } = useContext(AuthContext);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 10;
  const [showModal, setShowModal] = useState(false);
  const [searchLocation, setSearchLocation] = useSearchParams();
  
  const latitude = Number(searchLocation.get('latitude'));
  const longitude = Number(searchLocation.get('longitude'));
  const point = [latitude,longitude];

  console.log('Latitude:', latitude, 'Longitude:', longitude); // Debug logging

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications', userId, pageNo],
    queryFn: () => getNotification({ userId, page: pageNo, limit: pageSize }),
    keepPreviousData: true,
  });

  const columns = [
    { header: 'Notification Type', accessorKey: 'type' },
    { header: 'Device ID', accessorKey: 'deviceId' },
    { header: 'User ID', accessorKey: 'userId' },
    { header: 'Created At', accessorKey: 'createdAt' },
    { header: 'Action', accessorKey: 'action' },
  ];

  const renderRow = (notification) => {
    const deviceId = notification?.data?.deviceId;
    const userId = notification?.data?.childId;
    const location = notification?.data?.location;
    const createdAt = new Date(notification.created_at).toLocaleString();

    const openMap = () => {
      if (location?.latitude && location?.longitude) {
        console.log('Setting location in search params:', location); // Debug logging
        setSearchLocation({ latitude: location.latitude, longitude: location.longitude });
        setShowModal(true);
      }
    };

    return (
      <tr key={notification.id} className={`${notification.data.is_read == false? 'bg-blue': 'bg-white'}`}>
        <td>{notification.type}</td>
        <td>{deviceId || 'N/A'}</td>
        <td>{userId || 'N/A'}</td>
        <td>{createdAt}</td>
        <td>
          {location ? (
            <button className="btn btn-sm btn-success rounded-5" onClick={openMap}>
              View Location
            </button>
          ) : (
            <span className="text-muted">N/A</span>
          )}
        </td>
      </tr>
    );
  };

  const handleClose = () => {
    setShowModal(false);
    setSearchLocation({}); // Clear the params from URL
  };

  // Automatically show modal when URL has valid coordinates
  useEffect(() => {
    if (latitude && longitude) {
      console.log('Latitude and longitude from params:', latitude, longitude); // Debug logging
      setShowModal(true);
    }
  }, [latitude, longitude]);

  return (
    <div className="notification-page p-3">
      <h3 className="text-center mb-4">Notifications</h3>

      <DataTable
        loading={isLoading}
        columns={columns}
        data={data?.data || []}
        renderRow={renderRow}
        pageSize={pageSize}
        pageNo={pageNo}
        totalCount={data?.totalCount || 0}
        onPageChange={setPageNo}
        noDataTitle="No notifications available"
      />

      {isError && (
        <div className="text-danger text-center mt-2">Error fetching notifications.</div>
      )}

      {/* Modal for Leaflet Map */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Danger Location</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '400px' }}>
          {latitude && longitude ? (
            <MapContainer
              center={point}
              zoom={15} // Ensure proper zoom level
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={point}>
                <Popup>
                  Device Location: {latitude}, {longitude}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div>Loading location...</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Notification;
