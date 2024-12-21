import React from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import { Outlet } from 'react-router'
function Layout() {
  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div style={{ width: '250px' }}>
        <SideBar />
      </div>

      <div className="d-flex flex-column flex-grow-1 vh-100 overflow-hidden">
        <div>
          <Header />
        </div>

        <div className="overflow-auto p-4 scrollbar--custom">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout