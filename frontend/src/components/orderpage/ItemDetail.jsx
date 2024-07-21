import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "@/components/cart/CartContext";
// import rice from "./assets/rice.png";
import { toast } from "react-toastify";
import baseUrl from "@/index";

const ItemDetailPage = () => {
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

  useEffect(() => {
    fetch(`${baseUrl}/menu_item/${itemId}`) // Use the correct API endpoint for fetching an individual item
      .then((response) => response.json())
      .then((data) => {
        setItem(data.menu_item); // Set the fetched item data
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [itemId]);

  const totalPrice = item ? quantity * item.price : 0;
  const deliveryFee = 300;
  const total = totalPriceCart + deliveryFee;

  const renderCartItems = () => {
    return cartItems.map((cartItem) => (
      <div key={cartItem.id} className="border-b flex justify-between">
        <div className="flex m-4 items-center gap-3">
          <div>
            <img src={cartItem.image} alt={cartItem.name} width={200} />
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
    totalOrderPrice: total,
  };

  const Checkout = async () => {
    try {
      // Assuming the API endpoint to create an order is 'https://example.com/api/orders'
      const response = await fetch("http://0.0.0.0:5000/api/v1/order/", {
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
        console.log("Order Id", responseData.order.id);
        clearCart(); // Assuming clearCart is a function that clears the cart
        toast.success("Order placed successfully!");
      } else {
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
    <div className="flex m-4 gap-4">
      <div className="border w-2/3">
        <h1 className="p-4 border-b text-2xl">Cart ({cartItems.length})</h1>
        {cartItems.length > 0 ? (
          renderCartItems()
        ) : (
          <p className="text-center text-gray-500">No items in the cart</p>
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
          <div>NGN 300</div>
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

export default ItemDetailPage;
