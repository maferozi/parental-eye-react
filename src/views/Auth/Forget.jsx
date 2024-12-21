import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import imgLogo from '/src/assets/images/arrow.png';
import forgetIllustration from '/src/assets/images/auth/forget-illustration.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { forgetPassword, resetPassword } from '../../api/auth';
import Swal from 'sweetalert2';

export default function Forget() {
  const { token } = useParams();
  const navigate = useNavigate();

  const forgetValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const resetValidationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must include uppercase, lowercase, number, and special character')
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const forgetFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgetValidationSchema,
    onSubmit: async (values) => {
      try {
        Swal.fire({
          title: "Verification",
          html: "Checking your video content",
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await forgetPassword(values);
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });

      } catch (error) {
        console.log(error)
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
  });

  const resetFormik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await resetPassword({ token: token, ...values });
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/auth/login');

      } catch (error) {
        console.log(error)
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
  });

  return (
    <div className="d-flex justify-content-around align-items-center w-100">
      {/* Left Section */}
      <div className="h-100 text-center gap-5 d-flex flex-column justify-content-center align-content-center">
        <div>
          <img src={imgLogo} style={{ width: 200 }} alt="logo" />
        </div>
        <p className="fs-13 fw-bolder text-black">
          {token ? (
            'Reset Your Password'
          ) : (
            <>
              Did you forget <br /> your Password
            </>
          )}
        </p>
      </div>

      {/* Right Section */}
      <div
        className="d-flex align-content-center border border-4 border-black rounded-5 shadow-lg"
        style={{ backgroundColor: '#F1F3F6' }}
      >
        <div
          className="p-4 d-flex flex-column justify-content-center bg-white rounded-start-5 pt-5 pb-5 h-full"
          style={{ width: '300px' }}
        >
          <h3 className="text-center pb-3">{token ? 'Reset Password' : 'Forget Password'}</h3>

          {/* Conditional Form Rendering */}
          {token ? (
            <form onSubmit={resetFormik.handleSubmit}>
              {/* New Password Field */}
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label fw-bold">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  style={{ backgroundColor: '#F1F3F6' }}
                  className={`form-control ${resetFormik.touched.newPassword && resetFormik.errors.newPassword ? 'is-invalid' : ''
                    }`}
                  value={resetFormik.values.newPassword}
                  onChange={resetFormik.handleChange}
                  onBlur={resetFormik.handleBlur}
                />
                {resetFormik.touched.newPassword && resetFormik.errors.newPassword && (
                  <div className="invalid-feedback">{resetFormik.errors.newPassword}</div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label fw-bold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  style={{ backgroundColor: '#F1F3F6' }}
                  className={`form-control ${resetFormik.touched.confirmPassword && resetFormik.errors.confirmPassword ? 'is-invalid' : ''
                    }`}
                  value={resetFormik.values.confirmPassword}
                  onChange={resetFormik.handleChange}
                  onBlur={resetFormik.handleBlur}
                />
                {resetFormik.touched.confirmPassword && resetFormik.errors.confirmPassword && (
                  <div className="invalid-feedback">{resetFormik.errors.confirmPassword}</div>
                )}
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-outline-primary">
                  Reset Password
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={forgetFormik.handleSubmit}>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  style={{ backgroundColor: '#F1F3F6' }}
                  className={`form-control ${forgetFormik.touched.email && forgetFormik.errors.email ? 'is-invalid' : ''
                    }`}
                  value={forgetFormik.values.email}
                  onChange={forgetFormik.handleChange}
                  onBlur={forgetFormik.handleBlur}
                />
                {forgetFormik.touched.email && forgetFormik.errors.email && (
                  <div className="invalid-feedback">{forgetFormik.errors.email}</div>
                )}
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-outline-primary">
                  Forget Password
                </button>
                <div className="d-flex align-items-center">
                  <hr style={{ width: '45%' }} />
                  &nbsp;&nbsp;OR&nbsp;&nbsp;
                  <hr style={{ width: '45%' }} />
                </div>
                <Link to={'/auth/login'} className="btn btn-outline-warning">
                  Login
                </Link>
              </div>
            </form>
          )}
        </div>

        {/* Illustration */}
        <div>
          <img src={forgetIllustration} style={{ height: 350 }} alt="Forget illustration" />
        </div>
      </div>
    </div>
  );
}
