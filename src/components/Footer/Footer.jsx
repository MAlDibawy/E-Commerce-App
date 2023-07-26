import React from "react";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <>
      <footer className="p-3 bg-light mt-auto">
        <h2>E-SHOP</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          eius!
        </p>
        <div className=" d-flex justify-content-between">
          <input
            type="text"
            placeholder="email"
            className="form-control w-75"
          />
          <button className="btn bg-main text-white w-25 ms-3">Send</button>
        </div>
      </footer>
    </>
  );
}
