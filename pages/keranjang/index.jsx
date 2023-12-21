import React, { useEffect, useState } from "react";
import {fetchCartData,
  updateItemIncrement,
  updateItemDecrement,
  handleRemoveItem,} from "../utils/cartLogic";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function Cart() {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchCartData(setCartData);
  }, []);

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  return (
    <div className="mt-16 overflow-y-auto">
      <h1>Your Shopping Cart</h1>
      {cartData.map((item) => (
        <div key={item.id}>
          <img
            src={item.image}
            alt={item.productName}
            style={{ maxWidth: "100px" }}
          />
          <p>{item.productName}</p>
          <p>Price: Rp. {new Intl.NumberFormat("id-ID").format(item.price)}</p>
          <div>
            <button onClick={() => updateItemDecrement(item, setCartData)}>
              <FaMinus />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateItemIncrement(item, setCartData)}>
              <FaPlus />
            </button>
          </div>
          <p>
            Subtotal: Rp.{" "}
            {new Intl.NumberFormat("id-ID").format(
              calculateSubtotal(item.price, item.quantity)
            )}
          </p>
          <button onClick={() => handleRemoveItem(item.id, setCartData)}>
            <FaTrash />
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Cart;
