import React, { useState } from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import { Outlet } from 'react-router'
function Layout() {
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <div className="d-flex vh-100 overflow-hidden layout-sidebar--custom">
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