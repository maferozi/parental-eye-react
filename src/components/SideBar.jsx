import React from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SideBar() {
  return (

    <div className="d-flex flex-column vh-100 pt-3 bg-light shadow shadow-lg" style={{ width: '300px' }}>
      <div className="mb-4">
        <h5 className="text-start ps-3">
          <Link to={"/home"}>
            <img src="/logo.png" width={40} alt="Image of Project" />
          </Link>
        </h5>
      </div>
      <Nav className="flex-column">
        <Nav.Link href="#" className="text-muted">
          <Link to="/home" className='btn btn-outline-primary  rounded-3 shadow shadow-sm w-100 text-start'>
            <i className="ti ti-home"></i> Dashboard
          </Link>
        </Nav.Link>
        <Nav.Link href="#" className="text-muted">
          <Link to="/profile" className='btn btn-outline-primary  rounded-3 shadow shadow-sm w-100 text-start'>
            <i className="ti ti-user"></i> User manage
          </Link>
          </Nav.Link>
          <Nav.Link href="#" className="text-muted">
          <Link to="/profile" className='btn btn-outline-primary  rounded-3 shadow shadow-sm w-100 text-start'>
            <i className="ti ti-cpu-2"></i> Device manage
          </Link>
          </Nav.Link>
          <Nav.Link href="#" className="text-muted">
          <Link to="/profile" className='btn btn-outline-primary  rounded-3 shadow shadow-sm w-100 text-start'>
            <i className="ti ti-map-pins"></i> GeoFance manage
          </Link>
          </Nav.Link>
          <Nav.Link href="#" className="text-muted">
          <Link to="/profile" className='btn btn-outline-primary  rounded-3 shadow shadow-sm w-100 text-start'>
            <i className="ti ti-bell-ringing"></i> Notification manage
          </Link>
          </Nav.Link>


          <Nav.Link href="#" className="text-muted">
          <Link to="/profile" className='btn btn-outline-primary  rounded-3 shadow shadow-sm w-100 text-start'>
            <i className="ti ti-bell-ringing"></i> Notification manage
          </Link>
          </Nav.Link>
      </Nav>
    </div>
  )
}

export default SideBar