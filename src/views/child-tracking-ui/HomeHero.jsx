import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

export default function HomeHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="home-hero text-white">
      <div className="container py-5">
        <div className="row align-items-center" style={{ minHeight: "80vh" }}>
          <motion.div
            className="col-12 col-lg-6 mb-5 mb-lg-0"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="display-4 fw-semibold mb-4">
              Know where they are.
              <br />
              Every step, every second.
            </h1>
            <p className="home-hero__subhead lead mb-4">
              Parental Eye gives you a live view of your child's location,
              instant alerts when they leave a safe zone, and a full history
              of where they've been — all from one app.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/auth/register" className="btn home-hero__cta-primary btn-lg">
                Start tracking free
              </Link>
              <a href="#features" className="btn btn-outline-light home-hero__cta-secondary btn-lg">
                See how it works
              </a>
            </div>
          </motion.div>

          <motion.div
            className="col-12 col-lg-6 hero-visual"
            aria-hidden="true"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.92, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <div className="hero-visual__card">
              <svg viewBox="0 0 320 320" width="100%" height="100%">
                <circle cx="160" cy="160" r="150" fill="#eaf1fb" />
                <circle
                  cx="160"
                  cy="160"
                  r="110"
                  fill="none"
                  stroke="#29459e"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  opacity="0.5"
                />
                <circle className="pulse-ring" cx="160" cy="160" r="20" fill="none" stroke="#ff7a59" strokeWidth="3" />
                <circle
                  className="pulse-ring pulse-ring--delay"
                  cx="160"
                  cy="160"
                  r="20"
                  fill="none"
                  stroke="#ff7a59"
                  strokeWidth="3"
                />
                <circle cx="160" cy="160" r="10" fill="#ff7a59" />
                <circle cx="160" cy="160" r="4" fill="#ffffff" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
