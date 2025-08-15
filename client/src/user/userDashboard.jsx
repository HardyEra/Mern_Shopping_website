const backendURL = import.meta.env.VITE_BACKEND_URL;
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../index.css';
import parseJwt from '../parseJWT';

function UserDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchText, setSearchText] = useState(query);
  const [products, setProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const prodPerPage = 4;

  const token = localStorage.getItem('token');
  const decoded = parseJwt(token);
  const userId = decoded?.role === 'user' ? decoded.id : null;

  useEffect(() => {
    setSearchText(query);
  }, [query]);

  useEffect(() => {
    const fetchProducts = async () => {
          if (!userId) return;
      try {
        let url = '';

        if (query.trim()) {
          url = `${backendURL}/api/search?q=${encodeURIComponent(query)}`;
        } else {
          url = `${backendURL}/api/products`;
        }

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setProducts(data);
          setCurrPage(1);
        } else {
          console.error('Product fetch error:', data);
          setProducts([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setProducts([]);
      }
    };

    if (userId) fetchProducts();
  }, [userId, query]);

  const indexLast = currPage * prodPerPage;
  const indexFirst = indexLast - prodPerPage;
  const visibleProds = products.slice(indexFirst, indexLast);

  const next = () => {
    if (indexLast < products.length) {
      setCurrPage((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currPage > 1) {
      setCurrPage((prev) => prev - 1);
    }
  };

  const handleCart = async (prod) => {
    const res = await fetch(`${backendURL}/api/cartProducts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prodId: prod._id }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Product added to cart');
    } else {
      alert('Failed to add the product, Try Again');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Products
        </h2>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchParams({ q: searchText });
              }
            }}
            placeholder="Search products..."
            className="px-4 py-2 border rounded-l-md w-1/2"
          />

          <button
            onClick={() => setSearchParams({ q: searchText })}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div>
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

            <div className="flex justify-center gap-4 mt-8">
              {currPage > 1 && (
                <button
                  onClick={prev}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Back
                </button>
              )}
              {indexLast < products.length && (
                <button
                  onClick={next}
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg mt-10">No products found.</div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
