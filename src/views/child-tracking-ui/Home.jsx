import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./nav";
import HomeMainContent from "./HomeMainContet";
import FooterComponent from "./Footer";
import "./stylesheet.css";

export default function Home() {
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(41, 69, 158, 0.8), rgba(41, 69, 158, 0.8)), url(${"/images/gps-bgImg.jpeg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "105vh",
        }}
      >
        <Nav />
        <HomeMainContent
          title="Track Your child's safety and Activity with confidence"
          description="Ensure your child's safety with real-time tracking and alerts."
          button1Text="Sign up "
          button2Text="Learn More"
        />

  
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
          }}
        ></div>
      </div>
      

      <div>
      <section id="features" className="py-5  bg-nav">
        <div className="container">
          <h2 className="text-center mb-5 text-warning">Feature Overview</h2>
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <img
                src="/images/gps-icon.jpg"
                className="rounded-circle img-fluid"
                alt="GPS Tracking"
                width="80"
              />
              <h5 className="mt-3 text-white">Real-Time GPS Tracking</h5>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="/images/geofencing-icon.jpg"
                className="rounded-circle img-fluid"
                alt="Geofencing"
                width="80"
              />
              <h5 className="mt-3 text-white">Geofencing</h5>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="/images/notification-icon.png"
                className="rounded-circle img-fluid"
                alt="Notifications"
                width="80"
              />
              <h5 className="mt-3 text-white">Customizable Notifications</h5>
            </div>
            <div className="col-md-3 mb-4">
              <img
                src="/images/history-icon.png"
                className="rounded-circle img-fluid"
                alt="History Data"
                width="80"
              />
              <h5 className="mt-3 text-white">Historical Movement Data</h5>
            </div>
          </div>
        </div>
      </section>

     
      <section className="px-0 bg-nav">
        <div className="container">
          <div className="row">
            <div className="col-md-7 mb-4">
              <div className="m-0 borderRadius-Right">
                <h3>Real-Time GPS Tracking</h3>
                <p>
                  The system should provide real-time GPS tracking of a child’s
                  location. Parents should be able to visualize the location of
                  child on a map interface within the mobile application. The
                  tracking updates should be fast enough to display accurate,
                  up-to-the-minute data.
                </p>
              </div>
            </div>

            
            <div className="col-md-5 d-flex justify-content-center mb-4">
              <img src="/images/gps-map.png" alt="GPS Map" className="/images/img-fluid w-50" />
            </div>
          </div>

          <div className="row">
           
            <div className="col-md-5 d-flex justify-content-center align-items-center mb-4">
              <img
                src="/images/geofencing.png"
                alt="Geofencing img"
                className="img-fluid w-50"
              />
            </div>

           
            <div className="col-md-7">
              <div className="m-3 borderRadius-Left">
                <h3>Geofencing</h3>
                <p>
                  Parents can create virtual boundaries (e.g., school, home) for
                  their children. The system notifies parents when the child
                  enters or exits predefined zones.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Left Section (Text) */}
            <div className="col-md-7 mb-4">
              <div className="m-0 borderRadius-Right">
                <h3>Customization Notification</h3>
                <p>
                  Parents should be able to set up custom notifications for
                  different events, such as: - When a child enters or leaves
                  specific geofences - When a child arrives at or departs from a
                  specific location. Notifications should be sent in real-time
                  via mobile app push notifications or SMS.
                </p>
              </div>
            </div>

            {/* Right Section (Image) */}
            <div className="col-md-5 d-flex justify-content-center mb-4">
              <img
                src="/images/Notification-img.png"
                alt="Notification img"
                className="img-fluid w-75"
              />
            </div>
          </div>

          <div className="row">
            {/* Left Section (Image) */}
            <div className="col-md-5 d-flex justify-content-center align-items-center mb-4">
              <img
                src="/images/Historical-img.png"
                alt="Historical-img"
                className="img-fluid w-50"
              />
            </div>

            {/* Right Section (Text) */}
            <div className="col-md-7">
              <div className="m-3 borderRadius-Left">
                <h3>Historical Movement Data</h3>
                <p>
                  The system should record the child’s movements and allow
                  parents to view historical data. Parents should be able to
                  select specific days or timeframes to view their movement of
                  child history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-nav p-4">
      <h1 className="text-center p-4 text-white ">Testimonials</h1>
      <div className="row row-cols-1 row-cols-md-3 g-6 mb-4 ">
        <div className="col mb-5  ">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-text">
                The geo-fencing feature is a game-changer! I love getting alerts
                when my son leaves a designated area
              </h3>
            </div>
            <div className="card-footer">
              <h5>Michael</h5>
              <small className="text-body-secondary">
                {" "}
                Father of a TeenagerR
              </small>
            </div>
          </div>
        </div>
        <div className="col mb-5">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-text">
                This system has been a lifesaver for our family. I can keep
                track of my location of children in real-time and make sure
                they’re safe, whether they’re at school or with friends. It
                gives me peace of mind like nothing else
              </h3>
            </div>
            <div className="card-footer">
              <h5>Jane S.</h5>
              <small className="text-body-secondary">Parent of Two Kids</small>
            </div>
          </div>
        </div>
        <div className="col mb-5">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-text">
                The geo-fencing feature is a game-changer! I love getting alerts
                when my son leaves a designated area
              </h3>
            </div>
            <div className="card-footer">
              <h5>Michael</h5>
              <small className="text-body-secondary">
                {" "}
                Father of a TeenagerR
              </small>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
        <FooterComponent/>
      </div>
    </>
  );
}
