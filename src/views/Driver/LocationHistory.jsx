import React, { useState } from "react";

const LocationHistory = () => {
  const [selectedRange, setSelectedRange] = useState("Last 7 days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const locationHistory = [
    { id: 1, date: "March 30, 2025", time: "08:30 AM", location: "School" },
    { id: 2, date: "March 30, 2025", time: "02:45 PM", location: "Home" },
    { id: 3, date: "March 29, 2025", time: "07:15 AM", location: "School" },
    { id: 4, date: "March 29, 2025", time: "02:40 PM", location: "Home" },
    { id: 5, date: "March 28, 2025", time: "07:30 AM", location: "School" },
  ];

  const timeRanges = ["Last 2 days", "Last 7 days", "Last 1 month"];

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Driver Location History</h1>

      <div className="card mb-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h2 className="h5">View Location History</h2>

          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedRange}
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu show" style={{ display: "block" }}>
                {timeRanges.map((range, index) => (
                  <li key={index}>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedRange(range);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {range}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card-body border-top">
          <ul className="list-group">
            {locationHistory.map((entry) => (
              <li
                key={entry.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <p className="mb-1">
                    <strong>Date:</strong> {entry.date}
                  </p>
                  <p className="mb-1">
                    <strong>Time:</strong> {entry.time}
                  </p>
                </div>
                <span className="text-muted">
                  <strong>Location:</strong> {entry.location}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationHistory;
