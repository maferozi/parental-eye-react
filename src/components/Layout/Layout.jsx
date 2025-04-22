import React, { useState } from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import { Outlet } from 'react-router'
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout() {
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <div className="d-flex vh-100 overflow-hidden layout-sidebar--custom">
      <ToastContainer
position="top-center"
autoClose={4000}
hideProgressBar
newestOnTop
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      <div  className='sidebar--container expand--sidebar'>
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
      </div>
      <div className="d-flex flex-column flex-grow-1 vh-100 overflow-hidden"> 
        <div>
          <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
          </div>
        <div className="overflow-auto p-4 scrollbar--custom">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout