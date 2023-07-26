import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../context/CartContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getUserCart, removeFromCart, updateItemQuantity } =
    useContext(cartContext);
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCart = async () => {
    setIsLoading(true);
    try {
      const response = await getUserCart();
      if (response?.data.status === "success") {
        setCart(response.data);
      }
    } catch (error) {}

    setIsLoading(false);
  };

  const removeItem = async (productID) => {
    setIsLoading(true);
    const response = await removeFromCart(productID);
    if (response.data.status === "success") {
      setCart(response.data);
    } else {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateItem = async (productID, newQty) => {
    if (newQty === 0) {
      removeItem(productID);
    }
    try {
      const response = await updateItemQuantity(productID, newQty);
      if (response.data.status === "success") {
        setCart(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {cart ? (
        <div className="bg-main-light p-4 my-4">
          <h3>Your Cart</h3>
          <h4>Total cart price: {cart?.data.totalCartPrice}</h4>
          <h6>Number of items: {cart?.numOfCartItems}</h6>
          {cart?.data.products.map((pro) => (
            <div className="row p-2" key={pro.product._id}>
              <div className="col-md-2">
                <img src={pro.product.imageCover} alt="" className="w-100" />
              </div>
              <div className="col-md-10">
                <span className="d-block my-2">{pro.product.title}</span>
                <span className="d-block my-2">price: {pro.price} EGP</span>
                <button
                  className="btn btn-sm btn-success my-2"
                  onClick={() => updateItem(pro.product._id, pro.count - 1)}
                >
                  -
                </button>
                <span className="m-2">{pro.count}</span>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => updateItem(pro.product._id, pro.count + 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger d-block btn-sm"
                  onClick={() => removeItem(pro.product._id)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-success">
            <Link className="text-white" to={"/checkout"}>
              checkout
            </Link>
          </button>
        </div>
      ) : (
        <div className="container py-5">
          <h2>Cart is Empty</h2>
        </div>
      )}
    </>
  );
}
