import React, { useContext, useState } from "react";
import logo from "./assets/logo.svg";
import user from "./assets/user.svg";
import shopping from "./assets/shopping.svg";
import { CartContext } from "./CartContext";
import CartModal from "./CartModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { handleLogout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [showCartModal, setShowCartModal] = useState(false);

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };
  return (
    <nav className="bg-white shadow flex p-3 justify-between">
      <Link to="/hero">
        <img src={logo} alt="logo-pix" width={50} />
      </Link>
      <ul className="flex justify-around gap-10 text-2xl items-center">
        <li>
          <Link className="hover:text-brandColor font-mono" to="/hero">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:text-brandColor font-mono" to="#">
            About
          </Link>
        </li>
        <li>
          <Link className="hover:text-brandColor font-mono" to="/menu">
            Menu
          </Link>
        </li>
        <li>
          <Link className="hover:text-brandColor font-mono" to="#">
            Contact
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link className="hover:text-brandColor font-mono" to="/profile">
              Profile
            </Link>
          </li>
        )}
      </ul>
      {isLoggedIn && (
        <div className="flex gap-8">
          <Link to="/cart">
            <img
              className="text-brandColor"
              src={shopping}
              alt="cart"
              width={40}
            />
          </Link>
          <div className="cart">
            <Link to="/cart">
              <span className="fa fa-shopping-cart my-cart-icon">
                <span className="badge badge-notify my-cart-badge">
                  ({cartItems.length})
                </span>
              </span>
            </Link>
          </div>
          <button className="logout" onClick={handleLogout}>
            <h5>Logout</h5>
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex gap-8">
          <Link to="/register">
            <img src={user} alt="register" width={40} />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
