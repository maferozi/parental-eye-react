import React from "react";

export default function FooterComponent() {
  return (
    <footer className="py-4" style={{ backgroundColor: "#d6f5ff" }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h1>LOGO</h1>
            <p>Copyright © 2024 Parental Eye</p>
            <div className="d-flex">
              <a href="#" className="btn btn-light rounded-circle me-2">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="btn btn-light rounded-circle me-2">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="btn btn-light rounded-circle me-2">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h4>Company</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Feature
                </a>
              </li>
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h4>Support</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="text-dark text-decoration-none">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Up to Date */}
          <div className="col-12 col-md-3">
            <h5>Stay up to date</h5>
            <form>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                />
                <button className="btn " type="submit">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
