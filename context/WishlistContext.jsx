import Reaact, { createContext, useContext, useEffect, useState } from "react";
import {
  addToWishlist,
  isProductInWishlist,
  removeFromWishlist,
  retrieveWishlist,
} from "@/firebase/wishlistService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children, productId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const addToWishlistHandler = async (productId, productData) => {
    await addToWishlist(productId, productData);
    setWishlist([...wishlist, { productId, ...productData }]);
  };

  const removeFromWishlistHandler = async (productId) => {
    await removeFromWishlist(productId);
    setWishlist(wishlist.filter((item) => item.productId !== productId));
  };

  const useCheckProductInWishlist = async (productId) => {
    try {
      const isInWishlist = await isProductInWishlist(productId);
      return isInWishlist;
    } catch (error) {
      console.error("Error checking product in wishlist:", error);
      return false;
    }
  };
  

  useEffect(() => {
    const fecthWishlist = async () => {
      const wishlistData = await retrieveWishlist();
      setWishlist(wishlistData);
    };

    fecthWishlist();
  }, []);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      const isProductInWishlist = await isInWishlist(productId);
      console.log("Is product in wishlist?", isProductInWishlist);
    };
  
    checkWishlistStatus();
  }, [isInWishlist, productId]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist: addToWishlistHandler,
        removeFromWishlist: removeFromWishlistHandler,
        isInWishlist: useCheckProductInWishlist,
      }}>
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist = () => useContext(WishlistContext);