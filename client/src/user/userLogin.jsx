import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

const backendURL = import.meta.env.VITE_BACKEND_URL;

function UserLogin() {
    const [form, setForm] = useState({ email: '', password: '' });
    const[loading,setLoading]=useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const info = await fetch(`${backendURL}/api/userlogin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await info.json();

            if (info.ok) {
                alert("Login Successful!");
                localStorage.setItem('token', data.token );
                navigate('/userDashboard');
            } else {
                alert(data.message || "Login failed.");
            }

        } catch (err) {
            console.log("Error while fetching:", err);
            alert("Failed to get details. Try again!");
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">User Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading? "Please wait":"Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserLogin;
