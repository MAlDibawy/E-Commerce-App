import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = Yup.object({
    email: Yup.string()
      .email("please enter a valid email.")
      .required("please enter your e-mail"),

    password: Yup.string()
      .required("please enter your password")
      .min(8, "password is too short - should be at least 8 characters"),
  });

  async function handleLogin(values) {
    setIsLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(`${error.response.data.message}`);
      });
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setIsLoading(false);
      navigate("/");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: validate,
  });
  return (
    <>
      <div className="w-75 mx-auto p-4">
        <h2>Log in now and start shopping </h2>

        {errorMessage.length > 0 ? (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}>
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
              Log in
            </button>
          )}
        </form>
      </div>
    </>
  );
}
