import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

function ProductImageSwiper({ products }) {
  return (
    <Swiper
    key={products.id}
      width={500}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={1}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: true }}
      className="w-full"
      style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      {products.map((product) => (
        <SwiperSlide
          key={product.id}
          style={{ maxWidth: "600px", margin: "auto" }}>
          <Image
            src={product.image}
            alt={`Product Image`}
            key={product.id}
            width={200}
            height={200}
            priority={true}
            className="mx-auto zIndex max-w-full h-auto"
            style={{ display: "flex", margin: "auto" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProductImageSwiper;
