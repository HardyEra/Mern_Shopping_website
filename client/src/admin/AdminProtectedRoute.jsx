import { Navigate } from "react-router-dom";
import parseJwt from "../parseJWT";


function AdminProtectedRoute ({children}){

    const token = localStorage.getItem('token');
    const decoded = parseJwt(token);

    if(!decoded || decoded.role !== 'admin'){
        alert('Please Login correctly First!');
        return <Navigate to='/adminLogin'/>;
    }else{
        return children;
    }

}
export default AdminProtectedRoute;