import { io } from "socket.io-client";
import { BASE_URL } from "../constants";
import { Bounce, toast } from "react-toastify";

export const socket = io(BASE_URL, { autoConnect: false });

// Function to register a user for real-time updates
export const registerUser = (userId) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit("registerUser", userId);
};

// Listen for user-specific updates
socket.on("deviceStatusUpdate", ({ userId, deviceId, status }) => {
  console.log(`🔄 Device ${deviceId} Status Updated: ${status}`);
});

socket.on("deviceChange", ({ userId, action, deviceId }) => {
  console.log(`🔄 Device ${deviceId} ${action}`);
});

// socket.on("dangerAlert", ({ userId, deviceId }) => {
//   console.log(`⚠️ Danger Alert for Device ${deviceId}`);
// });

socket.on("newNotification", (data) => {
    console.log("🔔 New Notification Received:", data);
  
    // Display toast notification
    toast.error(`📢 ${data.type.replace("_", " ").toUpperCase()}: ${data.data.deviceId ? `Device ID: ${data.data.deviceId}` : ""}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  });