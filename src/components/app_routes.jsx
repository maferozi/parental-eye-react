/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// import RouteGuard from './RouteGuard';
import Loadable from './Loadable';
import Layout from './Layout/Layout';
import RouteGuard from './RouteGuard';
import RoleGuard from './RoleGuard';



/* ***Layouts**** */
const Auth = Loadable(lazy(() => import('../views/Auth/Auth')));
const Login = Loadable(lazy(() => import('../views/Auth/Login')));
const Register = Loadable(lazy(() => import('../views/Auth/Register')));
const Forget = Loadable(lazy(() => import('../views/Auth/Forget')));
const Home = Loadable(lazy(() => import("../views/Home")))
const AdminDashboard = Loadable(lazy(() => import("../views/Admin/Dashboard")));
const AdminDevice = Loadable(lazy(() => import("../views/Admin/DeviceManagement")));
const AdminUserManagemnet = Loadable(lazy(() => import("../views/Admin/UserManagement")));
const AdminGeofence = Loadable(lazy(() => import("../views/Admin/Geofence")));
const AdminNotification = Loadable(lazy(() => import("../views/Admin/Notification")));

const SuperAdminDashboard = Loadable(lazy(() => import("../views/SuperAdmin/Dashboard")));
const SuperAdminUserManagemnet = Loadable(lazy(() => import("../views/SuperAdmin/UserManagement")));
const SuperAdminDeviceManagement = Loadable(lazy(() => import("../views/SuperAdmin/DeviceManagement")));
const SuperAdminNotification = Loadable(lazy(() => import("../views/SuperAdmin/Notification")));

const Company = Loadable(lazy(() => import("../views/Company")))
const Reports = Loadable(lazy(() => import("../views/Reports")))

const app_routes = [
    {
        path: "/auth",
        element: <RouteGuard><Auth /></RouteGuard>,
        children: [
            { path: '/auth/login', exact: true, element: <Login /> },
            { path: '/auth/register', exact: true, element: <Register /> },
            { path: "/auth/forget/:token?", exact: true, element: <Forget /> },
        ]
    },
    {
        path: '/admin',
        element:<RouteGuard> <RoleGuard> <Layout /> </RoleGuard></RouteGuard>,
        children: [
            { path: '/admin/', exact: true, element:  <AdminDashboard/>  },
            { path: '/admin/user-management', exact: true, element:  <AdminUserManagemnet />  },
            { path: '/admin/device', exact: true, element:  <AdminDevice />  },
            { path: '/admin/geofence', exact: true, element:  <AdminGeofence />  },
            { path: '/admin/notification', exact: true, element:  <AdminNotification />  },
            { path: '*', element: <Navigate to="/admin/" /> },
        ],
    },
    {
        path: '/super-admin',
        element:<RouteGuard> <RoleGuard> <Layout /> </RoleGuard> </RouteGuard>,
        children: [
            { path: '/super-admin/', exact: true, element:  <SuperAdminDashboard/>  },
            { path: '/super-admin/user-management', exact: true, element:  <SuperAdminUserManagemnet />  },
            { path: '/super-admin/device', exact: true, element:  <SuperAdminDeviceManagement />  },
            { path: '/super-admin/notification', exact: true, element:  <SuperAdminNotification />  },

            { path: '*', element: <Navigate to="/super-admin/" /> },
        ],
    },
    { path: '*', element: <Navigate to="/auth/login" /> },

];

export default app_routes;
