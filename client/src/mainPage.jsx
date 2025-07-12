import './index.css';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      <header className="w-full py-6 px-8 bg-blue-600 text-white shadow-md">
        <h1 className="text-3xl font-bold">Flopkart</h1>
      </header>


      <main className="flex flex-col items-center justify-center mt-16 px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome to Flopkart</h2>
        <p className="text-gray-600 mb-10 text-center max-w-md">
          Choose your role to sign up and get started. Admins manage the platform, users shop freely!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Admin Signup</h3>
            <p className="text-gray-600 mb-6">Create and manage products, users, and orders.</p>
            <Link to="/adminsignup">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl w-full">
                Signup as Admin
              </button>
            </Link>
          </div>

 
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-green-600 mb-4">User Signup</h3>
            <p className="text-gray-600 mb-6">Browse products, add to cart, and place orders.</p>
            <Link to="/usersignup">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl w-full">
                Signup as User
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
