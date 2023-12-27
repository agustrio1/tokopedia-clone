import React from 'react'
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function ProductImageSwiper({products}) {
  return (
    <Swiper
      width={600}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={1}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: true }}
      style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      {products.map((product) => (
        <SwiperSlide key={product.id} style={{ maxWidth: "600px", margin: "auto" }}>
          <img
            src={product.image}
            alt={`Product Image`}
            className="h-60 md:h-80 mx-auto"
            style={{ display: "flex", margin: "auto" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ProductImageSwiper