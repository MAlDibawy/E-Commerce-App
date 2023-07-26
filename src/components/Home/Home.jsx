import React from "react";
import styles from "./Home.module.css";
import HomeProducts from "../HomeProducts/HomeProducts";
import CategorySlider from "./../CategorySlider/CategorySlider";

export default function Home() {
  return (
    <>
      <CategorySlider />
      <HomeProducts />
    </>
  );
}
