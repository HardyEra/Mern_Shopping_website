const backendURL = import.meta.env.VITE_BACKEND_URL;
import {useState} from 'react'
import { useEffect } from 'react';
import '../index.css'
import AdminNavbar from './adminNav';
import parseJwt from '../parseJWT';

function AdminDashboard(){

    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    const[admProd,setadmProd]=useState([]);
    const[order,setOrder]=useState([]);
    const ad_id = decoded?.role === 'admin' ? decoded.adminId : null;
    useEffect(()=>{
      if(!ad_id) return;


        const fetchProd = async ()=>{
            const res = await fetch(`${backendURL}/api/products/${ad_id}`,{
              headers:{
                Authorization:`Bearer ${token}`,
              }
              });
            const data =await res.json();
            setadmProd(data);
        }
        fetchProd();
    },[ad_id])
    useEffect(()=>{
      if(!ad_id) return;


        const fetchOrders =async ()=>{
            const res = await fetch(`${backendURL}/api/Orders/${ad_id}`,{
              headers:{
                Authorization:`Bearer ${token}`,
              }
            });

            const data  =await res.json();
            setOrder(data);
        }
        fetchOrders();
    },[ad_id])
    return (
  <div className="min-h-screen bg-gray-100">
    <AdminNavbar />

    <div className="flex flex-col md:flex-row w-full h-full p-4 gap-6">

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