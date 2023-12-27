import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const CarouselComponent = () => {
  const images = [
    "/carousel/tokped1.jpg",
    "/carousel/tokped2.jpg",
    "/carousel/tokped3.jpg",
  ];

  return (
    <div className="max-w-screen-md mx-auto mt-8">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        interval={5000}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`image${index + 1}`}
              width={400}
              height={300}
              priority={true}
              className="rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
