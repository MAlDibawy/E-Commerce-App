import React from "react";
import styles from "./NotFound.module.css";
import img404 from "../../../public/error.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-3 flex-column">
        <div className="w-25">
          <img src={img404} alt="404 Not Found" className="w-100" />
        </div>
        <h2>PAGE NOT FOUND !</h2>
        <p>looks like the page you are trying to reach does no longer exist</p>
        <Link className="btn bg-main text-white" to={"/"}>
          back to home page
        </Link>
      </div>
    </>
  );
}
