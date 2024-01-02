import React, { useState, useEffect } from "react";
import { BiMessage } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { auth, onAuthStateChanged } from "@/firebase/init";
import { useSpring, animated } from "@react-spring/web";
import { addToCart } from "@/firebase/service";

function ProductButton({ productId }) {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const popupAnimation = useSpring({
    transform: showPopup ? "translateY(0)" : "translateY(100%)",
    opacity: showPopup ? 1 : 0,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handlePopup = () => {
    setShowPopup(true);
  };

  const handleCheckout = () => {
    setShowPopup(false);
    router.push("/checkout");
  };

  const handleCart = async () => {
    try {
      setShowPopup(false);
      await addToCart(productId, 1);
      router.push("/keranjang");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <footer
        className={`fixed max-w-[600px] bottom-0 left-0 right-0 p-4 flex justify-between items-center mx-auto bg-white zIndex`}>
        <button
          className={`text-md text-gray-700 p-1 border rounded-md box-border mr-3 ml-3 md:ml-6`}
          onClick={handleClosePopup}>
          <BiMessage />
        </button>
        <button
          onClick={handlePopup}
          className={`text-md p-1 border-green-600 w-full border rounded-md box-border mr-2 md:mr-4`}>
          <span className="text-green-600 text-sm md:text-md font-semibold md:font-bold">
            Beli
          </span>
        </button>
        <button
          onClick={handlePopup}
          className={`flex text-sm md:text-md text-white p-1 w-full bg-green-600 border rounded-md box-border mr-1 md:mr-6`}>
          <span className="text-[16px] py-1 md:text-md font-semibold md:font-bold mx-auto">
            + Keranjang
          </span>
        </button>
      </footer>

      <animated.div
        style={popupAnimation}
        className="fixed bottom-0 left-0 right-0 bg-white p-8 mt-8 flexflex-col justify-between items-center mx-auto">
        <button
          onClick={handleClosePopup}
          className="text-lg text-gray-700 mb-4">
          <FaTimes />
        </button>
        <div className="flex">
          <button
            onClick={handleCheckout}
            className={`text-sm p-1 border-green-600 w-full border rounded-md box-border mr-4`}>
            <span className="text-green-600 text-sm md:text-md font-semibold md:font-bold">
              Beli
            </span>
          </button>
          <button
            onClick={handleCart}
            className={`text-md text-white p-1 w-full bg-green-600 border rounded-md box-border mr-6`}>
            <span className="text-sm md:text-md font-semibold md:font-bold">
              + Keranjang
            </span>
          </button>
        </div>
      </animated.div>
    </>
  );
}

export default ProductButton;
