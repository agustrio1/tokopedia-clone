import React, { useEffect, useState } from "react";
import { retriveDataById } from "../../firebase/service";
import ProductHeader from "./ProductHeader";
import { useRouter } from "next/router";
import ProductImageSwiper from "./ProductImageSwiper";
import ProductButton from "./ProductButton";

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const fetchedProduct = await retriveDataById("products", productId);
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();

  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const products = [product, product, product];

  return (
    <div className="min-h-screen max-w-[600px] mx-auto">
      <ProductHeader />
      <div className="max-w-[500px] mt-12 mx-auto">
        <ProductImageSwiper products={products}/>
      </div>
      <div className={`max-w-[600px] mt-auto`}>
        <div
          className={` p-4 max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl`}>
          <p className={`text-md md:text-xl font-bold mb-2`}>{product.name}</p>
          <p className={`text-gray-500 mb-2`}>{product.category}</p>
          <p className={`text-black font-bold mb-2 text-lg`}>
            Rp. {new Intl.NumberFormat("id-ID").format(product.price)}
          </p>
          <p className={`text-gray-700 mb-4`}>{product.description}</p>
        </div>
      </div>
      <ProductButton/>
    </div>
  );
}

export default ProductDetails;
