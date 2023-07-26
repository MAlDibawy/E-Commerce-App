import React, { useState, useEffect } from "react";
import styles from "./CategorySlider.module.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  const getCategories = async () => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/`
    );
    setCategories(data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div className=" py-2">
      <Slider {...settings}>
        {categories?.map((cat) => (
          <div key={cat._id}>
            <img
              src={cat.image}
              className="w-75 m-auto"
              style={{ height: "250px" }}
            />
            <p className="text-center">{cat.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
