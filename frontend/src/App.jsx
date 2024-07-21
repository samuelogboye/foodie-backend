import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "@/components/shared/NavBar";
import Hero from "@/components/shared/Hero";
import Footer from "@/components/shared/Footer";
import Menu from "@/components/menu/Menu";
import MenuCard from "@/components/menu/MenuCard";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Profile from "@/components/profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ItemDetailPage from "./ItemDetail";
import { CartProvider } from "@/components/cart/CartContext";
import { AuthProvider, useAuth } from "@/components/auth/AuthContext";
// import CartModal from "./CartModal";
import ItemCheckout from "@/components/cart/Checkout";
import AuthVerify from "@/Auth/AuthVerify";
import useLogout from "@/Auth/useLogout";
import OrderPage from "@/components/orderpage/OrderPage";

function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  console.log("isLoggedIn App", " " + isLoggedIn);
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

function RequireNotAuth({ children }) {
  const { isLoggedIn } = useAuth();
  console.log("isLoggedIn Req Not App" + " " + isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/menu" />;
  }

  return children;
}
function App() {
  const logOut = useLogout();
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <CartProvider>
            <Navbar />
            <Routes>
              <Route
                path="/register"
                element={
                  <RequireNotAuth>
                    <Register />
                  </RequireNotAuth>
                }
              />
              <Route
                path="/login"
                element={
                  <RequireNotAuth>
                    <Login />
                  </RequireNotAuth>
                }
              />
              <Route path="/hero" element={<Hero />} />
              <Route path="/" element={<Hero />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menucard" element={<MenuCard />} />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/cart"
                element={
                  <RequireAuth>
                    <ItemCheckout />
                  </RequireAuth>
                }
              />
              <Route path="/success/:str" element={<OrderPage />} />
            </Routes>
            <Footer />
          </CartProvider>
          <ToastContainer />
          <AuthVerify logOut={logOut} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
