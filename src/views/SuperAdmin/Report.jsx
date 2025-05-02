// Report.jsx - SUPER ADMIN version (full access to all report data)
import React from "react";
import DataTable from "../../components/DataTable";
import Skeleton from "react-loading-skeleton";
import {
  userActivity,
  deviceUsage,
  geoFencing,
  locationHistory,
  notificationLogs,
  trends,
} from "../../reportData";

const Report = () => {
  const sections = [
    {
      title: "User Activity Logs",
      data: userActivity,
      columns: [
        { key: "id", header: "ID" },
        { key: "name", header: "Name" },
        { key: "lastLogin", header: "Last Login" },
        { key: "devices", header: "Devices" },
        { key: "alerts", header: "Alerts" },
        { key: "status", header: "Status" },
      ],
      renderRow: (item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.lastLogin}</td>
          <td>{item.devices}</td>
          <td>{item.alerts}</td>
          <td>{item.status}</td>
        </tr>
      ),
    },
    {
      title: "Device Usage Logs",
      data: deviceUsage,
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
      data: geoFencing,
      columns: [
        { key: "id", header: "ID" },
        { key: "user", header: "User" },
        { key: "event", header: "Event" },
        { key: "location", header: "Location" },
        { key: "time", header: "Time" },
      ],
      renderRow: (item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.user}</td>
          <td>{item.event}</td>
          <td>{item.location}</td>
          <td>{item.time}</td>
        </tr>
      ),
    },
    {
      title: "Location History",
      data: locationHistory.flatMap((entry) =>
        entry.locations.map((loc, idx) => ({
          user: entry.user,
          ...loc,
          id: `${entry.user}-${idx}`,
        }))
      ),
      columns: [
        { key: "user", header: "User" },
        { key: "time", header: "Time" },
        { key: "lat", header: "Latitude" },
        { key: "lon", header: "Longitude" },
      ],
      renderRow: (item) => (
        <tr key={item.id}>
          <td>{item.user}</td>
          <td>{item.time}</td>
          <td>{item.lat}</td>
          <td>{item.lon}</td>
        </tr>
      ),
    },
    {
      title: "Notification Logs",
      data: notificationLogs,
      columns: [
        { key: "user", header: "User" },
        { key: "time", header: "Time" },
        { key: "type", header: "Type" },
        { key: "message", header: "Message" },
      ],
      renderRow: (item, index) => (
        <tr key={index}>
          <td>{item.user}</td>
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
        activeUsers: trends.activeUsers[index],
        alerts: trends.alertsTriggered[index],
      })),
      columns: [
        { key: "day", header: "Day" },
        { key: "activeUsers", header: "Active Users" },
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
