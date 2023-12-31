import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  doc,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app, currentUser, db } from "./init";

const firestore = getFirestore(app);

export async function retriveData(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retriveDataById(collectionName, id) {
  const documentRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(documentRef);
  const data = snapshot.data();
  return data;
}

export async function addToCart(productId, quantity) {
  try {
    if (!currentUser) {
      throw new Error("Pengguna belum masuk");
      return;
    }

    const userId = currentUser.uid;
    const productData = await retriveDataById("products", productId);
    const cartCollectionRef = collection(db, "cart");

    // Cari apakah produk sudah ada
    const existingCartItemQuery = query(
      cartCollectionRef,
      where("userId", "==", userId),
      where("productId", "==", productId)
    );

    const existingCartSnapshot = await getDocs(existingCartItemQuery);

    // Jika ada, perbarui kuantitas
    if (!existingCartSnapshot.empty) {
      const existingCartItem = existingCartSnapshot.docs[0];
      const updateQuantity = existingCartItem.data().quantity + quantity;
      const updateSubTotal = productData.price * updateQuantity;

      // Perbarui dokumen
      await updateDoc(existingCartItem.ref, {
        quantity: updateQuantity,
        subTotal: updateSubTotal,
      });

      return existingCartItem.id;
    } else {
      // Jika produk belum ada di keranjang, tambahkan data baru dengan userId
      const addedDocRef = await addDoc(cartCollectionRef, {
        userId,
        productId,
        quantity,
        image: productData.image,
        name: productData.name,
        price: productData.price,
        subTotal: productData.price * quantity,
      });

      //simpan data ke localstorage
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      const newItems = {
        id: addedDocRef.id,
        userId,
        productId,
        quantity,
        image: productData.image,
        name: productData.name,
        price: productData.price,
        subTotal: productData.price * quantity,
      };

      console.log(
        "Produk berhasil ditambahkan ke keranjang dengan ID:",
        addedDocRef.id
      );
      cartData.push(newItems);
      localStorage.setItem("cartData", JSON.stringify(cartData));

      return addedDocRef.id;
    }
  } catch (error) {
    console.error("Gagal menambahkan produk ke keranjang:", error);
    throw error;
  }
}

export async function retrieveCartWithProductDetails() {
  try {
    const userId = currentUser?.uid;
    if (!userId) {
      return [];
    }

    const cartSnapshot = await getDocs(
      query(collection(firestore, "cart"), where("userId", "==", userId))
    );

    const cartData = [];

    for (const doc of cartSnapshot.docs) {
      const { productId, quantity } = doc.data();

      const productData = await retriveDataById("products", productId);

      const cartItem = {
        id: doc.id,
        productId,
        image: productData.image,
        productName: productData.name,
        price: productData.price,
        quantity,
      };

      cartData.push(cartItem);
    }

    return cartData;
  } catch (error) {
    console.error(
      "Gagal mengambil data keranjang dengan detail produk:",
      error
    );
    throw error;
  }
}

export const updateCartItem = async (cartItemId, updateData) => {
  const cartItemRef = doc(firestore, "cart", cartItemId);
  await updateDoc(cartItemRef, updateData);
};

export const deleteCartItem = async (cartItemId) => {
  const cartItemRef = doc(firestore, "cart", cartItemId);
  await deleteDoc(cartItemRef);
};

export const DeleteAllCart = async () => {
  const collectionRef = collection(firestore, "cart");
  const cartSnapshot = await getDocs(collectionRef);

  const deletionPromises = cartSnapshot.docs.map(async (doc) => {
    await deleteDoc(doc.ref);
  });

  await Promise.all(deletionPromises);
};