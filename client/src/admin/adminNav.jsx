import '../index.css';
import { useNavigate } from 'react-router-dom';
import parseJwt from '../parseJWT';

function AdminNavbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);
    const initial = decoded?.name.charAt(0).toUpperCase() || '?';

    return (
        <div className="w-full h-20 bg-blue-600 flex items-center justify-between px-8 shadow-md text-white">

            <div className="text-2xl font-bold">Flopkart</div>


            <div className="w-[40%]">
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
                />
            </div>


            <div className="flex items-center gap-6">

                <button
                    onClick={() => navigate('/postProducts')}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow"
                >
                    Sell Now!
                </button>


                <div className="w-10 h-10 bg-white text-blue-600 font-bold flex items-center justify-center rounded-full shadow">
                    {initial}
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;
