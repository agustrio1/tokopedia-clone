import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover mb-4 rounded-md"
      />
      <p className="text-sm font-bold mb-2 text-center overflow-hidden">
        {product.name.length > 30 ? (
          <span title={product.name}>{product.name.substring(0, 17)}...</span>
        ) : (
          product.name
        )}
      </p>
      <p className="text-black font-bold mb-2 text-center text-sm">
        Rp. {new Intl.NumberFormat("id-ID").format(product.price)}
      </p>
    </div>
  );
};

export default ProductCard;
