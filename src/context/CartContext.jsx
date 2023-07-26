import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartID, setCartID] = useState(null);
  // const [numOfCartItems, setNumOfCartItems] = useState(null);

  const getCartDetails = async () => {
    try {
      const { data } = await getUserCart();
      if (data.status === "success") {
        setCartID(data.data._id);
        // setNumOfCartItems(data.numOfCartItems);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  const headers = { token: localStorage.getItem("userToken") };
  const addToCart = async (productId) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  };

  const getUserCart = async () => {
    try {
      return axios
        .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
          headers,
        })
        .then((response) => response);
    } catch (error) {}
  };

  const updateItemQuantity = async (productId, newQty) => {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newQty },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => console.log(error));
  };

  const removeFromCart = async (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  };

  const removeCart = async () => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  };
  const onlinePayment = async (cartID, shippingAddress) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  };
  const cashPayment = async (cartID, shippingAddress) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        { shippingAddress },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  };
  return (
    <cartContext.Provider
      value={{
        addToCart,
        getUserCart,
        removeFromCart,
        updateItemQuantity,
        removeCart,
        onlinePayment,
        cartID,
        cashPayment,
        // numOfCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
