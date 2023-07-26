import React, { useEffect, useState } from "react";
import styles from "./HomeProducts.module.css";
import axios from "axios";
import Product from "./../Product/Product";
import { Link } from "react-router-dom";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";

export default function HomeProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="row m-5">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {products.map((product) => (
              <div key={product._id} className="col-6 col-sm-4 col-md-2">
                <Product pro={product} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
