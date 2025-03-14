import React from "react";
import Nav from "./nav";
import HomeMainContent from "./HomeMainContet";
import  FooterComponent from "./Footer";
import ReachUs from "./ReachUsComponent";




export default function Support() {
  
    const faq = [
      {
        question: "What is the purpose of the Child Tracking System?",
        answer:
          "The purpose of the Child Tracking System is to provide real-time location tracking for children, allowing parents to ensure their safety through geofencing alerts and route history reviews.",
      },
      {
        question: "How does the geofencing feature work?",
        answer:
          "Geofencing allows parents to set virtual boundaries around specific locations. If the child crosses these boundaries, an alert is triggered to notify the parent.",
      },
      {
        question: "Can I track the childs location history?",
        answer:
          "Yes, the system keeps a record of the childs location history, allowing parents to review past routes taken by the child.",
      },
      {
        question: "How do I receive alerts for breaches?",
        answer:
          "You can enable alerts in the system settings. Alerts can be sent via email or mobile notifications when the child crosses a geofenced boundary or when the device battery is low.",
      },
      {
        question: "How can I add new geofences?",
        answer:
          "New geofences can be added by accessing the settings menu. You will be prompted to enter the geofence name, radius, and location coordinates.",
      },
    ];
  return (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(41, 69, 158, 0.5), rgba(41, 69, 158, 0.9)), url("/images/BgSupport.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <Nav />
        <HomeMainContent
          title="We are here to help!!!! "
          description="Find Answer get support, make the most parent Eye "
          showImage={false}
          showButtons={false}
        />
      </div>

      

      <div
        className="bg-nav p-5"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReachUs />
        <div className="container my-5">
      <h2 className="text-center mb-4 text-white">
        Frequently Asked Questions
      </h2>
      <div className="row">
        {faq.map((item, index) => (
          <div key={index} className="col-12 mb-3">
            <div className="h5 text-warning mb-2">{item.question}</div>
            <div className="text-white">{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
      </div>

      <FooterComponent/>
    </>
  );
  }

