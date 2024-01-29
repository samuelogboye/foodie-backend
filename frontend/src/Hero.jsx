import React from "react";
import heroImg from "./assets/heroImg.png";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

function Hero() {
  const { isLoggedIn } = useAuth();
  const orderLink = isLoggedIn ? "/menu" : "/login";

  return (
    <div className="flex justify-center items-center max-w-screen ml-10 mr-10 gap-5 h-screen">
      <div>
        <img src={heroImg} alt="hero-pix" />
      </div>
      <div>
        <div className="max-w-lg">
          <h1 className="text-7xl font-karla tracking-tighter">
            Healthy <span className="text-brandColor">Food</span> Wealthy{" "}
            <span className="text-brandColor">Lifestyle</span>
          </h1>
          <p className="text-md mt-9 font-spectral">
            Discover culinary excellence at Foodie and explore a diverse menu,
            from hearty meals to fresh salads and delightful desserts, all with
            seamless online ordering and swift delivery.
          </p>
        </div>
        <div className="mt-9">
          <Link to={orderLink}>
            <button className="bg-brandColor hover:bg-slate-400 text-white font-bold py-2 px-4 rounded-full">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
