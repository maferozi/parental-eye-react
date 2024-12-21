import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import imgLogo from '/src/assets/images/arrow.png';
import registerMen from '/src/assets/images/auth/register-illustrator.svg'; // Adjust the path as needed
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import Swal from 'sweetalert2'

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(20, 'First name must be 20 characters or less')
      .required('First name is required'),
    lastName: Yup.string()
      .max(20, 'Last name must be 20 characters or less')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await register(values);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Congragulation Your account created sucessfully",
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/auth/login');
      } catch (error) {
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

      <div className="h-100 text-center gap-5 d-flex flex-column justify-content-center align-content-center">
        <div>
          <img src={imgLogo} style={{ width: 200 }} alt="logo" />
        </div>
        <p className="fs-13 fw-bolder text-black">
          Please <br />
          Register Here
        </p>
      </div>


      <div
        className="d-flex align-items-center border border-4 border-black rounded-5 shadow-lg"
        style={{ backgroundColor: '#F1F3F6' }}
      >
        <div className="p-4 bg-white rounded-start-5 pt-5 pb-5" style={{ width: '400px' }}>
          <h3 className="text-center pb-2">Register Your Account</h3>

          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex gap-3'>

              <div className="mb-3">
                <label htmlFor="firstName" className="form-label fw-bold">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your First name"
                  style={{ backgroundColor: '#F1F3F6' }}
                  className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''
                    }`}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="invalid-feedback">{formik.errors.firstName}</div>
                )}
              </div>


              <div className="mb-3">
                <label htmlFor="lastName" className="form-label fw-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your Last name"
                  style={{ backgroundColor: '#F1F3F6' }}
                  className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''
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
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                  }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>


            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                style={{ backgroundColor: '#F1F3F6' }}
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                  }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>


            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-bold">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                style={{ backgroundColor: '#F1F3F6' }}
                className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'is-invalid'
                    : ''
                  }`}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
              )}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-outline-primary">
                Register
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
        </div>


        <div>
          <img src={registerMen} style={{ height: 400 }} alt="Register illustration" />
        </div>
      </div>
    </div>
  );
}
