import React, { useContext, useState, useEffect } from "react";
import Navbar from "./NavBar";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

import baseUrl from "./base";

function Menu() {
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useAuth();
  const navigateTo = useNavigate();

  const handleAddToCart = (item, quantity) => {
    if (!isLoggedIn) {
      // Redirect to login page if the user is not logged in
      navigateTo("/login");
      return;
    }
    if (!item || !quantity) return;
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: quantity,
      image_url: item.image_url,
      total: quantity * item.price,
    };
    const total = quantity * item.price;
    addToCart(newItem);
    console.log(
      `Added ${quantity} ${item.name} to cart. Total price: ${total}`
    );
  };

  useEffect(() => {
    fetch(baseUrl + "/menu_category/")
      .then((response) => response.json())
      .then((data) => {
        setMenuCategories(data.menu_categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const getCategoryItems = () => {
    const category = menuCategories.find(
      (category) => category.name === selectedCategory
    );
    return category ? category.menu_items : [];
  };

  return (
    <div className="mx-auto p-10 gap-8 h-screen">
      {/* Render categories */}
      <div className="flex justify-around">
        {menuCategories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              className="min-w-full h-32 rounded-t-md"
              src={category.menu_items[0]?.image_url}
              alt={category.name}
            />
            <h3 className="text-brandColor text-center font-bold font-mono p-1">
              {category.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Render items based on selected category */}
      {selectedCategory && (
        <div className="grid grid-cols-5 gap-8 mt-8">
          {getCategoryItems().length > 0 ? (
            getCategoryItems().map((item, index) => (
              <div
                key={index}
                className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer"
              >
                <img
                  className="min-w-full h-32 rounded-t-md"
                  src={item.image_url}
                  alt={item.name}
                />
                <h3 className="text-brandColor text-center font-bold font-mono p-1">
                  {item.name}
                </h3>
                <div className="flex justify-between p-3 m-2 bg-brandColor text-white rounded-md">
                  <div>
                    <button
                      className="btn btn-danger my-cart-btn my-cart-b"
                      onClick={() => handleAddToCart(item, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div>{`NGN ${item.price}`}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No food items here, kindly check back, but for now, check other
              yummy categories
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
