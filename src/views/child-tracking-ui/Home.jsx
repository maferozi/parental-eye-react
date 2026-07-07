import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, useReducedMotion } from "framer-motion";
import HomeNav from "./HomeNav";
import HomeHero from "./HomeHero";
import HomeFooter from "./HomeFooter";
import ReachUs from "./ReachUsComponent";
import "./Home.css";

const FEATURES = [
  {
    icon: "/images/gps-icon.jpg",
    title: "Real-Time GPS Tracking",
    caption: "See your child's exact location update live on the map.",
  },
  {
    icon: "/images/geofencing-icon.jpg",
    title: "Geofencing",
    caption: "Get notified the moment they leave home, school, or any zone you set.",
  },
  {
    icon: "/images/notification-icon.webp",
    title: "Customizable Notifications",
    caption: "Choose exactly which alerts matter to you — nothing more.",
  },
  {
    icon: "/images/history-icon.webp",
    title: "Historical Movement Data",
    caption: "Look back on any day to see where they've been.",
  },
];

const DETAIL_ROWS = [
  {
    title: "Real-time GPS tracking",
    body: "Open the app and see exactly where your child is right now. Location updates continuously on an easy-to-read map, so you're never left guessing.",
    image: "/images/gps-map.webp",
    imageClassName: "img-fluid w-50",
    textSide: "left",
  },
  {
    title: "Safe zones that watch for you",
    body: "Draw a boundary around home, school, or grandma's house. The moment your child crosses it, you'll know — no need to check the app constantly.",
    image: "/images/geofencing.webp",
    imageClassName: "img-fluid w-50",
    textSide: "right",
  },
  {
    title: "Alerts on your terms",
    body: "Pick what you want to hear about: zone entries and exits, arrivals, low battery. We'll send it straight to your phone the instant it happens.",
    image: "/images/Notification-img.webp",
    imageClassName: "img-fluid w-75",
    textSide: "left",
  },
  {
    title: "A full picture of their day",
    body: "Rewind to any date and retrace every stop your child made. Great for spotting patterns — or just putting your mind at ease after the fact.",
    image: "/images/Historical-img.webp",
    imageClassName: "img-fluid w-50",
    textSide: "right",
  },
];

const FAQS = [
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
    question: "Can I track the child's location history?",
    answer:
      "Yes, the system keeps a record of the child's location history, allowing parents to review past routes taken by the child.",
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

const TESTIMONIALS = [
  {
    quote:
      "The geofencing alerts changed how I parent. I know the second my son leaves school grounds, without having to text and wait.",
    name: "Michael",
    role: "Father of a Teenager",
  },
  {
    quote:
      "This app gives me real peace of mind. I can check on both kids in seconds, whether they're at practice or at a friend's house.",
    name: "Jane S.",
    role: "Parent of Two Kids",
  },
  {
    quote:
      "Historical data has been the real surprise for me — I can see my daughter's whole week at a glance and know her routine is exactly what it should be.",
    name: "David R.",
    role: "Parent of a Middle Schooler",
  },
];

function DetailRow({ title, body, image, imageClassName, textSide }) {
  const shouldReduceMotion = useReducedMotion();
  const textCol = (
    <div className="col-md-7 mb-4">
      <div className={`m-0 safe-zone-panel${textSide === "left" ? " safe-zone-panel--left" : ""}`}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
  const imageCol = (
    <div className="col-md-5 d-flex justify-content-center align-items-center mb-4">
      <img src={image} alt="" className={imageClassName} />
    </div>
  );

  return (
    <motion.div
      className="row"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {textSide === "left" ? (
        <>
          {imageCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {imageCol}
        </>
      )}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <HomeNav />
      <HomeHero />

      <section id="features" className="feature-overview py-5">
        <div className="container">
          <h2 className="text-center mb-5">Everything you need for peace of mind</h2>
          <div className="row text-center">
            {FEATURES.map((feature) => (
              <div className="col-md-3 mb-4" key={feature.title}>
                <span className="feature-icon-frame">
                  <img
                    src={feature.icon}
                    className="rounded-circle"
                    alt=""
                    width="80"
                    height="80"
                  />
                </span>
                <h5 className="mt-3">{feature.title}</h5>
                <p className="feature-caption">{feature.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-rows px-0 py-5">
        <div className="container">
          {DETAIL_ROWS.map((row) => (
            <DetailRow key={row.title} {...row} />
          ))}
        </div>
      </section>

      <section className="testimonials p-4">
        <h2 className="text-center p-4 text-white">Parents trust Parental Eye</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-4 container mx-auto">
          {TESTIMONIALS.map((testimonial) => (
            <div className="col mb-3" key={testimonial.name}>
              <div className="card testimonial-card h-100">
                <div className="card-body">
                  <p className="card-text">{testimonial.quote}</p>
                </div>
                <div className="card-footer">
                  <h5 className="mb-0">{testimonial.name}</h5>
                  <small className="testimonial-attribution">{testimonial.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="support" className="support-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Frequently asked questions</h2>
          <div className="row">
            {FAQS.map((item) => (
              <div key={item.question} className="col-12 mb-4">
                <h5 className="support-question mb-2">{item.question}</h5>
                <p className="support-answer">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Get in touch with us</h2>
          <div className="row justify-content-center g-4">
            <ReachUs />
            <div className="col-md-6 mb-4">
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
                  <button type="submit" className="btn home-hero__cta-primary w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
