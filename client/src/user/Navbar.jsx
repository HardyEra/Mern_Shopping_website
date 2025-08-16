import { useEffect, useState } from 'react';
import '../index.css';
import parseJwt from '../parseJWT';
import {Link, useNavigate} from 'react-router-dom';
const backendURL = import.meta.env.VITE_BACKEND_URL;
function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    const [cartProd,setCartProd] = useState([]);
    const[click,setClick]=useState(false);
    useEffect(()=>{
        const fetchNumberofProd = async ()=>{
            const res = await fetch(`${backendURL}/api/cartProd`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            const data = await res.json();
            setCartProd(data);
        }
        fetchNumberofProd();
    },[])
    const handleLog=()=>{
        setClick(prev=>!prev);
    };
    const logOut =()=>{
        localStorage.clear();
        navigate('/userLogin');
    }

    return (
        <div className="w-full px-8 py-4 bg-blue-600 text-white flex items-center justify-between shadow-md">
            <Link to='/userDashboard'>
                <div className="text-2xl font-bold tracking-wide">
                    Flopkart
                </div>
            </Link>
            

            <div className="flex-1 mx-6">
                
            </div>

            <div className="flex items-center space-x-6 ">
            <Link to='/userCart'>
                <button className="relative cursor-pointer">
                    🛒
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ">
                        {cartProd.length}
                    </span>
                </button>
            </Link>

                <div className="relative text-lg font-medium cursor-pointer group">
                    <div
                        className="bg-blue-700 px-3 py-2 rounded"
                        onClick={handleLog}
                    >
                        Hello, {decoded?.name || 'Guest'}!
                    </div>

                    {click && (
                        <div className="absolute right-0 mt-2 bg-orange-600 text-white rounded shadow-lg z-50">
                        <button
                            onClick={logOut}
                            className="block w-full px-4 py-2 text-left hover:bg-orange-700"
                        >
                            Log Out
                        </button>
                        </div>
                    )}
                </div>

                

            </div>
        </div>
    );
}

export default Navbar;
