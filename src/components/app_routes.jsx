/* eslint-disable react-refresh/only-export-components */

import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "./Loadable";
import Layout from "./Layout/Layout";
import RouteGuard from "./RouteGuard";
import RoleGuard from "./RoleGuard";

/* ***Layouts & Views**** */
const Auth = Loadable(lazy(() => import("../views/Auth/Auth")));
const Login = Loadable(lazy(() => import("../views/Auth/Login")));
const Register = Loadable(lazy(() => import("../views/Auth/Register")));
const Forget = Loadable(lazy(() => import("../views/Auth/Forget")));
const Home = Loadable(lazy(() => import("../views/Home")));
const Company = Loadable(lazy(() => import("../views/Company")));
const Reports = Loadable(lazy(() => import("../views/Reports")));

// Admin Views
const AdminDashboard = Loadable(lazy(() => import("../views/Admin/Dashboard")));
const AdminDevice = Loadable(lazy(() => import("../views/Admin/DeviceManagement")));
const AdminUserManagement = Loadable(lazy(() => import("../views/Admin/UserManagement")));
const AdminGeofence = Loadable(lazy(() => import("../views/Admin/Geofence")));
const AdminHistory = Loadable(lazy(() => import("../views/Admin/LocationHistory")));
const AdminNotification = Loadable(lazy(() => import("../views/Admin/Notification")));

// Super Admin Views
const SuperAdminDashboard = Loadable(lazy(() => import("../views/SuperAdmin/Dashboard")));
const SuperAdminUserManagement = Loadable(lazy(() => import("../views/SuperAdmin/UserManagement")));
const SuperAdminDeviceManagement = Loadable(lazy(() => import("../views/SuperAdmin/DeviceManagement")));
const SuperAdminNotification = Loadable(lazy(() => import("../views/SuperAdmin/Notification")));

// Child Tracking UI Views
const Homei = Loadable(lazy(() => import("../views/child-tracking-ui/Home")));
const Contact = Loadable(lazy(() => import("../views/child-tracking-ui/ContactUs")));
const Support = Loadable(lazy(() => import("../views/child-tracking-ui/Support")));
const Feature = Loadable(lazy(() => import("../views/child-tracking-ui/Features")));

const app_routes = [
    // Child Tracking UI Routes
    {
      path: "/home",
      exact: true,
      element: <Homei />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/feature",
      element: <Feature />,
    },
    {
      path: "/support",
      element: <Support />,
    },

  // Auth Routes
  {
    path: "/auth",
    element: (
      <RouteGuard>
        <Auth />
      </RouteGuard>
    ),
    children: [
      { path: "/auth/login", exact: true, element: <Login /> },
      { path: "/auth/register", exact: true, element: <Register /> },
      { path: "/auth/forget/:token?", exact: true, element: <Forget /> },
      { path: "*", element: <Navigate to="/home" /> },
    ],
  },


  // Admin Routes
  {
    path: "/admin",
    element: (
      <RouteGuard>
        <RoleGuard>
          <Layout />
        </RoleGuard>
      </RouteGuard>
    ),
    children: [
      { path: "/admin/", exact: true, element: <AdminDashboard /> },
      { path: "/admin/user-management", exact: true, element: <AdminUserManagement /> },
      { path: "/admin/device", exact: true, element: <AdminDevice /> },
      { path: "/admin/geofence", exact: true, element: <AdminGeofence /> },
      { path: "/admin/history", exact: true, element: <AdminHistory /> },
      { path: "/admin/notification", exact: true, element: <AdminNotification /> },
      { path: "*", element: <Navigate to="/admin/" /> },
    ],
  },

  // Super Admin Routes
  {
    path: "/super-admin",
    element: (
      <RouteGuard>
        <RoleGuard>
          <Layout />
        </RoleGuard>
      </RouteGuard>
    ),
    children: [
      { path: "/super-admin/", exact: true, element: <SuperAdminDashboard /> },
      { path: "/super-admin/user-management", exact: true, element: <SuperAdminUserManagement /> },
      { path: "/super-admin/device", exact: true, element: <SuperAdminDeviceManagement /> },
      { path: "/super-admin/notification", exact: true, element: <SuperAdminNotification /> },
      { path: "*", element: <Navigate to="/super-admin/" /> },
    ],
  },


  // Catch-All Redirect to Login
  { path: "*", element: <Navigate to="/home" /> },
];

export default app_routes;
