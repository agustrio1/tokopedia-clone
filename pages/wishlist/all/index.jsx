import React, { useEffect, useState } from "react";
import { retrieveWishlist } from "../../firebase/service";
import Link from "next/link";
import HeaderAll from "@/pages/components/wishlist/HeaderAll";

const AllWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistData = await retrieveWishlist();
        setWishlist(wishlistData);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen max-w-[480px] mx-auto mt-4">
      <HeaderAll/>
      <div className="mt-12">
        <h1 className="text-md font-bold mb-4">All Wishlist</h1>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {wishlist.map((product) => (
              <Link
                href={"/products/[id]"}
                as={`/products/${product.productId}`}
                key={product.productId}
               >
                <div
                  key={product.productId}
                  className="p-4 border border-gray-300 rounded cursor-pointer transition duration-300 hover:shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover mb-4 rounded"
                  />
                  <p className="text-md font-bold mb-2">{product.name}</p>
                  <p className="text-gray-500 mb-2">Rp. {product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllWishlist;
