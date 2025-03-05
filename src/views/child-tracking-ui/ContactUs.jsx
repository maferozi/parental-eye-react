import React from "react";
import Nav from "./nav";
import HomeMainContent from "./HomeMainContet";
import  FooterComponent from "./Footer";
import ReachUs from "./ReachUsComponent";

export default function Contact() {
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(41, 69, 158, 0.5), rgba(41, 69, 158, 0.8)), url("/images/BgContact.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <Nav />
        <HomeMainContent
          title="Get in touch with us "
          description="We're here to assist your question, feed back and support needs "
          showImage={false}
          showButtons={false}
        />
      </div>

      

      <div className="row bg-nav p-5">
        <ReachUs />
        <div className="col-md-6">
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Contact Us</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
      </div>
       <FooterComponent/>
    </>
  );
}
