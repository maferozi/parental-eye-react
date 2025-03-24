import { Dropdown } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Dashboard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const userData = [
    { id: 1, firstName: "Ali", lastName: "Khan", role: 4, status: 1,  driverId: "D456" },
    { id: 2, firstName: "Jacob", lastName: "Smith", role: 5, status: 2,  driverId: "D789" },
    { id: 3, firstName: "Larry", lastName: "Bird", role: 4, status: 2, driverId: "" }
  ];

  const renderRow = (item) => (
    <tr key={item.id} className="border-bottom">
      <td>{item.firstName} {item.lastName}</td>
      <td>{item.role === 4 ? "Child" : "Driver"}</td>
      <td className={`${item.status === 1 ? 'text-success' : 'text-warning'}`}>
        {item.status === 1 ? "Paired" : "Unpaired"}
      </td>
      
      <td>{item.role === 4 ? (item.driverId || "Free") : "-"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle variant="light">
            <i className="ti ti-dots"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
            <Dropdown.Item className="text-warning" onClick={() => { handleUpdateUser(item.id) }}>Update</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );

  return (
    <>
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
          { title: "Total User", value: 5, image: "/totalUser.png" },
          { title: "Total Devices", value: 7, image: "/totalDevice.png" },
          { title: "Users", value: 2, image: "/activeUser.png" },
          { title: "Devices", value: 3, image: "/activeDevice.png" },
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

      <div className="row">
        <div className="col-md-7 mt-3">
          <div className="card shadow-lg">
           
            <div className="card-body">
              <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
                <table className="table table-borderless table-hover">
                  <thead>
                    <tr className="border-bottom fs-5">
                      <th>Name</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Driver ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.filter(user => user.role === 4).map(renderRow)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5 mt-3">
          <div className="card text-bg-light mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="fw-bold">Recent Alerts</h4>
              <div className="dropdown">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                  Options
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">View All</a></li>
                  <li><a className="dropdown-item" href="#">Mark as Read</a></li>
                  <li><a className="dropdown-item" href="#">Clear Alerts</a></li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {[
                  "New user registered",
                  "Device added successfully",
                  "Warning: Unusual login attempt",
                ].map((alert, index) => (
                  <li key={index} className="list-group-item shadow-sm rounded-pill mb-3">
                    {alert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <h4 className="card-title text-center m-3 fw-bold">Map shows here</h4>
        <img src="/images/map.png" className="img-fluid" alt="Map" />
        <div className="card-body">
          <p className="card-text">
            <small className="text-body-secondary">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </>
  );
}
