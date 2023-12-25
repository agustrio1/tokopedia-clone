import React, { useEffect, useState } from "react";
import { retrieveWishlist } from "../../firebase/service";
import Link from "next/link";

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
    <div className="min-h-screen max-w-[600px] mx-auto">
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">All Wishlist</h1>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {wishlist.map((product) => (
              <div
                key={product.productId}
                className="p-4 border border-gray-300 rounded cursor-pointer transition duration-300 hover:shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-4 rounded"
                />
                <p className="text-md font-bold mb-2">{product.name}</p>
                <p className="text-gray-500 mb-2">Rp. {product.price}</p>
                <p className="text-gray-500 mb-2">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
          <Link href={'/wishlist'} className="text-blue-500 hover:underline">Go back to Wishlist</Link>
      </div>
    </div>
  );
};

export default AllWishlist;
