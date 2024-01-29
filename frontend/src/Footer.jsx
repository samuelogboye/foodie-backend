import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center bg-slate-400 text-white">
      <div className="flex justify-between gap-9 p-9 min-w-full items-center">
        <div>
          <p className="m-3">Hours:</p>
          <p className="m-3">Mon - Fri: 8:00am - 10:00pm</p>
          <p className="m-3">Sat - Sun: 9:00am - 9:00pm</p>
        </div>
        <div>
          <p className="m-3">Address:</p>
          <p className="m-3">4th Floor, ITF Building</p>
          <p className="m-3">Funsho Williams, Lagos</p>
        </div>
        <div className="max-w-sm">
          <p className="m-4">
            "The best restaurant I've been to! And that's saying a lot, since
            I've been to many!"
          </p>
          <p className="m-4">
            "Amazing food! Great service! Couldn't ask for more! I'll be back
            again and again!"
          </p>
        </div>
      </div>
      <div>
        <h3 className="m-5">&copy;Copyright Foodies App Restaurants 2023</h3>
      </div>
    </footer>
  );
}

export default Footer;
