// src/reportData.js

export const userActivity = [
  {
    id: 1,
    name: "John Doe",
    lastLogin: "2025-04-06 10:20 AM",
    devices: 3,
    alerts: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastLogin: "2025-04-05 4:45 PM",
    devices: 1,
    alerts: 0,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Ali Khan",
    lastLogin: "2025-04-06 08:15 AM",
    devices: 2,
    alerts: 2,
    status: "Active",
  },
  {
    id: 4,
    name: "Sara Naveed",
    lastLogin: "2025-04-04 11:10 AM",
    devices: 4,
    alerts: 1,
    status: "Active",
  },
];

export const deviceUsage = [
  {
    deviceId: "D-001",
    screenTime: "5h 30m",
    mostUsedApps: ["YouTube", "WhatsApp", "Instagram"],
    status: "Online",
    lastLocation: "2025-04-06 09:30 AM",
  },
  {
    deviceId: "D-002",
    screenTime: "3h 10m",
    mostUsedApps: ["TikTok", "Snapchat"],
    status: "Offline",
    lastLocation: "2025-04-05 07:20 PM",
  },
  {
    deviceId: "D-003",
    screenTime: "6h 45m",
    mostUsedApps: ["Facebook", "Messenger", "YouTube Kids"],
    status: "Online",
    lastLocation: "2025-04-06 01:00 PM",
  },
  {
    deviceId: "D-004",
    screenTime: "2h 55m",
    mostUsedApps: ["WhatsApp", "Google Maps"],
    status: "Offline",
    lastLocation: "2025-04-05 09:10 PM",
  },
];

export const geoFencing = [
  {
    id: 1,
    user: "John Doe",
    event: "Exited",
    location: "School Zone",
    time: "2025-04-06 03:45 PM",
  },
  {
    id: 2,
    user: "Jane Smith",
    event: "Entered",
    location: "Home Zone",
    time: "2025-04-06 08:00 AM",
  },
  {
    id: 3,
    user: "Ali Khan",
    event: "Exited",
    location: "Playground",
    time: "2025-04-06 05:30 PM",
  },
  {
    id: 4,
    user: "Sara Naveed",
    event: "Entered",
    location: "Library",
    time: "2025-04-06 11:45 AM",
  },
];

export const locationHistory = [
  {
    user: "Jane Smith",
    locations: [
      { time: "10:00 AM", lat: "31.5204", lon: "74.3587" },
      { time: "10:15 AM", lat: "31.5210", lon: "74.3590" },
    ],
  },
  {
    user: "Ali Khan",
    locations: [
      { time: "09:30 AM", lat: "31.5100", lon: "74.3550" },
      { time: "09:45 AM", lat: "31.5115", lon: "74.3560" },
      { time: "10:00 AM", lat: "31.5120", lon: "74.3575" },
    ],
  },
  {
    user: "Sara Naveed",
    locations: [
      { time: "01:00 PM", lat: "31.5300", lon: "74.3600" },
      { time: "01:30 PM", lat: "31.5325", lon: "74.3612" },
    ],
  },
];

export const notificationLogs = [
  {
    type: "Geofence Breach",
    user: "John Doe",
    time: "2025-04-06 04:00 PM",
    message: "Exited home geofence.",
  },
  {
    type: "Alert",
    user: "Jane Smith",
    time: "2025-04-05 07:10 PM",
    message: "Suspicious activity detected.",
  },
  {
    type: "Login",
    user: "Ali Khan",
    time: "2025-04-06 08:15 AM",
    message: "User logged in from new device.",
  },
  {
    type: "Reminder",
    user: "Sara Naveed",
    time: "2025-04-06 11:00 AM",
    message: "Screen time limit reached.",
  },
];

export const trends = {
  activeUsers: [10, 12, 14, 9, 15, 17, 13],
  alertsTriggered: [2, 5, 3, 6, 4, 7, 1],
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};
