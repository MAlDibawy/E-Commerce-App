import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = Yup.object({
    name: Yup.string().min(3).required("please enter your name."),
    email: Yup.string()
      .email("please enter a valid email.")
      .required("please enter your e-mail"),
    phone: Yup.string()
      .required("please enter your phone number.")
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number."),
    password: Yup.string()
      .required("please enter your password")
      .min(8, "password is too short - should be at least 8 characters"),
    rePassword: Yup.string()
      .required("please confirm your password")
      .oneOf([Yup.ref("password")], "passwords does not match"),
  });

  async function handleRegister(values) {
    setIsLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(`${error.response.data.message}`);
      });
    if (data.message === "success") {
      setIsLoading(false);
      navigate("/login");
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: handleRegister,
    validationSchema: validate,
  });
  return (
    <>
      <div className="w-75 mx-auto p-4">
        <h2>Register Now</h2>

        {errorMessage.length > 0 ? (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="alert alert-danger text-center">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger text-center">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Phone"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="alert alert-danger text-center">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="alert alert-danger text-center">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword">Confirm password</label>
          <input
            name="rePassword"
            id="rePassword"
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Confirm password"
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="alert alert-danger text-center">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          {isLoading ? (
            <button disabled className="btn bg-main text-white" type="button">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white"
              type="submit"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
