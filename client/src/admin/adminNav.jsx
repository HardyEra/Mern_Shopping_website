import '../index.css'
import { useNavigate } from 'react-router-dom';



function AdminNavbar(){
    const navigate = useNavigate();
        const admin = JSON.parse(localStorage.getItem('admin') || '{}');
    return(
        <div className='flex w-[100vw] h-[10vw] bg-blue-600 justify-between text-white'>
            <div className='w-[20vw] h-[100%]'>
                <h1>Flopkart</h1>
            </div>
            <div className='w-[60vw]'>
                search bar
            </div>
            <div className='w-[20vw] h-[100%]'>
                <div className='w-[10vw] h-[10vw]'>
                    <button onClick={()=>navigate('/postProducts')}>Sell Now!</button>
                </div>
                <div className='w-[10vw] h-[10vw]'>
                    <div className='w-[10vw] h-[10vw] rounded-full'>
                        <h3>{admin.username.charAt[0]}</h3>
                    </div>

                </div>
            </div>
            
        </div>
    )

}

export default AdminNavbar;