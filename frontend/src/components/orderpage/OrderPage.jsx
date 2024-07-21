import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "@/index";

function OrderPage() {
  const { str } = useParams();
  console.log("baseURL before", baseUrl);
  const baseURL = baseUrl;
  console.log("baseURL after", baseUrl);

  // Send the extracted ID to the backend as a GET request
  useEffect(() => {
    // Make a GET request to your backend with the extracted ID
    fetch(`${baseURL}/order/success/${str}`)
      .then((response) => response.json())
      .then((data) => {
        alert("Order confirmed Payment Successful!");
        // Handle the response from the backend
        console.log("Backend response:", data);
      })
      .catch((error) => {
        // Handle any errors during the request
        console.error("Error:", error);
      });
  }, [str]);
  return (
    <div className="flex justify-center items-center max-w-screen ml-10 mr-10 gap-5 h-screen">
      <div>
        <div className="max-w-lg">
          <h1 className="text-7xl font-karla tracking-tighter">
            Order Confirmed
          </h1>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
