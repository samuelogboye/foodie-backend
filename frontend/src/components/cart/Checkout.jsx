import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
import "@/styles/style.css";
import baseUrl from "@/index";

const ItemCheckout = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalQuantity,
    totalPriceCart,
  } = useContext(CartContext);
  const [shippingAddress, setShippingAddress] = useState("");

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const totalPrice = item ? quantity * item.price : 0;
  // if there is no item in the cart the delivery fee should be zero
  const deliveryFee = cartItems.length === 0 ? 0 : 300;
  const subTotal = totalPriceCart + deliveryFee;
  const paymentCharges = 0.1 * subTotal;

  const total = subTotal + paymentCharges;

  const renderCartItems = () => {
    return cartItems.map((cartItem) => (
      <div key={cartItem.id} className="border-b flex justify-between">
        <div className="flex m-4 items-center gap-3">
          <div>
            <img src={cartItem.image_url} alt={cartItem.name} width={200} />
            <p
              className="text-center font-mono mt-4 text-brandColor cursor-pointer hover:underline"
              onClick={() => removeFromCart(cartItem.id)}
            >
              Remove
            </p>
          </div>
          <div className="font-spectral text-lg font-bold">{cartItem.name}</div>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="flex gap-3 m-4 font-mono font-bold">
            <h1>Price:</h1>
            <p>NGN {cartItem.price * cartItem.quantity}</p>
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="p-2 bg-brandColor text-3xl text-white">
              <button onClick={() => decreaseQuantity(cartItem.id)}>-</button>
            </div>
            <div className="p-2 text-2xl">{cartItem.quantity}</div>
            <div className="p-2 bg-brandColor text-3xl text-white">
              <button onClick={() => increaseQuantity(cartItem.id)}>+</button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const items = {
    cartItems,
    shippingAddress,
    totalPriceCart,
    totalOrderPrice: total,
  };
  console.log(totalPriceCart);

  const Checkout = async () => {
    try {
      // Assuming the API endpoint to create an order is 'https://example.com/api/orders'
      const response = await fetch(baseUrl + "/order/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      if (response.ok) {
        // Access the response from the API
        const responseData = await response.json();
        console.log("Order created successfully:", responseData);
        const checkout_session_url = responseData.checkout_session_url;
        clearCart();
        toast.success("Order placed successfully!");
        window.location.href = checkout_session_url;
      } else {
        const responseData = await response.json();
        console.log("responseData", responseData);
        // Handle the case where order creation failed
        alert("Failed to place order");
      }
    } catch (error) {
      console.log(cartItems);
      console.error("Error creating order:", error);
      alert("An error occurred while placing the order");
    }
  };
  return (
    <div className="flex m-4 gap-4 h-screen">
      <div className="border w-2/3">
        <h1 className="p-4 border-b text-2xl">Cart ({cartItems.length})</h1>
        {cartItems.length > 0 ? (
          renderCartItems()
        ) : (
          <p className="text-center text-gray-500 shake-animation">
            <a href="/menu">
              Ops, no items in the cart, click here to start adding Yummy Food
            </a>
          </p>
        )}
      </div>
      <div className="border grow h-60 p-5">
        <div className="text-2xl border-b p-4">Cart Summary</div>
        <div className="flex justify-between border-b p-4 font-mono">
          <div className="">Subtotal</div>
          <div>NGN {totalPriceCart}</div>
        </div>
        <div className="flex justify-between border-b p-4 font-mono">
          <div className="">Delivery</div>
          <div>NGN {deliveryFee}</div>
        </div>
        <div className="flex justify-between border-b p-4 font-mono">
          <div className="">Payment Charges(1% fee)</div>
          <div>NGN {paymentCharges}</div>
        </div>
        <div className="flex justify-between border-b p-4 font-mono">
          <div className="">Shipping Address</div>
          <input
            type="text"
            className="border p-2"
            placeholder="Enter your shipping address"
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>
        <div className="text-center p-4">
          <button
            className="p-4 bg-brandColor text-white font-mono font-bold border-none"
            onClick={Checkout}
          >
            CHECKOUT (N {total})
          </button>
        </div>
        <br />
        <br />
        <div className="text-center p-4">
          <button
            className="p-4 bg-brandColor text-white font-mono font-bold border-none"
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCheckout;
