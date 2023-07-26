import React from "react";
import styles from "./PaymentLoadingScreen.module.css";
export default function PaymentLoadingScreen() {
  return (
    <>
      <section className={styles.loading}>
        <p>please wait a moment ...</p>
        <span className={styles.loadIcon}>
          <i className="fas fa-solid fa-spinner fa-spin"></i>
        </span>{" "}
      </section>
    </>
  );
}
