import React, { useContext } from 'react';
import logo from '/logo.webp';
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

  // Define role-based navigation paths
  const roleRoutes = {
    1: "/super-admin", // Super Admin
    2: "/admin",       // Admin
    3: "/gardian",     // Guardian
    4: "/child",       // Child
    5: "/driver",      // Driver
  };

  const baseRoute = roleRoutes[user?.role] || "/";

  // Define menu items per role
  const menuItems = {
    1: [ // Super Admin
      { path: "/dashboard", icon: "ti-home", label: "Dashboard" },
      { path: "/report", icon: "ti-report", label: "Reports" },
      { path: "/user-management", icon: "ti-users", label: "User Management" },
      { path: "/device", icon: "ti-devices", label: "Device Management" },
      { path: "/notification", icon: "ti-bell", label: "Notification" },
    ],
    2: [ // Admin
      { path: "/dashboard", icon: "ti-home", label: "Dashboard" },
      { path: "/report", icon: "ti-report", label: "Reports" },
      { path: "/user-management", icon: "ti-users", label: "User Management" },
      { path: "/device", icon: "ti-devices", label: "Device Management" },
      { path: "/geofence", icon: "ti-map", label: "GeoFencing" },
      { path: "/history", icon: "ti-history", label: "Location History" },
      { path: "/notification", icon: "ti-bell", label: "Notification" },
    ],
    3: [ // Guardian
      { path: "/dashboard", icon: "ti-home", label: "Dashboard" },
      { path: "/report", icon: "ti-report", label: "Reports" },
      { path: "/history", icon: "ti-history", label: "Location History" },
      { path: "/notification", icon: "ti-bell", label: "Notification" },
    ],
    4: [ // Child
      { path: "/dashboard", icon: "ti-home", label: "Dashboard" },
      { path: "/report", icon: "ti-report", label: "Reports" },
      { path: "/history", icon: "ti-history", label: "Location History" },
      { path: "/notification", icon: "ti-bell", label: "Notification" },
    ],
    5: [ // Driver
      { path: "/dashboard", icon: "ti-home", label: "Dashboard" },
      { path: "/report", icon: "ti-report", label: "Reports" },
      { path: "/history", icon: "ti-history", label: "Location History" },
      { path: "/notification", icon: "ti-bell", label: "Notification" },
    ],
  };



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

    <SimpleBar style={{ maxHeight: "78vh", overflowX: "hidden" }} autoHide={false}>
      <nav className="sidebar-nav scroll-sidebar p-3">
        <motion.ul id="sidebarnav" className="d-flex flex-column gap-2">
          {menuItems[user?.role]?.map((item, index) => (
            <motion.li key={index} className="sidebar-item">
              <NavLink
                to={`${baseRoute}${item.path}`}
                className={(navData) => (navData.isActive ? "sidebar-link active" : "sidebar-link")}
                aria-expanded="false"
              >
                <span>
                  <i className={`ti ${item.icon}`}></i>
                </span>
                {showSideBar && <span className="hide-menu">{item.label}</span>}
              </NavLink>
            </motion.li>
          ))}
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
