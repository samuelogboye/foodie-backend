// CartContext.js
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    // if item exist do nothing and return
    if (existingItem) {
      toast.error("Item already in cart");
    } else {
      toast.success(`1 plate of ${item.name} added to cart`);
      //Send an alert asking if the user want to go to cart or stay to shop more. If yes, go to cart. If no, stay on the same page.
      const confirmAddToCart = window.confirm(
        `Do you want to go to cart or stay to shop more?`
      );
      if (confirmAddToCart) {
        setCartItems([...cartItems, item]);
        // Navigate to /cart
        navigate("/cart");
      } else {
        // Stay on the same page
        setCartItems([...cartItems, item]);
      }
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: item.quantity + 1,
            total: (item.quantity + 1) * item.price,
          }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
            total: (item.quantity + 1) * item.price,
          }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPriceCart = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalQuantity,
    totalPriceCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
