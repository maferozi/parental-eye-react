import React from "react";

export default function ParentNotifications() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Notifications</h2>

      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title">Recent Alerts</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item shadow-sm rounded-pill mb-3 ">
              Ali has left school at 02:30 PM.
            </li>
            <li className="list-group-item shadow-sm rounded-pill mb-3 ">
              Ali entered the restricted area at 03:00 PM.
            </li>
            <li className="list-group-item shadow-sm rounded-pill mb-3 ">
              Battery low on tracking device (10%).
            </li>
            <li className="list-group-item shadow-sm rounded-pill mb-3 ">
              Jacob arrived at home at 05:00 PM.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
