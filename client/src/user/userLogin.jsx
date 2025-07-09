import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

function UserLogin(){
    const [form,setForm] = useState({email:'',password:''});
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
    try{
        const info = await fetch('api/userlogin',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(form),
        })
        const data = await info.json();

        if(info.ok){
            alert("Login Successfull!");
            localStorage.setItem('user',JSON.stringify(data.user));
            navigate('/userDashboard');
        }else{
            alert("Error");
        }

    }catch(err){
        console.log("Error while fetching:",err);
        alert("Failed to get details. Try again!");
    }
        
    }

    return(

        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name='email' onChange={handleChange} value={form.email} placeholder='Email' required/>
                    <input name='password' type="password" onChange={handleChange} value={form.password} placeholder='Password' required/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
export default UserLogin;