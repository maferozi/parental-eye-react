import React, { useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New trip assigned for today at 8:00 AM", time: "March 30, 2025, 07:00 AM", status: "unread" },
    { id: 2, message: "Child pickup delayed due to traffic", time: "March 29, 2025, 03:15 PM", status: "read" },
    { id: 3, message: "Emergency alert triggered by parent", time: "March 28, 2025, 10:45 AM", status: "unread" },
    { id: 4, message: "Maintenance check scheduled for vehicle", time: "March 27, 2025, 06:30 PM", status: "read" },
  ]);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, status: "read" } : notif
      )
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Driver Notifications</h1>

      <div className="card">
        <div className="card-body">
          <h2 className="h5">Recent Alerts</h2>
          {notifications.length === 0 ? (
            <p className="text-muted">No new notifications.</p>
          ) : (
            <ul className="list-group">
              {notifications.map((notif) => (
                <li key={notif.id} className={`list-group-item d-flex justify-content-between align-items-center ${notif.status === "unread" ? "bg-light" : ""}`}>
                  <div>
                    <p className="mb-1"><strong>{notif.message}</strong></p>
                    <p className="text-muted small">{notif.time}</p>
                  </div>
                  {notif.status === "unread" && (
                    <button className="btn btn-sm btn-primary" onClick={() => markAsRead(notif.id)}>Mark as Read</button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
