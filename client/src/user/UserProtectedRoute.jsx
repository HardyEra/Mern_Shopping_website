import { Navigate } from "react-router-dom";

function UserProtectedRoute({ children }) {
    let userData = {};

    try {
        userData = JSON.parse(localStorage.getItem('user') || '{}');
    } catch (err) {
        console.error("Corrupted user data in localStorage:", err);
        localStorage.removeItem('user');
        userData = {};
    }

    if (!userData._id) {
        alert('Please Login First!');
        return <Navigate to='/userLogin' />;
    }

    return children;
}

export default UserProtectedRoute;
