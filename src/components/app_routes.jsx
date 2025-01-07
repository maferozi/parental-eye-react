/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// import RouteGuard from './RouteGuard';
import Loadable from './Loadable';
import Layout from './Layout/Layout';
import RouteGuard from './RouteGuard';



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
        path: '/',

        element:<RouteGuard> <Layout /></RouteGuard>,
        children: [
            { path: '', exact: true, element: <Navigate to="/home" /> },
            { path: '/dashboard', exact: true, element:  <AdminDashboard/>  },
            { path: '/user-management', exact: true, element:  <AdminUserManagemnet />  },
            { path: '/device', exact: true, element:  <AdminDevice />  },
            { path: '/geofence', exact: true, element:  <AdminGeofence />  },
            { path: '/notification', exact: true, element:  <AdminNotification />  },
            { path: '*', element: <Navigate to="/home" /> },
        ],
    },

];

export default app_routes;
