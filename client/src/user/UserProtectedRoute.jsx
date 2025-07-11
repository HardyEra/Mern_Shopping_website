import { Navigate } from "react-router-dom";
import parseJwt from "../parseJWT";

function UserProtectedRoute({ children }) {
    let userData = {};

    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);

    if (!decoded || decoded.role !== 'user') {
        alert('Please Login First!');
        return <Navigate to='/userLogin' />;
    }

    return children;
}

export default UserProtectedRoute;
