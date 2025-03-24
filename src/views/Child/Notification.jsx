import { useState } from "react";
import { Card, Table, Button } from "react-bootstrap";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Entered School Zone", time: "08:05 AM", read: false },
    { id: 2, message: "Left School Zone", time: "03:35 PM", read: true },
    { id: 3, message: "Entered Home Zone", time: "06:10 PM", read: false },
  ]);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="container mt-4">
      <Card className="shadow-lg">
        <Card.Header>
          <h4>Notifications</h4>
        </Card.Header>
        <Card.Body>
          <Table className="table-borderless">
            <thead>
              <tr style={{ borderBottom: "1px solid" }}>
                <th>Message</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <tr key={notif.id} style={{ borderBottom: "1px solid " }}>
                    <td className={notif.read ? "text-muted" : "fw-bold" } >{notif.message}</td>
                    <td>{notif.time}</td>
                    <td>
                      {!notif.read && (
                        <Button variant="success" size="sm" onClick={() => markAsRead(notif.id)}>
                          Mark as Read
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr style={{ borderBottom: "1px solid black" }}>
                  <td colSpan="3" className="text-center">No notifications available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
