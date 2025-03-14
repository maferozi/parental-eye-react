import React from "react";
import "./stylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

function Nav() {
  return (
<>
<nav className="navbar bg-nav navbar-expand-lg p-4 "  style={{ zIndex: 1000 }} >
  <div className="container-fluid">
  <a className="navbar-brand mx-auto " href="#">
          <img
            src="/images/Logo.jpeg"
            alt="Logo"
            className="rounded-circle"
            style={{ width: "50px", height: "60px" }}
          />
        </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse  " id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active text-white" aria-current="page" href="ho">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="fe">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="co">Contact us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="su">Support</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
      <input className="form-control me-2 text-white" type="search" placeholder="Search" aria-label="Search"></input>
      <button className="btn btn-outline-success text-white" type="submit">Search</button>
    </form>
    </div>
  </div>
</nav>

    </>
  );
}

export default Nav;
