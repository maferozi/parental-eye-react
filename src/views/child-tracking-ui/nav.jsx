import React from "react";
import "./stylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Nav() {
  return (
    <>
      <nav className="navbar bg-nav navbar-expand-lg p-4" style={{ zIndex: 1000 }}>
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand mx-auto" href="#">
            <img
              src="/images/Logo.jpeg"
              alt="Logo"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
          </a>

          {/* Navbar Toggler for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="feature">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="contact">
                  Contact us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="support">
                  Support
                </a>
              </li>
            </ul>

            {/* Login Button */}
            <a href="/auth/login" className="btn btn-light ms-auto">
              Login
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
