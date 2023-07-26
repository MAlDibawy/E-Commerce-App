import React, { useRef } from "react";
import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";

export default function Navbar({ userData, resetUserData }) {
  const btnRef = useRef(null);
  const collapsedRef = useRef(null);

  const hideNav = () => {
    if (collapsedRef.current.className !== "collapse navbar-collapse")
      btnRef.current.click();
  };
  const reset = () => {
    resetUserData();
    hideNav();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand fa-2x" to="/">
            E-SHOP
          </Link>
          <button
            ref={btnRef}
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="collapsibleNavId"
            ref={collapsedRef}
          >
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={hideNav}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/Cart"
                  onClick={hideNav}
                >
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allorders" onClick={hideNav}>
                  All Orders
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center">
                <a className="nav-link" href="#">
                  <i className="fab mx-2 fa-facebook"></i>
                </a>
                <a className="nav-link" href="#">
                  <i className="fab mx-2 fa-twitter"></i>
                </a>
                <a className="nav-link" href="#">
                  <i className="fab mx-2 fa-instagram"></i>
                </a>
                <a className="nav-link" href="#">
                  <i className="fab mx-2 fa-youtube"></i>
                </a>
              </li>
              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login" onClick={hideNav}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register" onClick={hideNav}>
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={reset}>
                    Log Out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
