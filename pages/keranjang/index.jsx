import React, { useEffect, useState } from "react";
import {
  fetchCartData,
  updateItemIncrement,
  updateItemDecrement,
  handleDeleteAll,
} from "../utils/cartLogic";
import { FaPlus, FaMinus, FaHeart } from "react-icons/fa";
import Header from "@/components/cart/Header";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchCartData(setCartData);
  }, []);

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const getTotal = () => {
    if (selectAll) {
      return cartData.reduce(
        (acc, item) => acc + calculateSubtotal(item.price || 0, item.quantity),
        0
      );
    } else {
      return selectedItems.reduce((acc, itemId) => {
        const selectedItem = cartData.find((item) => item.id === itemId);
        return (
          acc +
          calculateSubtotal(
            selectedItem?.price || 0,
            selectedItem?.quantity || 0
          )
        );
      }, 0);
    }
  };

  useEffect(() => {
    setSelectedItems(cartData.map((item) => item.id));
  }, [cartData]);

  const handleBuyCart = () => {
    console.log("Total:", getTotal());
  };

  const handleToggleWishlist = (itemId) => {};

  return (
    <div className="mt-12 overflow-y-auto max-w-screen-[600px]">
      <Header />
      <div className={`flex justify-between items-center mb-4 ${selectedItems.length > 0 ? 'border-b pb-2' : ''}`}>
        {selectedItems.length > 0 ? (
          <p className="transition-active">
            <span className="ml-3 text-[13px] font-semibold">
              {selectedItems.length} Produk dipilih
            </span>
          </p>
        ) : (
          <p className="transition-inactive">
            <span className="ml-3 text-[13px] font-semibold">
              {selectedItems.length} Produk dipilih
            </span>
          </p>
        )}
        {selectedItems.length > 0 ? (
          <button
            onClick={() => handleDeleteAll(selectedItems, setCartData)}
            className="mr-2 text-green-400 text-[12px] font-bold transition-active">
            Hapus
          </button>
        ) : (
          <button
            onClick={() => handleDeleteAll(selectedItems, setCartData)}
            className="mr-2 text-green-400 text-[12px] font-bold transition-inactive">
            Hapus
          </button>
        )}
      </div>
      {cartData.map((item) => (
        <div
          key={item.id}
          className="flex justify-center items-center mb-4 relative">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectAll || selectedItems.includes(item.id)}
              onChange={() => {
                const updatedSelection = selectedItems.includes(item.id)
                  ? selectedItems.filter((id) => id !== item.id)
                  : [...selectedItems, item.id];
                setSelectedItems(updatedSelection);
                setSelectAll(updatedSelection.length === cartData.length);
              }}
              className="ml-2 mr-2"
            />
            <img
              src={item.image}
              alt={item.productName}
              style={{ maxWidth: "100px" }}
            />
            <div className="ml-4 w-[33vw] lg:w-[24vw]">
              <p className="text-sm md:text-md lg:text-lg">
                {item.productName}
              </p>
              <p className="text-sm md:text-md lg:text-lg">
                Price: Rp. {new Intl.NumberFormat("id-ID").format(item.price)}
              </p>
              <div className="flex items-center mt-4 mx-auto">
                <div className="mr-auto">
                  <FaHeart
                    onClick={() => handleToggleWishlist(item.id)}
                    className={
                      wishlistItems.includes(item.id) ? "text-pink-500" : ""
                    }
                  />
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 right-0 mt-8">
                  <div className="flex items-center border border-gray-300 p-1 rounded-md">
                    <button
                      onClick={() =>
                        updateItemDecrement(
                          item,
                          setCartData,
                          selectedItems,
                          setSelectAll
                        )
                      }
                      className="ml-auto mr-2">
                      <FaMinus className="text-green-400 p-1" size={18} />
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateItemIncrement(
                          item,
                          setCartData,
                          selectedItems,
                          setSelectAll
                        )
                      }
                      className="ml-2">
                      <FaPlus className="text-green-400 p-1" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center fixed bottom-0 left-0 right-0 max-w-[500px] bg-white p-4 mx-auto">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={() => {
              setSelectAll(!selectAll);
              setSelectedItems(
                selectAll ? [] : cartData.map((item) => item.id)
              );
            }}
            className="ml-2 mr-4"
          />
          <div>
            <p className="text-sm ml-[22vw]">
              {selectAll ? "Total" : "Subtotal"}:
            </p>
            <p className="text-sm ml-[19vw]">
              Rp. {new Intl.NumberFormat("id-ID").format(getTotal())}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="bg-green-500 text-white px-8 py-2 rounded ml-4"
            onClick={handleBuyCart}>
            Beli
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
