import React from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SideBar() {
  return (

    <div className="d-flex flex-column vh-100 p-3 bg-light shadow" style={{ width: '250px' }}>
      <div className="mb-4">
        <h5 className="text-center">
          <Link to={"/home"}>
            <img src="/public/arrow.png" width={40} alt="Image of Project" />
            Parental Eye
          </Link>
        </h5>
      </div>
      <Nav className="flex-column">
        <Nav.Link href="#" className="text-muted">
          <Link to="/home">
            <i className="bi bi-house"></i> Dashboard
          </Link>
        </Nav.Link>
        <hr />
        <p className="fw-bold text-muted">PAGES</p>
        <Nav.Link href="#" className="text-dark">
          <Link to={"/company"}>
            <i className="bi bi-building"></i> Company
          </Link>
        </Nav.Link>
        <Nav.Link href="#" className="text-dark">
          <Link to="/reports">
            <i className="bi bi-clipboard"></i> Reports
          </Link>
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default SideBar