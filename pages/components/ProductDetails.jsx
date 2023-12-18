import React, { useEffect, useState } from "react";
import { retriveDataById } from "../firebase/service";

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);

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
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-md p-6 mx-auto mt-16">
      <div className="bg-white p-4 shadow-lg rounded-md">
        <img
          src={product.image || ""}
          alt={product.name || ""}
          className="w-60 h-60 object-cover mb-4 mx-auto"
        />
        <p className="text-xl font-bold mb-2">{product.name}</p>
        <p className="text-gray-500 mb-2">{product.category}</p>
        <p className="text-black font-bold mb-2 text-lg">
          Rp. {new Intl.NumberFormat("id-ID").format(product.price)}
        </p>
        <p className="text-gray-700 mb-4">{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
