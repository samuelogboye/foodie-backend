// CartModal.js
import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const CartModal = ({ handleClose }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    addToCart(updatedCartItems);
  };

  const clearCart = () => {
    //addToCart([]); // Clear the cart by setting an empty array
    localStorage.removeItem("cartItems");
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    addToCart(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    addToCart(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const createStripeSession = async () => {
    try {
      // Make a request to create a Stripe session
      const response = await fetch("www.mywebsite/create-strip-session", {
        method: "POST",
        // Add necessary headers and body if required
      });
      if (response.ok) {
        // Handle success if needed
        console.log("Stripe session created successfully");
      } else {
        // Handle error scenarios
        console.error("Failed to create Stripe session");
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };

  const handleCheckout = () => {
    clearCart(); // Clear the cart on checkout
    //createStripeSession(); // Call the endpoint to create a Stripe session
  };

  return (
    <div className="flex gap-3 m-3 ">
      <div className="mt-4 w-2/3 flex flex-col">
        <div className="border h-48  ">
          <h1 className="border-b text-brandColor p-4 font-mono font-bold text-xl">
            Customer Address
          </h1>
          <p className="p-3 h-1/2">4th Floor ITF Building, Lagos</p>
        </div>
      </div>
      <div className="flex grow flex-col border mt-4">
        <div className="border-b  text-brandColor p-4 font-mono font-bold text-xl">
          Order Summary
        </div>
        <div className="flex border-b justify-between p-8 font-mono ">
          <div className="flex flex-col gap-4">
            <div>Items</div>
            <div>Delivery</div>
          </div>
          <div className="flex flex-col gap-4">
            <div>N2000</div>
            <div>N500</div>
          </div>
        </div>
        <div className="border-b flex justify-between pt-4 pb-4 font-bold">
          <div>Total</div>
          <div>N2500</div>
        </div>
        <div className="p-2">
          <button className="w-full bg-brandColor hover:bg-slate-400 text-white font-bold py-2 px-4 rounded-full">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
