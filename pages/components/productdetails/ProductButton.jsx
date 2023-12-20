import React, { useState, useEffect } from "react";
import { BiMessage } from "react-icons/bi";
import { useRouter } from "next/router";
import { auth, onAuthStateChanged } from "../../firebase/init";
import { useSpring, animated } from "@react-spring/web";

function ProductButton() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const popupAnimation = useSpring({
    trensform: showPopup ? "translateY(0)" : "translateY(100%)",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleBuyNow = () => {
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    router.push("/cart");
  };

  return (
    <>
      <footer
        className={`fixed max-w-[600px] bottom-0 left-0 right-0 p-4 flex justify-between items-center mx-auto`}>
        <button
          className={`text-lg text-gray-700 p-2 border rounded-md box-border mr-6 ml-6`}>
          <BiMessage />
        </button>
        <button
          onClick={handleBuyNow}
          className={`text-lg p-2 border-green-600 w-full border rounded-md box-border mr-4`}>
          <span className="text-green-600 text-md font-bold">Beli</span>
        </button>
        <button
          onClick={handleAddToCart}
          className={`text-lg text-white p-2 w-full bg-green-600 border rounded-md box-border mr-6`}>
          <span className="text-md font-bold">+ Tambah Keranjang</span>
        </button>
      </footer>
    </>
  );
}

export default ProductButton;
