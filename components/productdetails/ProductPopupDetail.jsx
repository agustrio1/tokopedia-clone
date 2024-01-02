import React, { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import Beadcrumb from "./Beadcrumb";

const formatDescription = (description) => {
  const spefications = description.split("- ");
  const filteredSpecs = spefications.filter((spec) => spec.trim() !== "");
  const formattedSpecifications = filteredSpecs.map((spec, index) => (
    <li key={index}>{spec.trim()}</li>
  ));

  return <ul>{formattedSpecifications}</ul>;
};

const ProductPopupDetail = ({ description, closePopup, category }) => {

  const popupAnimation = useSpring({
    maxHeight: "50vh",
  });

  return (
    <animated.div style={popupAnimation} className={" mt-8"}>
      <h2 className="text-md font-bold mb-4">Detail Produk</h2>
      <Beadcrumb category={category} />
      <h2 className="text-md font-bold mb-4">Deskripsi</h2>
      {formatDescription(description)}
    </animated.div>
  );
};

export default ProductPopupDetail;
