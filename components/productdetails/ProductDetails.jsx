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
import Beadcrumb from "./Beadcrumb";
import ProductDescription from "./ProductDescription"; 

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
      <div className="max-w-[500px] mt-12 mx-auto sm:w-full flex items-center justify-center overflow-x-hidden zIndex">
        <ProductImageSwiper products={products} />
      </div>
      <div className={`max-w-[500px] mt-auto pl-3`}>
        <div
          className={` p-4 max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl`}>
          <p className={`text-md md:text-lg font-bold mb-2`}>{product.name}</p>
          <p className={`flex text-black font-bold mb-2 text-md justify-between`}>
            <span className="mr-2">
              Rp{new Intl.NumberFormat("id-ID").format(product.price)}
            </span>
            <span className="flex items-center">
              <FaHeart
                className={`cursor-pointer ${
                  isInWishlist ? "text-red-500" : "text-gray-500"
                }`}
                onClick={handleToggleWishlist}
              />
            </span>
          </p>
          <div className={`text-md  font-bold mb-2`}>
            <Beadcrumb category={product.category} />
          </div>
          <ProductDescription
            description={product.description}
          />
        </div>
      </div>
      <ProductButton productId={productId} />
    </div>
  );
}

export default ProductDetails;