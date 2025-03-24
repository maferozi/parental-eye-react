import React, { useState } from 'react';

const LocationHistory = () => {
    const [selectedChild, setSelectedChild] = useState("Ali");

    const childHistory = {
      Ali: [
        { timestamp: "10:00 AM", location: "School", status: "Safe", activity: "Entered" },
        { timestamp: "02:00 PM", location: "Bus Stop", status: "Safe", activity: "Left School" },
        { timestamp: "02:30 PM", location: "Home", status: "Safe", activity: "Reached" },
      ],
      Jacob: [
        { timestamp: "09:00 AM", location: "Playground", status: "Safe", activity: "Playing" },
        { timestamp: "01:00 PM", location: "Mall", status: "Warning", activity: "Outside Safe Zone" },
        { timestamp: "03:00 PM", location: "Home", status: "Safe", activity: "Returned" },
      ],
    };
  
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4 display-5">Child Location History</h2>
        
        {/* Child Selection */}
        <div className="mb-3">
          <label className="form-label"><b>Select Child:</b></label>
          <select className="form-select" value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)}>
            {Object.keys(childHistory).map((child) => (
              <option key={child} value={child}>{child}</option>
            ))}
          </select>
        </div>
  
        {/* Location History Table */}
        <div className="card " style={{ maxHeight: "300px", overflow: "auto" }}>
          <h3 className="ms-2">Complete Location History</h3>
          <div className="card-body overflow-auto" style={{ maxHeight: "300px" }}>
            <table className="table table-borderless">
              <thead>
                <tr className="border-bottom solid ">
                  <th><b>Timestamp</b></th>
                  <th><b>Location</b></th>
                  <th><b>Status</b></th>
                  <th><b>Activity</b></th>
                </tr>
              </thead>
              <tbody>
                {childHistory[selectedChild]?.map((record, index) => (
                  <tr key={index} className="border-bottom">
                    <td>{record.timestamp}</td>
                    <td>{record.location}</td>
                    <td>{record.status}</td>
                    <td>{record.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
       
        <div className="card mt-3">
          <div className="card-header"> <h3>Route Map</h3></div>
          <div className="card-body text-center">
            <img src="/images/map.png" className="img-fluid" alt="Child Location Map" />
            <p className="text-muted mt-2"><small>Tracking history for {selectedChild}</small></p>
          </div>
        </div>
      </div>
    );
};

export default LocationHistory;