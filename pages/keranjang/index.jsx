import React, { useEffect, useState } from "react";
import {
  fetchCartData,
  updateItemIncrement,
  updateItemDecrement,
  handleDeleteAll,
} from "../utils/cartLogic";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [subtotalArray, setSubtotalArray] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchCartData(setCartData);
  }, []);

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  useEffect(() => {
    const subTotals = cartData.map((item) =>
      calculateSubtotal(item.price, item.quantity)
    );
    setSubtotalArray(subTotals);
  }, [cartData]);

  const total = subtotalArray.reduce((acc, curr) => acc + curr, 0);

  const toggleItemSelection = (itemId) => {
    const updatedselection = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];
    setSelectedItems(updatedselection);
  };

  const toggleSelectedAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : cartData.map((item) => item.id));
  }

  const handleBuyCart = () => {
    console.log("Total:", total);
  }

  

  return (
    <div className="mt-20 overflow-y-auto max-w-screen-md">
      <div className="flex justify-between items-center mb-4">
        <p>
          <span className="font-semibold">
            {cartData.length} Produk dipilih
          </span>
        </p>
        <button onClick={() => handleDeleteAll(selectedItems, setCartData)}>
          <FaTrash />
        </button>
      </div>
      {cartData.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4">
          <div className="flex items-center">
          <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleItemSelection(item.id)}
              className="mr-2"
            />
            <img
              src={item.image}
              alt={item.productName}
              style={{ maxWidth: "100px" }}
            />
            <div className="ml-4">
              <p>{item.productName}</p>
              <p>
                Price: Rp. {new Intl.NumberFormat("id-ID").format(item.price)}
              </p>
              <div className="flex items-center mt-4 mx-auto">
                <button onClick={() => updateItemDecrement(item, setCartData)}>
              <FaMinus />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateItemIncrement(item, setCartData)}>
              <FaPlus />
            </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4">
        <p className="text-xl">
          Total: Rp. {new Intl.NumberFormat("id-ID").format(total)}
        </p>
        <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleBuyCart}>
            Beli
          </button>
      </div>
    </div>
  );
}

export default Cart;
