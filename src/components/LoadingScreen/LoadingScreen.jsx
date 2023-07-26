import React from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <section className={styles.loading}>
      <span className={styles.loadIcon}>
        <i className="fas fa-solid fa-spinner fa-spin"></i>
      </span>
    </section>
  );
}
