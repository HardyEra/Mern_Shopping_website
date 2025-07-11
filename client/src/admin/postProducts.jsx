import { useState } from "react";
import parseJwt from "../parseJWT";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function PostProducts(){
    const [form,setForm]=useState({
        title:'',
        price:'',
        description:'',
        image:null,
    });
    const admin = JSON.parse(localStorage.getItem('admin')||'{}');
    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    let adminId = null;
    if (decoded?.role === "admin") {
        adminId = decoded.adminId;
    } else {
        console.log("Auth error: Not an admin");
    }

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleFileChange = (e)=>{
        setForm({...form,image:e.target.files[0]});
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        if (!adminId) {
            alert("Admin not logged in.");
            return;
        }
        formData.append('adminId',adminId);
        formData.append('title',form.title);
        formData.append('price',form.price);
        formData.append('description',form.description);
        formData.append('image',form.image);


        try {
            const res = await fetch(`${backendURL}/api/products`, {
            method: 'POST',
            headers:{
                Authorization:`Bearer ${token}`,
            },
            body: formData,
            });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server Error: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        alert("Product uploaded successfully!");
        setForm({ title: '', price: '', description: '', image: null });

        } catch (error) {
        console.error("Upload Error:", error.message);
        alert("Upload failed: " + error.message);
        }



    }
    return(

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Upload New Product
                </h2>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Product Title"
                        required
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Product Price"
                        required
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Product Description"
                        required
                        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                    >
                        Upload Product
                    </button>
                </form>
            </div>
        </div>

    )
}
export default PostProducts;