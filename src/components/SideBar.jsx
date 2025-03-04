import React, { useContext } from 'react';
import logo from '/logo.png';
import userImg from '../assets/images/user-1.jpg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SignInButton from './SignInButton';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }; 

function Sidebar({
    isLoading,
    
    showSideBar,
    setShowSideBar,
}) {
    const sidebarToggler = () => {
        setShowSideBar(false);
        const mainWrapper = document.querySelector(".sidebar--container");
        mainWrapper.classList.remove("expand--sidebar");
        mainWrapper.classList.add("collapse--sidebar");

        
    // Toggle the show-sidebar class on the #main-wrapper element
    // const mainWrapper = document.getElementById("main-wrapper");
    // mainWrapper.classList.toggle("show-sidebar");

    // Toggle data-sidebartype attribute on the body element
    // const body = document.querySelector("body");
    // const dataTheme = body.getAttribute("data-sidebartype");
    // if (dataTheme === "full") {
    //   body.setAttribute("data-sidebartype", "mini-sidebar");
    // } else {
    //   body.setAttribute("data-sidebartype", "full");
    // }
    };

    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handdleLogout = () => {
        logout();
        navigate('/auth/login');
      }


    return (
        <div className='vh-100 bg-light d-flex flex-column shadow-md-black'>
        <div className="p-3 d-flex align-items-center justify-content-start">
        <NavLink to={'/home'} className="text-nowrap logo-img">
                        <img
                            src={logo}
                            className="dark-logo transition--custom"
                            style={{
                                width: showSideBar ? '70px' : '50px',
                            }}
                            alt="Logo-Dark"
                        />
                    </NavLink>
                    {showSideBar && (
                        <a
                            onClick={sidebarToggler}
                            className="sidebartoggler ms-auto text-decoration-none fs-5 d-block"
                        >
                            <i className="ti ti-x"></i>
                        </a>
                    )}
        </div>

    <div className='flex-grow-1'>

        <SimpleBar style={{ maxHeight: '78vh', overflowX: 'hidden' }} autoHide={false}>
            <nav className="sidebar-nav scroll-sidebar p-3 " >

                <motion.ul id="sidebarnav" className='d-flex flex-column gap-2' variants={container}
    initial="hidden"
    animate="visible">
                    <motion.li variants={item} className="sidebar-item">
                        <NavLink to={`${user?.role === 1? '/super-admin': '/admin'}/dashboard`} className={(navData) => (navData.isActive ? "sidebar-link active" : "sidebar-link")} 

                        aria-expanded="false">
                            <span>
                                <i className="ti ti-home"></i>
                            </span>
                            {showSideBar && (
                                <span className="hide-menu ">Dashboard</span>
                            )}
                        </NavLink>
                    </motion.li>
                    <motion.li variants={item} className="sidebar-item">
                        <NavLink to={`${user?.role === 1? '/super-admin': '/admin'}/user-management`} className={(navData) => (navData.isActive ? "sidebar-link active" : "sidebar-link")} 

                        aria-expanded="false">
                            <span>
                                <i className="ti ti-users"></i>
                            </span>
                            {showSideBar && (
                                <span className="hide-menu ">User Management</span>
                            )}
                        </NavLink>
                    </motion.li>
                    <motion.li variants={item} className="sidebar-item">
                        <NavLink to={`${user?.role === 1? '/super-admin': '/admin'}/device`} className={(navData) => (navData.isActive ? "sidebar-link active" : "sidebar-link")} 

                        aria-expanded="false">
                            <span>
                                <i className="ti ti-devices"></i>
                            </span>
                            {showSideBar && (
                            <span className="hide-menu ">Device Management</span>
                            )}
                        </NavLink>
                    </motion.li>
                    <motion.li variants={item} className="sidebar-item">
                        <NavLink to={`${user?.role === 1? '/super-admin': '/admin'}/geofence`} className={(navData) => (navData.isActive ? "sidebar-link active" : "sidebar-link")} 

                        aria-expanded="false">
                            <span>
                                <i className="ti ti-map"></i>
                            </span>
                            {showSideBar && (
                                <span className="hide-menu ">GeoFencing</span>
                            )}
                        </NavLink>
                    </motion.li>
                    <motion.li variants={item} className="sidebar-item">
                        <NavLink to={`${user?.role === 1? '/super-admin': '/admin'}/history`} className={(navData) => (navData.isActive ? "sidebar-link active" : "sidebar-link")} 

                        aria-expanded="false">
                            <span>
                                <i className="ti ti-history"></i>
                            </span>
                            {showSideBar && (
                                <span className="hide-menu ">Location History</span>
                            )}
                        </NavLink>
                    </motion.li>
                    <motion.li variants={item} className="sidebar-item">
                        <NavLink to={`${user?.role === 1? '/super-admin': '/admin'}/notification`} className={(navData) => (navData.isActive ? "sidebar-link active" : "sidebar-link")} 

                        aria-expanded="false">
                            <span>
                                <i className="ti ti-bell"></i>
                            </span>
                            {showSideBar && (
                            <span className="hide-menu ">Notification</span>
                            )}
                        </NavLink>
                    </motion.li>


                </motion.ul>
            </nav>
        </SimpleBar>
        </div>

        <div
                className={` btn align-self-center m-3 btn-outline-warning d-flex ${
                showSideBar ? "justify-content-start" : "justify-content-center"
            } align-items-center gap-2`}
            aria-expanded="false"
            onClick={handdleLogout} 
        >
            <span>
                <i className="ti ti-logout fw-bolder"></i>
            </span>
            {showSideBar && (
                <span className="hide-menu fw-bolder">Logout</span>
            )}
        </div>
    
        </div>


    );
}

export default Sidebar;
