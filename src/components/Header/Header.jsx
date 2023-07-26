import React from "react";
import styles from "./Header.module.css";
import Navbar from "../Navbar/Navbar";
export default function Header({ userData, resetUserData }) {
  return (
    <>
      <Navbar userData={userData} resetUserData={resetUserData} />
    </>
  );
}
