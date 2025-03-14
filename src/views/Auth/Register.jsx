import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register } from "../../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(20, "First name must be 20 characters or less")
      .required("First name is required"),
    lastName: Yup.string()
      .max(20, "Last name must be 20 characters or less")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await register(values);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account has been created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/auth/login");
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response?.data?.message || "Registration failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div
        className="bg-light bg-opacity-50 border border-white border-opacity-25 shadow-lg rounded-3 p-4 p-md-5 w-100"
        style={{ backdropFilter: "blur(3px)", maxWidth: "500px" }}
      >
        <h3 className="text-center text-black pb-2">Register Your Account</h3>

        <form onSubmit={formik.handleSubmit}>
          {/* Name Fields */}
          <div className="d-flex gap-3">
            <div className="mb-3 w-50">
              <label htmlFor="firstName" className="form-label text-black fw-bold">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                className={`form-control ${
                  formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""
                }`}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="invalid-feedback">{formik.errors.firstName}</div>
              )}
            </div>

            <div className="mb-3 w-50">
              <label htmlFor="lastName" className="form-label text-black fw-bold">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                className={`form-control ${
                  formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""
                }`}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-black fw-bold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-black fw-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? "is-invalid" : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-black fw-bold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              className={`form-control ${
                formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""
              }`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <div className="d-flex align-items-center mt-3">
              <hr className="w-50" />
              &nbsp;&nbsp;OR&nbsp;&nbsp;
              <hr className="w-50" />
            </div>
            <Link to="/auth/login" className="btn btn-warning mt-2">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
