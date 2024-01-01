import React, { useEffect, useState } from "react";
import { retriveDataById } from "@/firebase/service";
import ProductHeader from "./ProductHeader";
import { useRouter } from "next/router";
import ProductImageSwiper from "./ProductImageSwiper";
import ProductButton from "./ProductButton";
import { FaHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist,
} from "@/firebase/wishlistService";

const formatDescription = (description) => {
  const spefications = description.split('- ');
  const filteredSpecs = spefications.filter((spec) => spec.trim() !== "");
  const formattedSpecifications = filteredSpecs.map((spec, index) => (
    <li key={index}>{spec.trim()}</li>
  ))

  return (
    <ul>
      {formattedSpecifications}
    </ul>
  )
}


function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
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

  useEffect(() => {
    const checkWishlist = async () => {
      if (productId) {
        const isInWishlist = await isProductInWishlist(productId);
        setIsInWishlist(isInWishlist);
      }
    };

    checkWishlist();
  }, [productId]);

  const handleToggleWishlist = async () => {
    try {
      if (isInWishlist) {
       await removeFromWishlist(productId)
          .then(() => {
            console.log("Produk dihapus dari wishlist.");
            setIsInWishlist(false);
          })
          .catch((error) => {
            console.error("Error menghapus produk dari wishlist:", error);
          });
      } else {
        await addToWishlist(productId, product);
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Error mengelola wishlist:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const products = [product, product, product];

  return (
    <div className="min-h-screen max-w-[600px] mx-auto sm:w-full">
      <ProductHeader />
      <div className="max-w-[500px] mt-12 mx-auto sm:w-full flex items-center justify-center overflow-x-hidden">
        <ProductImageSwiper products={products} />
      </div>
      <div className={`max-w-[500px] mt-auto pl-3`}>
        <div
          className={` p-4 max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl`}>
          <p className={`text-md md:text-xl font-bold mb-2`}>{product.name}</p>
          <p className={`text-gray-500 mb-2`}>{product.category}</p>
          <p className={`flex text-black font-bold mb-2 text-lg`}>
            <span className="mr-2">Rp{new Intl.NumberFormat("id-ID").format(product.price)}</span>
            <span className="flex items-center">
              <FaHeart
                className={`ml-32 cursor-pointer ${
                  isInWishlist ? "text-red-500" : "text-gray-500"
                }`}
                onClick={handleToggleWishlist}
              />
            </span>
          </p>

          <div className={`text-gray-700 mb-14`}>
            <h2>Deskripsi: </h2>
            {formatDescription(product.description)}
            </div>
        </div>
      </div>
      <ProductButton productId={productId} />
    </div>
  );
}

export default ProductDetails;
