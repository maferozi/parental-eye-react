import React from "react";
import Nav from "./nav";
import HomeMainContent from "./HomeMainContet";
import  FooterComponent from "./Footer";


export default function Feature() {
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(41, 69, 158, 0.8), rgba(41, 69, 158, 0.6)), url("/images/gps-bgImg.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh", 
        }}
      >
        <Nav />
        <HomeMainContent
          title="Comprehensive Feature to ensure your child's Safety and Growth"
          description="Real-time tracking, geofencing alerts, academic monitoring, and much more"
          showImage={false}
          showButtons={false}
        />
      </div>
      

      <div>
        {/* Real-Time Location Tracking */}
      <div className="p-5 bg-nav">
      <h4 className="text-warning  mb-4">Real-Time Location Tracking</h4>

      <section className="mb-4">
        <h5 className="text-white">Map Interface</h5>
        <ul>
          <li>
            Displays real-time locations of children and drivers with clear
            markers.
          </li>
          <li>
            Color-coded icons differentiate between the child, driver, and other
            entities.
          </li>
          <li>Route paths (current and completed) are visually represented.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5 className="text-white">Child Details</h5>
        <ul>
          <li>Name, age, and assigned GPS device ID.</li>
          <li>Last updated location and timestamp.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h5 className="text-white">Driver Details</h5>
        <ul>
          <li>Driver name, vehicle details, and contact number.</li>
          <li>Real-time location with GPS accuracy displayed.</li>
        </ul>
      </section>

      <section>
        <h5 className="mb-3 text-white">Options/Buttons</h5>
        <div className="d-flex flex-wrap gap-2 ">
          <button className="btn btn-primary btn-sm">Live View</button>
          <button className="btn btn-secondary btn-sm">History</button>
          <button className="btn btn-success btn-sm">Refresh</button>
          <button className="btn btn-warning btn-sm">Alerts</button>
        </div>
      </section>
    </div>

    {/*Geofencing Alerts */}
    <div className="bg-nav p-5">
      <h3 className="text-warning">Geofencing Alerts</h3>

      <section>
        <h5 className="text-white">Interactive Map</h5>
        <p>
          Interface for setting geofence zones with draggable markers and
          adjustable radius sliders.
        </p>
        <p>
          Zones marked with colors (e.g., green for safe zones, red for no-go
          zones).
        </p>
      </section>

      <section>
        <h5 className="text-white">Geofence Settings</h5>
        <ul>
          <li>
            List of all active geofences with details like name, radius, and
            coordinates.
          </li>
          <li>Options to enable/disable specific zones.</li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Notification Settings</h5>
        <ul>
          <li>Toggle alerts for entry/exit events.</li>
          <li>Customize alert methods (app notification, email, or SMS).</li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Buttons</h5>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-primary btn-sm">Add New Geofence</button>
          <button className="btn btn-secondary btn-sm">Edit Zone</button>
          <button className="btn btn-danger btn-sm">Delete Zone</button>
        </div>
      </section>
    </div>
    {/*RouteHistoryReview */}
    <div className="p-5 bg-nav">
      <h3 className="text-warning">Route History Review</h3>

      <section>
        <h5 className="text-white">Interactive Map</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          voluptatum nihil suscipit, minus cupiditate saepe similique nesciunt
          sapiente exercitationem, velit, odit itaque laboriosam voluptas
          dolorum quasi. Asperiores deleniti ab aliquam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          dolorum velit a iusto consequatur itaque in nihil veniam, debitis
          facilis. Doloremque aliquam tempore reprehenderit temporibus ducimus
          modi. Nesciunt, nobis labore.
        </p>
      </section>

      <section>
        <h5 className="text-white">Geofence Settings</h5>
        <ul>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            perspiciatis ipsa vero eaque quisquam explicabo, dolores deleniti
            suscipit fugiat corporis quae at dolorum, reprehenderit et labore
            corrupti tempora ad aliquam.
          </li>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            perspiciatis ipsa vero eaque quisquam explicabo, dolores deleniti
            suscipit fugiat corporis quae at dolorum, reprehenderit et labore
            corrupti tempora ad aliquam.
          </li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Notification Settings</h5>
        <ul>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            perspiciatis ipsa vero eaque quisquam explicabo, dolores deleniti
            suscipit fugiat corporis quae at dolorum, reprehenderit et labore
            corrupti tempora ad aliquam.
          </li>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
            perspiciatis ipsa vero eaque quisquam explicabo, dolores deleniti
            suscipit fugiat corporis quae at dolorum, reprehenderit et labore
            corrupti tempora ad aliquam.
          </li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Buttons</h5>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-primary btn-sm">Add New Geofence</button>
          <button className="btn btn-secondary btn-sm">Edit Zone</button>
          <button className="btn btn-danger btn-sm">Delete Zone</button>
        </div>
      </section>
    </div>
    {/*Notifications */}
    <div className="p-5 bg-nav">
      <h3 className="text-warning">Notifications</h3>

      <section>
        <h5 className="text-white">Notification Logs</h5>
        <ul>
          <li>List of alerts with timestamps and event descriptions.</li>
          <li>
            Categories: geofence breaches, low battery alerts, and device
            offline warnings.
          </li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Alert Settings</h5>
        <ul>
          <li>Customize alert preferences for specific events.</li>
          <li>Set alert methods (push notification, email, or SMS).</li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Buttons</h5>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-warning btn-sm">Clear All</button>
          <button className="btn btn-info btn-sm">Customize Alerts</button>
        </div>
      </section>
    </div>
        {/*DeviceManagement */}
        <div className="p-5 bg-nav">
      <h3 className="text-warning">Device Management</h3>

      <section>
        <h5 className="text-white">Device List</h5>
        <ul>
          <li>
            Displays all registered devices with details like battery status,
            signal strength, and last activity.
          </li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Alert Section</h5>
        <p>
          Highlights devices needing attention (e.g., low battery or offline).
        </p>
      </section>

      <section>
        <h5 className="text-white">Maintenance Logs</h5>
        <p>Record of device repairs or replacements.</p>
      </section>
    </div>
   
        {/*DriverTracking */}
        <div className="p-5 bg-nav">
      <h3 className="text-warning">Driver Tracking</h3>

      <section>
        <h5 className="text-white">Live Map</h5>
        <ul>
          <li>Displays driver locations and routes in real-time.</li>
          <li>Highlights pickup and drop-off points.</li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Driver Details</h5>
        <ul>
          <li>Name, vehicle details, contact information.</li>
        </ul>
      </section>

      <section>
        <h5 className="text-white">Route History</h5>
        <p>Logs of past routes taken by the driver.</p>
      </section>
    </div>
     
      <FooterComponent/>
      </div>
    </>
  );
}
