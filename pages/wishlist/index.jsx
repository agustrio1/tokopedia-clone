import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { retrieveWishlist } from "../firebase/service";
import { FaTimes } from "react-icons/fa";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
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

  const handleCreateWishlist = () => {
    if (newWishlistTitle.trim() === "") {
      alert("Please enter a title for your new wishlist.");
      const updatedWishlist = [
        ...wishlist,
        {title: newWishlistTitle, products: []},
      ]
      setWishlist(updatedWishlist);   
      setLastAddedProduct(null)
      setShowCreatePopup(false);
      setNewWishlistTitle("");
    }
  };

  const handleClosePopup = () => {
    setShowCreatePopup(false);
  };

  const moveProductToWishlist = (productId, wishlistIndex) => {
    const updatedWishlist = [...wishlist];
    const productToMove = updatedWishlist[0].products.find(
      (product) => product.productId === productId
    )
    if (productToMove) {
      updatedWishlist[0].products = updatedWishlist[0].products.filter(
        (product) => product.productId !== productId
      );
      updatedWishlist[wishlistIndex].products.push(productToMove);
      setWishlist(updatedWishlist);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen max-w-[600px] mx-auto mt-12">
      <div className="mt-8">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="flex items-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 md:gap-4">
              {lastAddedProduct && (
                <div className="p-4 border border-gray-300 rounded cursor-pointer transition duration-300 hover:shadow-md relative">
                  <img
                    src={lastAddedProduct.image}
                    alt={lastAddedProduct.name}
                    className="w-full h-32 object-cover mb-4 rounded"
                  />
                  <p className="text-md font-bold mb-2">
                    {lastAddedProduct.name}
                  </p>
                  <p className="text-gray-500">Rp. {lastAddedProduct.price}</p>
                </div>
              )}

              <div
                className="border-dotted border-r-2 h-full cursor-pointer flex items-center justify-center"
                onClick={() => setShowCreatePopup(true)}>
                <div className="text-3xl font-bold">+</div>
              </div>
            </div>
            {showCreatePopup && (
              <div className="fixed flex flex-col bottom-0 left-0 right-0 w-full mx-auto transform -translate-y-1/2 bg-white rounded shadow-md">
                <button
                  onClick={handleClosePopup}
                  className="text-lg text-gray-700 mb-4">
                  <FaTimes />
                </button>
                <input
                  type="text"
                  placeholder="Enter Wishlist Title"
                  value={newWishlistTitle}
                  onChange={(e) => setNewWishlistTitle(e.target.value)}
                  className="w-full border p-2 mb-4"
                />
                <button
                  onClick={handleCreateWishlist}
                  className="bg-blue-500 text-white px-4 py-2 rounded">
                  Create Wishlist
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
