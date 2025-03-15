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
const AdminReport = Loadable(lazy(() => import("../views/Admin/Report")));

// Super Admin Views
const SuperAdminDashboard = Loadable(lazy(() => import("../views/SuperAdmin/Dashboard")));
const SuperAdminUserManagement = Loadable(lazy(() => import("../views/SuperAdmin/UserManagement")));
const SuperAdminDeviceManagement = Loadable(lazy(() => import("../views/SuperAdmin/DeviceManagement")));
const SuperAdminNotification = Loadable(lazy(() => import("../views/SuperAdmin/Notification")));
const SuperAdminReport = Loadable(lazy(() => import("../views/SuperAdmin/Report")));

// Gardian Views
const GardianDashboard = Loadable(lazy(() => import("../views/Gardian/Dashboard")));
const GardianHistory = Loadable(lazy(() => import("../views/Gardian/LocationHistory")));
const GardianNotification = Loadable(lazy(() => import("../views/Gardian/Notification")));
const GardianReport = Loadable(lazy(() => import("../views/Gardian/Report")));

// Drvier Views
const DriverDashboard = Loadable(lazy(() => import("../views/Driver/Dashboard")));
const DriverHistory = Loadable(lazy(() => import("../views/Driver/LocationHistory")));
const DriverNotification = Loadable(lazy(() => import("../views/Driver/Notification")));
const DriverReport = Loadable(lazy(() => import("../views/Driver/Report")));

// Drvier Views
const ChildDashboard = Loadable(lazy(() => import("../views/Child/Dashboard")));
const ChildHistory = Loadable(lazy(() => import("../views/Child/LocationHistory")));
const ChildNotification = Loadable(lazy(() => import("../views/Child/Notification")));
const ChildReport = Loadable(lazy(() => import("../views/Child/Report")));

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
      { path: "/admin/report", exact: true, element: <AdminReport /> },
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
      { path: "/super-admin/report", exact: true, element: <SuperAdminReport /> },
      { path: "/super-admin/user-management", exact: true, element: <SuperAdminUserManagement /> },
      { path: "/super-admin/device", exact: true, element: <SuperAdminDeviceManagement /> },
      { path: "/super-admin/notification", exact: true, element: <SuperAdminNotification /> },
      { path: "*", element: <Navigate to="/super-admin/" /> },
    ],
  },


   // Gardian Routes
   {
    path: "/gardian",
    element: (
      <RouteGuard>
        <RoleGuard>
          <Layout />
        </RoleGuard>
      </RouteGuard>
    ),
    children: [
      { path: "/gardian/", exact: true, element: <GardianDashboard /> },
      { path: "/gardian/report", exact: true, element: <GardianReport /> },
      { path: "/gardian/history", exact: true, element: <GardianHistory /> },
      { path: "/gardian/notification", exact: true, element: <GardianNotification /> },
      { path: "*", element: <Navigate to="/gardian/" /> },
    ],
  },


   // Driver Routes
   {
    path: "/driver",
    element: (
      <RouteGuard>
        <RoleGuard>
          <Layout />
        </RoleGuard>
      </RouteGuard>
    ),
    children: [
      { path: "/driver/", exact: true, element: <DriverDashboard /> },
      { path: "/driver/report", exact: true, element: <DriverReport /> },
      { path: "/driver/history", exact: true, element: <DriverHistory /> },
      { path: "/driver/notification", exact: true, element: <DriverNotification /> },
      { path: "*", element: <Navigate to="/driver/" /> },
    ],
  },


   // Child Routes
   {
    path: "/child",
    element: (
      <RouteGuard>
        <RoleGuard>
          <Layout />
        </RoleGuard>
      </RouteGuard>
    ),
    children: [
      { path: "/child/", exact: true, element: <ChildDashboard /> },
      { path: "/child/report", exact: true, element: <ChildReport /> },
      { path: "/child/history", exact: true, element: <ChildHistory /> },
      { path: "/child/notification", exact: true, element: <ChildNotification /> },
      { path: "*", element: <Navigate to="/child/" /> },
    ],
  },


  // Catch-All Redirect to Login
  { path: "*", element: <Navigate to="/home" /> },
];

export default app_routes;
