import {
    collection,
    getDocs,
    addDoc,
    getFirestore,
    deleteDoc,
    query,
    where,
  } from "firebase/firestore";
  import { currentUser } from "./init";

  const firestore = getFirestore();

  export const isProductInWishlist = async (productId) => {
    const userId = currentUser?.uid;
    if (!userId) {
      return false;
    }
  
    const wishlistQuery = query(
      collection(firestore, "wishlist"),
      where("userId", "==", userId),
      where("productId", "==", productId)
    );
  
    const wishlistSnapshot = await getDocs(wishlistQuery);
    return !wishlistSnapshot.empty;
  };
  
  export const addToWishlist = async (productId, productData) => {
    try {
      const userId = currentUser?.uid;
      if (!userId) {
        throw new Error("Pengguna belum masuk");
      }
  
      const alreadyInWishlist = await isProductInWishlist(productId);
      if (alreadyInWishlist) {
        console.log("Produk sudah ada di wishlist.");
        return;
      }
  
      const wishlistCollectionRef = collection(firestore, "wishlist");
      await addDoc(wishlistCollectionRef, {
        userId,
        productId,
        name: productData.name,
        category: productData.category,
        image: productData.image,
        price: productData.price,
        description: productData.description,
      });
  
      console.log("Produk ditambahkan ke wishlist.");
    } catch (error) {
      console.error("Gagal menambahkan produk ke wishlist:", error);
      throw error;
    }
  };
  
  export const removeFromWishlist = async (productId) => {
    try {
      const userId = currentUser?.uid;
      if (!userId) {
        console.error(
          "Pengguna belum masuk. Tidak dapat menghapus dari wishlist."
        );
        return false;
      }
  
      const wishlistQuery = query(
        collection(firestore, "wishlist"),
        where("userId", "==", userId),
        where("productId", "==", productId)
      );
  
      const wishlistSnapshot = await getDocs(wishlistQuery);
  
      if (!wishlistSnapshot.empty) {
        const wishlistDoc = wishlistSnapshot.docs[0].ref;
        await deleteDoc(wishlistDoc);
        console.log("Produk dihapus dari wishlist.");
        return true;
      } else {
        console.log("Produk tidak ditemukan di wishlist.");
        return false;
      }
    } catch (error) {
      console.error("Gagal menghapus produk dari wishlist:", error);
      throw error;
    }
  };
  
  export const retrieveWishlist = async () => {
    try {
      const userId = currentUser?.uid;
      if (!userId) {
        return [];
      }
  
      const wishlistQuery = query(
        collection(firestore, "wishlist"),
        where("userId", "==", userId)
      );
  
      const wishlistSnapshot = await getDocs(wishlistQuery);
  
      const wishlistData = wishlistSnapshot.docs.map((doc) => ({
        productId: doc.id,
        ...doc.data(),
      }));
  
      return wishlistData;
    } catch (error) {
      console.error("Gagal mengambil data wishlist:", error);
      throw error;
    }
  };