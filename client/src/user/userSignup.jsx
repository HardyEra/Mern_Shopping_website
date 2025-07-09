const backendURL = import.meta.env.VITE_BACKEND_URL;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserSignup(){
    const [form,setForm]=useState({username:'',email:'',password:''});
    const navigate = useNavigate();
    const handleChange =(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const res = await fetch(`${backendURL}/api/userSignup`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(form),
        })

        const data = await res.json();

        if(res.ok){
            alert('Account created Successfully!');
            navigate('/userLogin');
        }
        else{
            console.log({message:data.message});
            alert('Failed to create an Account');
        }
        
    }

    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={form.username}
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
);

}

export default UserSignup;