import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LoadingScreen from "./../LoadingScreen/LoadingScreen";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { cartContext } from "./../../context/CartContext";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
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
      console.log(response);
    }
  };

  const getProductDetails = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <div className="container">
        <div className="row p-5">
          <div className="col-md-4">
            <Slider {...settings}>
              {productDetails?.images.map((img, index) => (
                <img src={img} key={index} />
              ))}
            </Slider>
          </div>
          <div className="col-md-8">
            <h3>{productDetails?.title}</h3>
            <p className="text-muted py-2">{productDetails?.description}</p>
            <div className="d-flex justify-content-between">
              <span className="text-muted">{productDetails?.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color"></i>
                {productDetails?.ratingsAverage}
              </span>
            </div>
            <span className="text-muted">
              {productDetails?.quantity > 0 ? (
                <span className="text-main">In stock</span>
              ) : (
                <span className="text-main">Out of stock</span>
              )}
            </span>
            <button
              className="btn bg-main text-white w-100 my-2"
              onClick={() => addProductToCart(productDetails._id)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
