import {
  retrieveCartWithProductDetails,
  updateCartItem,
  deleteCartItem,
  DeleteAllCart,
} from "../firebase/service";

export const fetchCartData = async (setCartData) => {
  try {
    const data = await retrieveCartWithProductDetails();

    // Simpan data keranjang ke localStorage
    localStorage.setItem("cart", JSON.stringify(data));
    setCartData(data);
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};

export const updateItemIncrement = async (
  item,
  setCartData,
  selectedItems,
  setSelectAll
) => {
  try {
    if (selectedItems && selectedItems.includes(item.id)) {
      const updatedQuantity = item.quantity + 1;
      const updatedSubTotal = item.price * updatedQuantity;

      await updateCartItem(item.id, {
        quantity: updatedQuantity,
        subTotal: updatedSubTotal,
      });

      fetchCartData(setCartData);
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
  } finally {
    setSelectAll(false);
  }
};

export const updateItemDecrement = async (
  item,
  setCartData,
  selectedItems,
  setSelectAll
) => {
  try {
    if (selectedItems && selectedItems.includes(item.id) && item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      const updatedSubTotal = item.price * updatedQuantity;

      await updateCartItem(item.id, {
        quantity: updatedQuantity,
        subTotal: updatedSubTotal,
      });

      fetchCartData(setCartData);
    } else if (item.quantity === 1) {
      handleRemoveItem(item.id, setCartData);
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
  } finally {
    setSelectAll(false);
  }
};

export const handleRemoveItem = async (itemId, setCartData) => {
  await deleteCartItem(itemId);
  fetchCartData(setCartData);
};

export const handleDeleteAll = async (selectedIds, setCartData) => {
  try {
    await DeleteAllCart();
    fetchCartData(setCartData);
  } catch (error) {
    console.error("Error deleting all cart items:", error);
  }
};