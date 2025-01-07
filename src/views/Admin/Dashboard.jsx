import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Notification from "../../components/Notification";
import DataTable from "../../components/DataTable"; // Import DataTable

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}; 

const CardContainer = () => {
  const cards = [
    { id: 1, img: "/totalUser.png", description: "Total Users", number: 10 },
    { id: 2, img: "/activeUser.png", description: "Active Users", number: 20 },
    { id: 3, img: "/totalDecive.png", description: "Total Devices", number: 30 },
    { id: 4, img: "/activeDevice.png", description: "Active Devices", number: 40 },
    { id: 5, img: "/moreInfo.png", description: "More Info" },
  ];

  const notifications = [
    { id: 1, message: "You have a new message" },
    { id: 2, message: "Your profile was viewed" },
    { id: 3, message: "Update your password" },
  ];

  const data = useMemo(
    () => [
      { id: 1, childName: "John Doe", driverName: "Driver 1", status: "Active", deviceStatus: "Online" },
      { id: 2, childName: "Jane Smith", driverName: "Driver 2", status: "Inactive", deviceStatus: "Offline" },
      { id: 3, childName: "Sam Brown", driverName: "Driver 3", status: "Active", deviceStatus: "Online" },
      { id: 4, childName: "Lisa White", driverName: "Driver 4", status: "Inactive", deviceStatus: "Offline" },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { accessorKey: "childName", header: "Child Name" },
      { accessorKey: "driverName", header: "Driver Name" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "deviceStatus", header: "Device Status" },
    ],
    []
  );

  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 10; // Define page size
  const totalCount = data.length; // Total users data count

  const handlePageChange = (newPageNo) => {
    setPageNo(newPageNo); // Update the page number on pagination change
  };

  const renderRow = (item, index) => (
    <tr key={index}>
      <td>{item.childName}</td>
      <td>{item.driverName}</td>
      <td>{item.status}</td>
      <td>{item.deviceStatus}</td>
    </tr>
  );

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="container">
        <motion.ul 
        variants={container}
        initial="hidden"
        animate="visible"
        className="row justify-content-between m-auto gap-2 bg-primary p-4 rounded-5 shadow-md-black">
          {cards.map((card) => (
            <motion.li 
            variants={item}
            className="col-12 col-sm-6 col-md-4 col-lg-2" key={card.id}>
              <div className="card h-100 rounded-5">
                <div className="card-body d-flex flex-column justify-content-around align-items-center">
                  <img style={{ width: "30px" }} src={card?.img} alt="Img" />
                  <h6 className="text-center">{card?.description}</h6>
                  <h6 className="fw-bolder">{card?.number}</h6>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="row justify-content-around mt-5">
          <div className="col-8 col-sm-12 col-md-12 col-lg-8 p-4 border rounded-5 shadow-md">
            <h4>User Travel</h4>
            <DataTable
              loading={loading}
              columns={columns}
              data={data}
              renderRow={renderRow} // Pass the renderRow function
              pageSize={pageSize}
              pageNo={pageNo}
              totalCount={totalCount}
              onPageChange={handlePageChange}
              noDataTitle="No data available"
            />
          </div>
          <div className="col-4 col-sm-12 col-md-12 col-lg-4">
            <Notification notifications={notifications} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
