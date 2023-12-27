import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { retrieveWishlist, addToWishlist } from "../../firebase/service";
import { FaPlus } from "react-icons/fa";
import Header from "@/components/wishlist/Header";
import Image from "next/image";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const [showCreateWishlistPopup, setShowCreateWishlistPopup] = useState(false);
  const [creatingWishlist, setCreatingWishlist] = useState(false);
  const [newWishlistTitle, setNewWishlistTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistData = await retrieveWishlist();
        setWishlist(wishlistData);

        if (wishlistData.length > 0) {
          setLastAddedProduct(wishlistData[0]);
        }
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (product) => product.productId !== productId
    );
    setWishlist(updatedWishlist);
    if (updatedWishlist.length > 0) {
      setLastAddedProduct(updatedWishlist[0]);
    }
  };

  const navigateToAllWishlist = () => {
    router.push("/wishlist/all");
  };

  const handleCreateWishlist = async () => {
    if (newWishlistTitle.trim() === "") {
      return;
    }

    try {
      const addedWishlistId = await addToWishlist(newWishlistTitle, []);

      const updatedWishlist = [
        { id: addedWishlistId, title: newWishlistTitle, products: [] },
        ...wishlist,
      ];

      setWishlist(updatedWishlist);
      setCreatingWishlist(false);
      setNewWishlistTitle("");
    } catch (error) {
      console.error("Error creating wishlist:", error);
    }
  };

  const handleWishlistClick = (wishlistId) => {
    router.push(`/wishlist/${wishlistId}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen max-w-[600px] mx-auto mt-8">
      <Header />
      <div className="mt-8">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 md:gap-4">
            {lastAddedProduct && (
              <div
                className="p-4 border border-gray-300 rounded cursor-pointer transition duration-300 hover:shadow-md"
                onClick={navigateToAllWishlist}>
                <Image
                  src={lastAddedProduct.image}
                  alt={lastAddedProduct.name}
                  width={180}
                  height={180}
                  priority={true}
                  className="object-cover mb-4 rounded"
                />
                <p className="text-md font-bold mb-2">
                  {lastAddedProduct.name}
                </p>
                <p className="text-gray-500">Rp. {lastAddedProduct.price}</p>
              </div>
            )}
            <div className="p-4 border border-dotted border-gray-300 rounded col-span-1 relative">
              <div className="flex items-center justify-center">
                <button
                  className="text-3xl text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={() => setShowCreateWishlistPopup(true)}>
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showCreateWishlistPopup && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md max-w-md w-full">
            <p className="text-lg font-bold mb-4">Buat Wishlist Baru</p>
            <input
              type="text"
              placeholder="Judul Wishlist"
              className="w-full border p-2 mb-4"
              value={newWishlistTitle}
              onChange={(e) => setNewWishlistTitle(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCreateWishlist}>
                Buat
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setShowCreateWishlistPopup(false)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
