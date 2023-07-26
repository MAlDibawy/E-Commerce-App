import React, { useContext, useState } from "react";
import styles from "./Checkout.module.css";
import { useFormik } from "formik";
import { cartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import PaymentLoadingScreen from "./../PaymentLoadingScreen/PaymentLoadingScreen";

export default function Checkout() {
  const { onlinePayment, cartID, cashPayment } = useContext(cartContext);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    if (paymentMethod === 1) {
      const response = await onlinePayment(cartID, values);
      if (response?.data?.status === "success") {
        setIsLoading(false);
        window.location.href = response.data.session.url;
      } else {
        // Error message
      }
    } else if (paymentMethod === 2) {
      const response = await cashPayment(cartID, values);
      if (response?.data?.status === "success") {
        setIsLoading(false);
        navigate("/allorders");
      } else {
        console.log(response);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSubmit,
  });

  if (isLoading) {
    return <PaymentLoadingScreen />;
  }

  return (
    <>
      <div className="w-50 mx-auto p-5">
        <h2>Shipping Address</h2>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">details</label>
          <input
            name="details"
            id="details"
            type="text"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Details"
          />

          <label htmlFor="city">city</label>
          <input
            name="city"
            id="city"
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="City"
          />

          <label htmlFor="phone">phone</label>
          <input
            name="phone"
            id="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control my-2"
            placeholder="Phone"
          />
          <button
            className="btn bg-main text-white me-5"
            type="submit"
            onClick={() => setPaymentMethod(1)}
          >
            pay with card
          </button>
          <button
            className="btn bg-main text-white"
            type="submit"
            onClick={() => setPaymentMethod(2)}
          >
            pay with cash
          </button>
        </form>
      </div>
    </>
  );
}
