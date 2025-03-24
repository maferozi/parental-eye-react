import React, { useState } from "react";
import { motion } from "framer-motion";

const DriverDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSchedual, setSchedual] = useState(false);
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const location = { lat: "punjab university", lng: "Pakistan" }; 
  const tripHistory = [
    { id: 1, child: "Ali", pickup: "School", dropoff: "Home", time: "08:30 AM", status: "Delivered" },
    { id: 2, child: "Sara", pickup: "Home", dropoff: "School", time: "02:30 PM", status: "Delivered" },
    { id: 3, child: "Omar", pickup: "Home", dropoff: "School", time: "--", status: "Not Picked" },
    { id: 4, child: "Ayesha", pickup: "School", dropoff: "--", time: "--", status: "In Ride" }
  ];

  return (
    <>
      <h1 className="text-center mb-4">Driver Dashboard</h1>
      <motion.div
        className="row row-cols-1 row-cols-md-5 g-3 bg-primary p-2 rounded"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {[
          { title: "Total Children", value: 35, image: "/totalUser.png" },
          { title: "In ride", value: 7, image: "/Child_in_ride.png" },
          { title: "Delivered", value: 2, image: "/activeUser.png" },
          { title: "Not pick", value: 3, image: "/absentChild.png" },
          { title: "More Info", value: 3, image: "/moreInfo.png" },
        ].map((item, index) => (
          <motion.div key={index} className="col" variants={cardVariants}>
            <div className="card h-100">
              <div className="card-body shadow text-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="img-fluid mb-2" 
                  style={{ height: "30px", width: "30px" }} 
                />
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="container mt-4">
        <div className="card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h2 className="h5">Current Location</h2>
              <p className="text-muted"> {location.lat}, {location.lng}</p>
            </div>
            <button className="btn btn-outline-primary" onClick={() => setIsCollapsed(!isCollapsed)}>View Map</button>
          </div>
          {isCollapsed && (
            <div className="card-body border-top">
              <img src="/images/map.png"></img>
            </div>
          )}
        </div>

        <div className="card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h2 className="h5">Todays schedual </h2>
              <p className="text-muted"> March 31 , 2025</p>
            </div>
            <button className="btn btn-outline-primary" onClick={() => setSchedual(!isSchedual)}>View Schedual</button>
          </div>
          {isSchedual && (
             <div className="card-body border-top">
             <ul className="list-group">
               {[
                 { id: 1, child: "Ali", pickup: "Home", dropoff: "School", time: "07:30 AM" },
                 { id: 2, child: "Sara", pickup: "Home", dropoff: "School", time: "07:45 AM" },
                 { id: 3, child: "Omar", pickup: "School", dropoff: "Home", time: "02:30 PM" },
                 { id: 4, child: "Ayesha", pickup: "School", dropoff: "Home", time: "02:45 PM" },
               ].map((trip) => (
                 <li key={trip.id} className="list-group-item d-flex justify-content-between align-items-center">
                   <div>
                     <p className="mb-1"><strong>Child:</strong> {trip.child}</p>
                     <p className="mb-1"><strong>Pickup:</strong> {trip.pickup}</p>
                     <p className="mb-1"><strong>Dropoff:</strong> {trip.dropoff}</p>
                   </div>
                   <span className="text-muted">{trip.time}</span>
                 </li>
               ))}
             </ul>
           </div>
          )}
        </div>
        

        <div className="card mb-3">
          <div className="card-body">
            <h2 className="h5">Logs History</h2>
            <ul className="list-group mt-2">
              {tripHistory.map((trip) => (
                <li key={trip.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1"><strong>Child:</strong> {trip.child}</p>
                    <p className="mb-1"><strong>Pickup:</strong> {trip.pickup}</p>
                    <p className="mb-1"><strong>Dropoff:</strong> {trip.dropoff}</p>
                  </div>
                  <div>
                    <span className="text-muted">{trip.time}</span>
                    <span className={`badge ms-2 ${trip.status === "Delivered" ? "bg-success" : trip.status === "Not Picked" ? "bg-danger" : "bg-warning"}`}>
                      {trip.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="d-flex gap-3">
          <button className="btn btn-danger">Emergency Alert</button>
          <button className="btn btn-outline-primary" href="/driver/notification">View Notifications</button>
        </div>
      </div>
    </>
  );
};

export default DriverDashboard;
