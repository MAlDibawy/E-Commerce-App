import React, { useContext } from "react";
import styles from "./Product.module.css";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function Product({ pro }) {
  const { addToCart } = useContext(cartContext);
  const navigate = useNavigate();
  const addProductToCart = async (productID) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    } else {
      const response = await addToCart(productID);
      if (response?.data?.status === "success") {
        toast.success(response.data.message, { className: "text-center" });
      } else {
        toast.error("ERROR");
      }
    }
  };

  return (
    <>
      <div className="product px-2 py-3 cursor-pointer">
        <Link to={`/productdetails/${pro._id}`}>
          <img className="w-100 " src={pro.imageCover} alt="product" />
          <span className="text-main fw-bold font-small">
            {pro.category.name}
          </span>
          <h3 className="h6 fw-bolder">
            {pro.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="d-flex justify-content-between">
            <span className="text-muted">{pro.price} EGP</span>
            <span className="">
              <i className="fas fa-star rating-color"></i>
              {pro.ratingsAverage}
            </span>
          </div>
        </Link>
        <button
          className="btn bg-main text-white w-100"
          onClick={() => addProductToCart(pro._id)}
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
