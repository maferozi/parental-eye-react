import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Forked from nav.jsx for /home only — keep in sync manually if nav.jsx changes.
function HomeNav() {
  return (
    <nav className="navbar home-nav navbar-expand-lg p-4" style={{ zIndex: 1000 }}>
      <div className="container-fluid">
        <a className="navbar-brand mx-auto" href="#">
          <img
            src="/images/Logo.jpeg"
            alt="Logo"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px" }}
          />
        </a>

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

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#support">
                Support
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#contact">
                Contact us
              </a>
            </li>
          </ul>

          <a href="/auth/login" className="btn btn-light ms-auto">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default HomeNav;
