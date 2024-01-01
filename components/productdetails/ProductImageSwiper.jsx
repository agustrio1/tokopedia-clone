import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

function ProductImageSwiper({ products }) {
  return (
    <Swiper
      key={products.id}
      width={360}
      height={420}
      // navigation
      // pagination={{ clickable: true }}
      spaceBetween={1}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: true }}
      className="w-full mx-auto"
      style={{
        maxWidth: "360px",
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
        marginRight: "10px",
        textAlign: "center",
        overflowX: "hidden",
        boxSizing : "border-box",
      }}>
      {products.map((product) => (
        <SwiperSlide
          key={product.id}
          style={{ maxWidth: "400px", margin: "auto" }}>
          <Image
            src={product.image}
            alt={`Product Image`}
            key={product.id}
            width={320}
            height={420}
            priority={true}
            className="mx-auto zIndex max-w-full h-auto relative"
            style={{ display: "flex", margin: "auto", alignItems: "center", }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProductImageSwiper;
