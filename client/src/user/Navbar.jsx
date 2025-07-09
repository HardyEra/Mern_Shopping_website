import '../index.css';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="w-full px-8 py-4 bg-blue-600 text-white flex items-center justify-between shadow-md">
            <div className="text-2xl font-bold tracking-wide">
                Flopkart
            </div>

            <div className="flex-1 mx-6">
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
                />
            </div>

            <div className="flex items-center space-x-6">
                <button className="relative">
                    🛒
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        2
                    </span>
                </button>

                <div className="text-lg font-medium">
                    Hello, {user.username || 'Guest'}!
                </div>
            </div>
        </div>
    );
}

export default Navbar;
