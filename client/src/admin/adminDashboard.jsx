import {useState} from 'react'
import { useEffect } from 'react';
import '../index.css'
import AdminNavbar from './adminNav';

function AdminDashboard(){
    const admin = JSON.parse(localStorage.getItem('admin'||{}));
    const[admProd,setadmProd]=useState([]);
    const[order,setOrder]=useState([]);
    const ad_id = admin._id;
    useEffect(()=>{
        const fetchProd = async ()=>{
            const res = await fetch(`api/products/${ad_id}`);
            const data =await res.json();
            setadmProd(data);
        }
        fetchProd();
    },[])
    useEffect(()=>{
        const fetchOrders =async ()=>{
            const res = await fetch(`api/Orders/${ad_id}`);

            const data  =await res.json();
            setOrder(data);
        }
        fetchOrders();
    })
    return (
  <div className="min-h-screen bg-gray-100">
    <AdminNavbar />

    <div className="flex flex-col md:flex-row w-full h-full p-4 gap-6">
      {/* Admin Products */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Products</h2>
        {admProd.length === 0 ? (
          <p className="text-gray-500">No products uploaded yet.</p>
        ) : (
          admProd.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-blue-600">{item.title}</h3>
              <p className="text-sm text-gray-700">₹{item.price}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Orders */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Orders Received</h2>
        {order.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          order.map((odr) => (
            <div
              key={odr._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-green-600">{odr.title}</h3>
              <p className="text-sm text-gray-700">₹{odr.price}</p>
              <p className="text-sm text-gray-500">{odr.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);

}
export default AdminDashboard;