import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { CartContextProvider } from "./context/CartContext";
import AllOrders from "./components/AllOrders/AllOrders";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const [userData, setUserData] = useState(null);
  const saveUserData = () => {
    const token = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(token);
    setUserData(decodedToken);
  };
  const resetUserData = () => {
    localStorage.removeItem("userToken");
    setUserData(null);
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) saveUserData();
  }, []);

  return (
    <div className="App overflow-hidden">
      <Router>
        <CartContextProvider>
          <Header userData={userData} resetUserData={resetUserData} />
        </CartContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <CartContextProvider>
                <Home />
              </CartContextProvider>
            }
          />
          <Route
            path="/productdetails/:id"
            element={
              <CartContextProvider>
                <ProductDetails />
              </CartContextProvider>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartContextProvider>
                  <Cart />
                </CartContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CartContextProvider>
                  <Checkout />
                </CartContextProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/allorders"
            element={
              <ProtectedRoute>
                <AllOrders userData={userData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<Login saveUserData={saveUserData} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
