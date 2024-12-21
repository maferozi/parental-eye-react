import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import imgLogo from '/src/assets/images/arrow.png';
import loginMen from '/src/assets/images/auth/login-illustrator.svg';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import Swal from 'sweetalert2';
import { setUser } from '../../utills/user';

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
          timer: 1500
        });
        setUser(response.token);

        window.location.reload();

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

      <div className="h-100 text-center gap-5 d-flex flex-column justify-content-center align-content-center">
        <div>
          <img src={imgLogo} style={{ width: 200 }} alt="logo" />
        </div>
        <p className="fs-13 fw-bolder text-black">
          Please <br />
          Login Here
        </p>
      </div>


      <div
        className="d-flex align-items-center border border-4 border-black rounded-5  shadow-lg"
        style={{ backgroundColor: '#F1F3F6' }}
      >
        <div className="p-4 bg-white rounded-start-5 pt-5 pb-5" style={{ width: '300px' }}>
          <h3 className="text-center pb-2">Login Your Account</h3>

          <form className='' onSubmit={formik.handleSubmit}>

            <div className="mb-3 " >
              <label htmlFor="email" className="form-label fw-bold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter Your email'
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


            <div className="mb-1">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Enter Your Password'
                style={{ backgroundColor: '#F1F3F6' }}
                className={`form-control ${formik.touched.password && formik.errors.password
                    ? 'is-invalid'
                    : ''
                  }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>
            <div className='text-end mb-4'>
              <Link to={'/auth/forget'} className='text-danger hover--custom'>Forget Password ?</Link>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-outline-primary">
                Login
              </button>
              <div className='d-flex align-items-center'>
                <hr style={{ width: '45%' }} />
                &nbsp;&nbsp;OR&nbsp;&nbsp;
                <hr style={{ width: '45%' }} />
              </div>
              <Link to={'/auth/register'} className='btn btn-outline-warning'>Register</Link>
            </div>
          </form>
        </div>


        <div>
          <img src={loginMen} style={{ height: 400 }} alt="Login illustration" />
        </div>
      </div>
    </div>
  );
}
