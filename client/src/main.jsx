import  React  from 'react'
import  ReactDOM  from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserDashboard from './user/userDashboard.jsx'
import UserProtectedRoute from './user/UserProtectedRoute.jsx';
import AdminDashboard from './admin/adminDashboard.jsx';
import UserLogin from './user/userLogin.jsx';
import AdminLogin from './admin/adminLogin.jsx';
import AdminProtectedRoute from './admin/AdminProtectedRoute.jsx';
import PostProducts from './admin/postProducts.jsx';
import UserSignup from './user/userSignup.jsx';
import AdminSignup from './admin/adminSignup.jsx';
import UserCart from './user/userCart.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/userSignup" element={<UserSignup/>} />
      <Route path="/adminSignup" element={<AdminSignup/>} />
      <Route path="/userLogin" element={<UserLogin/>}/>
      <Route path="/adminLogin" element={<AdminLogin/>}/>
      <Route path="/userDashboard" element={<UserProtectedRoute><UserDashboard/></UserProtectedRoute>} />
      <Route path="/adminDashboard" element={<AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>}/>
      <Route path="/postProducts" element={<AdminProtectedRoute><PostProducts/></AdminProtectedRoute>} />
      <Route path='/userCart' element={<UserProtectedRoute><UserCart/></UserProtectedRoute>} />
    </Routes>
  </BrowserRouter>,
);
