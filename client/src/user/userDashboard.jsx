const backendURL = import.meta.env.VITE_BACKEND_URL;
import { useEffect } from 'react';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import '../index.css' 


function UserDashboard(){
    const[prod,setProd]=useState([]);
    const[currPage,setCurrPage]=useState(1);
    const prodperPage = 24;
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        const fetchProds = async()=>{
            const res = await fetch(`${backendURL}/api/products`);

            const data =await res.json();

            setProd(data);
        };
        fetchProds();
    },[]);

    const indexLast = currPage*prodperPage;
    const indexFirst = indexLast-prodperPage;
    const visibleProds = prod.slice(indexFirst,indexLast);

    const next = ()=>{
        if(indexLast<prod.length){
            setCurrPage(prev => prev+1);
        }
    };
    const handleCart =async(prod)=>{
        const res = await fetch(`${backendURL}/api/cartProducts`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({userId:user._id, prodId:prod._id, title:prod.title, price:prod.price, description:prod.description}),
        })
        const data = await res.json();
        if(res.ok){
            alert("Product added to cart");
            console.log({message:data.message});
        }else{
            alert("Failed to add the product, Try Again");
        }

    }

    return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />

    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Products
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProds.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {item.title}
            </h3>
            <p className="text-blue-600 font-medium mb-1">₹{item.price}</p>
            <p className="text-gray-500 text-sm mb-4 text-center">
              {item.description}
            </p>
            <button
              onClick={() => handleCart(item)}
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {indexLast < prod.length && (
          <button
            onClick={next}
            className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  </div>
);

}
export default UserDashboard;