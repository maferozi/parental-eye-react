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
const Company = Loadable(lazy(() => import("../views/Company")))
const Reports = Loadable(lazy(() => import("../views/Reports")))

const app_routes = [
    {
        path: "/auth",
        element: <Auth />,
        children: [
            { path: '/auth/login', exact: true, element: <Login /> },
            { path: '/auth/register', exact: true, element: <Register /> },
            { path: "/auth/forget/:token?", exact: true, element: <Forget /> },
        ]
    },
    {
        path: '/',

        element: <Layout />,
        children: [
            { path: '', exact: true, element: <Navigate to="/home" /> },
            { path: '/home', exact: true, element: <RouteGuard> <Home /> </RouteGuard> },
            { path: '/company', exact: true, element: <RouteGuard> <Company /> </RouteGuard> },
            { path: '/reports', exact: true, element: <RouteGuard> <Reports /> </RouteGuard> },
            { path: '*', element: <Navigate to="/home" /> },
        ],
    },

];

export default app_routes;
