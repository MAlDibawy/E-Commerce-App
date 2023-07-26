import React, { useEffect, useState } from "react";
import styles from "./AllOrders.module.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
export default function AllOrders({ userData }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/64bd9fdb270bce84aa782d45`
    );
    if (data) {
      setOrders(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container py-3">
        <div className="row">
          {orders.map((order) => {
            return (
              <div className="bg-light p-3 rounded-4 mb-3" key={order._id}>
                <p>price: {order.totalOrderPrice}</p>
                <p>order type: {order.paymentMethodType}</p>
                <p>
                  delivered to: {order.shippingAddress.details}
                  {"-"}
                  {order.shippingAddress.city} with phone-number {": "}
                  {order.shippingAddress.phone}
                </p>
                <div className="container">
                  <div className="row">
                    {order.cartItems.map((item) => (
                      <div className="col-md-4" key={item._id}>
                        <div className="item w-50">
                          <img
                            src={item.product.imageCover}
                            className="w-100"
                          />
                          <p>{item.product.title}</p>
                          <p>count: {item.count} </p>
                          <p>price: {item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
