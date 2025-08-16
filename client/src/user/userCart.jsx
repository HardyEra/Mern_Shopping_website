const backendURL = import.meta.env.VITE_BACKEND_URL;
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import '../index.css'
import parseJwt from "../parseJWT";

function UserCart(){

    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    const userId = decoded?.role==='user'? decoded.id : null;

    const [prod,setProd]=useState([]);
    useEffect(()=>{
        const fetchCartProd =async ()=>{
            const res = await fetch(`${backendURL}/api/cartProd`,{
              headers:{
                Authorization:`Bearer ${token}`,
              }
            });

            const data = await res.json();

            setProd(data);
        }
        fetchCartProd();
    },[])

const handleBuy = async (item) => {
  const prodId = item.prodId || item._id || item.id;
  if (!prodId) {
    console.error("No product ID found for:", item);
    return alert("Failed to process product");
  }

  try {
    const res = await fetch(`${backendURL}/api/Orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prodId }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Order failed:", errorText);
      return alert("Failed to buy product");
    }

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Error processing order");
  }
};


    return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="w-full flex justify-center py-10">
      <div className="w-[90%] md:w-[80%] grid gap-6">
        {prod.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">No products in cart</div>
        ) : (
          prod.map((item) => (
            <div
              key={item.prodId}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all w-full md:w-[60vw] mx-auto"
            >
              <h1 className="text-2xl font-semibold text-gray-800">{item.title}</h1>
              <h3 className="text-lg text-green-600 font-medium">₹ {item.price}</h3>
              <p className="text-gray-600 my-2">{item.description}</p>
              <button
                onClick={() => handleBuy(item)}
                className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Buy Now!
              </button>
            </div>
          ))
        )}
      </div>
    </div>

    {prod.length > 0 && (
      <div className="w-full flex justify-center mb-10">
        <button
          onClick={() => handleBuy(prod)}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-2xl shadow-md"
        >
          Buy All
        </button>
      </div>
    )}
  </div>
);


}
export default UserCart;