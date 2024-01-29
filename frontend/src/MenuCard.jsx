import React from "react";
import rice from "./assets/swallo.png";

function MenuCard() {
  return (
    <div className>
      <h1 className="text-center font-spectral text-2xl font-bold p-5">RICE</h1>
      <div className="flex justify-around mb-10">
        <div className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer">
          <img
            className="min-w-full h-4/5 p-3 rounded-t-md"
            src={rice}
            alt="rice"
          />
          <h3 className="text-brandColor text-center pt-4 pb-4 font-bold font-mono p-1 ">
            Jollof Rice
          </h3>
          <div className="flex justify-between p-3 m-2 bg-brandColor text-white rounded-md ">
            <div>Select Deal</div>
            <div>NGN 800</div>
          </div>
        </div>
        <div className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer">
          <img
            className="min-w-full h-4/5 p-3 rounded-t-md"
            src={rice}
            alt="rice"
          />
          <h3 className="text-brandColor text-center pt-4 pb-4 font-bold font-mono p-1 ">
            Jollof Rice
          </h3>
          <div className="flex justify-between p-3 m-2 bg-brandColor text-white rounded-md ">
            <div>Select Deal</div>
            <div>NGN 800</div>
          </div>
        </div>
        <div className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer">
          <img
            className="min-w-full h-4/5 p-3 rounded-t-md"
            src={rice}
            alt="rice"
          />
          <h3 className="text-brandColor text-center pt-4 pb-4 font-bold font-mono p-1 ">
            Jollof Rice
          </h3>
          <div className="flex justify-between p-3 m-2 bg-brandColor text-white rounded-md ">
            <div>Select Deal</div>
            <div>NGN 800</div>
          </div>
        </div>
        <div className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer">
          <img
            className="min-w-full h-4/5 p-3 rounded-t-md"
            src={rice}
            alt="rice"
          />
          <h3 className="text-brandColor text-center pt-4 pb-4 font-bold font-mono p-1 ">
            Jollof Rice
          </h3>
          <div className="flex justify-between p-3 m-2 bg-brandColor text-white rounded-md ">
            <div>Select Deal</div>
            <div>NGN 800</div>
          </div>
        </div>
        <div className="flex flex-col border shadow hover:shadow-2xl rounded-md hover:cursor-pointer">
          <img
            className="min-w-full h-4/5 p-3 rounded-t-md"
            src={rice}
            alt="rice"
          />
          <h3 className="text-brandColor text-center pt-4 pb-4 font-bold font-mono p-1 ">
            Jollof Rice
          </h3>
          <div className="flex justify-between p-3 m-2 bg-brandColor text-white rounded-md ">
            <div>Select Deal</div>
            <div>NGN 800</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
