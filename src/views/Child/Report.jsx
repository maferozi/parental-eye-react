import React from "react";
import DataTable from "../../components/DataTable";
import Skeleton from "react-loading-skeleton";
import { notificationLogs, trends } from "../../reportData"; // Only import data the child has access to

const Report = () => {
  const sections = [
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
