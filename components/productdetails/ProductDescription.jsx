import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import ProductPopupDetail from "./ProductPopupDetail";

const ProductDescription = ({ description, category }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [originalDescription, setOriginalDescription] = useState(description);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
    if (!showFullDescription) {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowFullDescription(false);
  };

  const popupAnimation = useSpring({
    transform: showPopup ? "translateY(0%)" : "translateY(100%)",
    opacity: showPopup ? 1 : 0,
  });

  return (
    <div className="text-gray-700 mb-16 max-h-svh relative">
      <h2>Deskripsi: </h2>
      <ul>
        {showFullDescription
          ? originalDescription
              .split("- ")
              .slice(0, 2)
              .map((spec, index) => <li key={index}>{spec.trim()}</li>)
          : originalDescription
              .split("- ")
              .slice(0, 2)
              .map((spec, index) => <li key={index}>{spec.trim()}</li>)}
      </ul>
      {!showFullDescription && (
        <button
          className="text-green-500 cursor-pointer"
          onClick={toggleDescription}>
          Lihat semua
        </button>
      )}
      {showPopup && (
        <>
         <div
            onClick={() => closePopup()}
            className={`fixed inset-0 bg-black bg-opacity-50`}
          ></div>
        <animated.div
          style={popupAnimation}
          className={`fixed w-full h-3/4 bottom-0 left-0 bg-white p-6 rounded-lg shadow-lg overflow-y-auto`}>
          <span
            className="absolute top-0 right-0 mt-4 mr-4 text-black cursor-pointer"
            onClick={() => closePopup()}>
            &times;
          </span>
          <ProductPopupDetail
            description={originalDescription}
            closePopup={closePopup}
            category={category}
          />
        </animated.div>
        </>
      )}
    </div>
  );
};

export default ProductDescription;
