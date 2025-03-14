import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { forgetPassword, resetPassword } from "../../api/auth";

export default function Forget() {
  const { token } = useParams();
  const navigate = useNavigate();

  const validationSchema = token
    ? Yup.object({
        newPassword: Yup.string()
          .min(8, "Must be at least 8 characters")
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
            "Must include uppercase, lowercase, number, and special character"
          )
          .required("Required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword")], "Passwords must match")
          .required("Required"),
      })
    : Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
      });

  const formik = useFormik({
    initialValues: token
      ? { newPassword: "", confirmPassword: "" }
      : { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        Swal.fire({ title: "Processing...", didOpen: () => Swal.showLoading() });
        const response = token
          ? await resetPassword({ token, ...values })
          : await forgetPassword(values);

        Swal.fire({
          icon: "success",
          title: response.message,
          timer: 1500,
          showConfirmButton: false,
        });

        if (token) navigate("/auth/login");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error.response?.data?.message || "Something went wrong",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },
  });

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" >
      <div
        className="bg-light bg-opacity-50 border border-white border-opacity-25 shadow-lg rounded-3 p-4 p-md-5 w-100"
        style={{ backdropFilter: "blur(3px)", maxWidth: "500px" }}
      >
        <h3 className="text-center text-black pb-2">
          {token ? "Reset Your Password" : "Forget Password"}
        </h3>
        <form onSubmit={formik.handleSubmit}>
          {token ? (
            <>
              <div className="mb-3">
                <label className="form-label text-black fw-bold">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  className={`form-control ${
                    formik.touched.newPassword && formik.errors.newPassword ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("newPassword")}
                />
                <div className="invalid-feedback">{formik.errors.newPassword}</div>
              </div>
              <div className="mb-3">
                <label className="form-label text-black fw-bold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className={`form-control ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("confirmPassword")}
                />
                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Reset Password</button>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label text-black fw-bold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("email")}
                />
                <div className="invalid-feedback">{formik.errors.email}</div>
              </div>
              <button type="submit" className="btn btn-primary w-100">Forget Password</button>
              <div className="d-flex align-items-center mt-3">
                <hr className="w-50" /> OR <hr className="w-50" />
              </div>
              <Link to={"/auth/login"} className="btn btn-warning w-100">Login</Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
