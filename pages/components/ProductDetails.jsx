import React, { useEffect, useState } from "react";
import { retriveDataById } from "../firebase/service";
import { IoArrowBack, IoShareSocialOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import OffCanvasMenu from "./OffCanvasMenu";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [isNav, setIsNav] = useState(false);
  const [headerBackground, setHeaderBackground] = useState({
    startColor: "transparent",
    endColor: "transparent",
  });

  const openNav = () => {
    setIsNav(!isNav);
  };

  const closeNav = () => {
    setIsNav(false);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const headerHeigth = 60;
    const alphaColorHeader = Math.min(scrollPosition / headerHeigth, 1);
    const startColor = `rgba(255, 255, 255, 0)`;
    const endColor = `rgba(255, 255, 255, ${alphaColorHeader})`;

    setHeaderBackground({ startColor, endColor });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await retriveDataById("products", productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const products = [product, product, product];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="min-h-screen max-w-screen-md">
      <header
        className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center max-w-[600px] mx-auto z-20"
        style={{
            background: `linear-gradient(to bottom, ${headerBackground.startColor}, ${headerBackground.endColor})`,
          }}>
        <div>
          <Link href="/" className="text-lg text-gray-700">
            <IoArrowBack size={24} className="ml-8" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <button className="text-lg text-gray-700" disabled>
            <AiOutlineSearch size={24} />
          </button>
          <button className="text-lg text-gray-700" disabled>
            <IoShareSocialOutline size={24} />
          </button>
          <button className="text-lg text-gray-700" disabled>
            <BiCart size={24} />
          </button>
          <span
            onClick={openNav}
            className="p-[9px] bg-white rounded-md cursor-pointer">
            <RxHamburgerMenu size={24} />
          </span>
        </div>
        {isNav && <OffCanvasMenu closeNav={closeNav} />}
      </header>
      <div className="mt-8">
      <Slider {...settings} className="h-80" style={{ maxWidth: "500px", margin: "auto" }}>
        {products.map((product) => (
          <div key={product.id} className="zIndex">
            <img
              src={product.image}
              alt={`Product Image`}
              className=" h-80 mb-2 mx-auto rounded-md zIndex"
            />
          </div>
        ))}
      </Slider>
      </div>
      <div className={`max-w-screen-md p-6 mx-auto mt-auto`}>
        <div className={`bg-white p-4 shadow-lg rounded-md`}>
          <p className={`text-xl font-bold mb-2`}>{product.name}</p>
          <p className={`text-gray-500 mb-2`}>{product.category}</p>
          <p className={`text-black font-bold mb-2 text-lg`}>
            Rp. {new Intl.NumberFormat("id-ID").format(product.price)}
          </p>
          <p className={`text-gray-700 mb-4`}>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
