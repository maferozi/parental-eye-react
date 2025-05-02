import React from "react";
import DataTable from "../../components/DataTable";
import Skeleton from "react-loading-skeleton";
import {
  deviceUsage,
  geoFencing,
  notificationLogs,
  trends,
} from "../../reportData";

// Current driver’s identity (can be dynamic based on auth/session)
const currentDriver = "Ali Khan";

const Report = () => {
  const sections = [
    {
      title: "Device Usage Logs",
      data: deviceUsage.filter(
        (item) => item.user === currentDriver || item.deviceId === "D-003"
      ),
      columns: [
        { key: "deviceId", header: "Device ID" },
        { key: "screenTime", header: "Screen Time" },
        { key: "mostUsedApps", header: "Most Used Apps" },
        { key: "status", header: "Status" },
        { key: "lastLocation", header: "Last Location" },
      ],
      renderRow: (item, index) => (
        <tr key={index}>
          <td>{item.deviceId}</td>
          <td>{item.screenTime}</td>
          <td>{item.mostUsedApps.join(", ")}</td>
          <td>{item.status}</td>
          <td>{item.lastLocation}</td>
        </tr>
      ),
    },
    {
      title: "Geofencing Logs",
      data: geoFencing.filter((entry) => entry.user === currentDriver),
      columns: [
        { key: "id", header: "ID" },
        { key: "event", header: "Event" },
        { key: "location", header: "Location" },
        { key: "time", header: "Time" },
      ],
      renderRow: (item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.event}</td>
          <td>{item.location}</td>
          <td>{item.time}</td>
        </tr>
      ),
    },
    {
      title: "Notification Logs",
      data: notificationLogs.filter((entry) => entry.user === currentDriver),
      columns: [
        { key: "time", header: "Time" },
        { key: "type", header: "Type" },
        { key: "message", header: "Message" },
      ],
      renderRow: (item, index) => (
        <tr key={index}>
          <td>{item.time}</td>
          <td>{item.type}</td>
          <td>{item.message}</td>
        </tr>
      ),
    },
    {
      title: "Usage Trends",
      data: trends.labels.map((label, index) => ({
        id: index,
        day: label,
        activeUsers: trends.activeUsers[index], // You can make this specific to user if needed
        alerts: trends.alertsTriggered[index],
      })),
      columns: [
        { key: "day", header: "Day" },
        { key: "activeUsers", header: "Active Hours" },
        { key: "alerts", header: "Alerts Triggered" },
      ],
      renderRow: (item) => (
        <tr key={item.id}>
          <td>{item.day}</td>
          <td>{item.activeUsers}</td>
          <td>{item.alerts}</td>
        </tr>
      ),
    },
  ];

  return (
    <div className="container-fluid mt-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="p-4 mb-5 shadow-md border rounded-5 bg-white"
        >
          <h4 className="mb-4">{section.title}</h4>
          {section.data ? (
            <DataTable
              columns={section.columns}
              data={section.data}
              renderRow={section.renderRow}
              pageSize={5}
              pageNo={1}
              totalCount={section.data.length}
              onPageChange={() => {}}
              noDataTitle={`No ${section.title.toLowerCase()} available.`}
              loading={false}
            />
          ) : (
            <div className="w-100">
              <Skeleton count={1} height={50} />
              <Skeleton count={5} height={40} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Report;
