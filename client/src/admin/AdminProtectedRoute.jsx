import { Navigate } from "react-router-dom";


function AdminProtectedRoute ({children}){
    const adminData = JSON.parse(localStorage.getItem('admin')|| '{}');
    if(!adminData._id){
        alert('Please Login First!');
        return <Navigate to='/adminLogin'/>;
    }else{
        return children;
    }

}
export default AdminProtectedRoute;