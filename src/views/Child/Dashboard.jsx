import { useState } from "react";
import { Card, Table, Button, Alert, Modal, Badge } from "react-bootstrap";
import { motion } from "framer-motion";

export default function ChildDashboard() {
  const [showEmergency, setShowEmergency] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Entered School Zone", time: "08:05 AM", read: false },
    { id: 2, message: "Left School Zone", time: "03:35 PM", read: true },
    { id: 3, message: "Entered Home Zone", time: "06:10 PM", read: false },
  ]);

  const items = [
    { title: "Driver Information", value: "Ali, 123456789", icon: "🚘" },
    { title: "Notifications", value: 2, icon: "🔔" },
    { title: "Unread Alerts", value: 2, icon: "⚠️" },
  ];

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const tableHeaders = ["Message", "Time", "Action"];

  return (
    <div className="container mt-3">
      {/* Call & Emergency Buttons */}
      <div className="d-flex justify-content-center gap-4 mt-3">
        <Button variant="success" className="fw-bold px-4 py-3 shadow">
          📞 Call Driver
        </Button>
        <Button
          className="fw-bold btn btn-lg btn-danger px-4 py-3 shadow"
          onClick={() => setShowEmergency(true)}
        >
          🚨 Emergency
        </Button>
      </div>

      {/* Dashboard Items */}
      <div className="row g-4 bg-primary mt-3">
        <div className="col-md-6">
          <div className="d-flex gap-3">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="col-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="shadow text-center rounded-4 border-0 p-3">
                  <Card.Body>
                    <h3>{item.icon}</h3>
                    <h5 className="fw-semibold">{item.title}</h5>
                    <p className="fs-5 fw-bold text-primary">{item.value}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Last Known Location */}
      <Card className="mt-4 shadow-lg rounded-4 border-0">
        <Card.Header className="rounded-top-4">
          <h4>Last Known Location</h4>
        </Card.Header>
        <Card.Body className="text-center">
          <img
            src="/images/map.png"
            alt="Child's Last Location"
            className="img-fluid rounded-3 shadow"
            style={{
              maxWidth: "100%",
              height: "400px",
              objectFit: "cover",
              border: "2px solid #ddd",
            }}
          />
          <p className="mt-2 text-muted">Last updated: 5 mins ago</p>
        </Card.Body>
      </Card>

      {/* Alerts & Notifications Table */}
      <Card className="mt-4 shadow-lg rounded-4 border-0">
        <Card.Header className="rounded-top-4">
          <h4>Alerts & Notifications</h4>
        </Card.Header>
        <Card.Body>
          <Table className="shadow-sm rounded-3 overflow-hidden border-0">
            <thead className="bg-light">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th className="fw-bold" key={index}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notifications.map((alert) => (
                <tr key={alert.id} className={alert.read ? "text-muted" : "fw-bold border-0"}>
                  <td>
                    {alert.message}{" "}
                    {!alert.read && <Badge bg="danger" className="m-2">New</Badge>}
                  </td>
                  <td>{alert.time}</td>
                  <td>
                    {!alert.read && (
                      <Button variant="success" size="sm" onClick={() => markAsRead(alert.id)}>
                         Mark as Read
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Emergency Alert Modal */}
      <Modal show={showEmergency} onHide={() => setShowEmergency(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>🚨 Emergency Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Alert variant="danger">
            <strong>Emergency Alert Sent!</strong> Your guardian and driver have been notified.
          </Alert>
          <p className="text-danger fw-bold">Stay where you are and wait for assistance.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmergency(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
