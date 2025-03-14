import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../api/auth";
import { setUser } from "../../utills/user";

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setUser(response.token);
        window.location.reload();
      } catch (error) {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div
        className="bg-light  bg-opacity-50 border border-white border-opacity-25 shadow-lg rounded-3 p-4 p-md-5 w-100"
        style={{ backdropFilter: "blur(3px)", maxWidth: "500px" }}
      >
        <h3 className="text-center text-black pb-2">Login Your Account</h3>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-black fw-bold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className={`form-control  ${
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
              placeholder="Enter Your Password"
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          {/* Forget Password */}
          <div className="text-end mb-3">
            <Link to={"/auth/forget"} className="text-danger">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div className="d-flex align-items-center mt-3">
              <hr className="w-50" />
              &nbsp;&nbsp;OR&nbsp;&nbsp;
              <hr className="w-50" />
            </div>
            <Link to={"/auth/register"} className="btn btn-warning mt-2">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
