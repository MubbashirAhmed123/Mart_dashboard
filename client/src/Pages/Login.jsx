import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdTableChart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate=useNavigate()
   const[userData,setUserData]=useState({
    email:'',
    password:''
   })

   const [showPassword, setShowPassword] = useState(false);


   const handleChange=(e)=>{
    const{name,value}=e.target
    setUserData({...userData,[name]:value})
   }

   const handlePassword=(e)=>{
    setShowPassword(!showPassword)

   }

   const handleSubmit=async(e)=>{
    e.preventDefault()
    const{email,password}=userData
    if(!email && !password){
      toast.error('All fields are required.')
      return
    }
 
    

    try {
      const res=await fetch('http://localhost:3001/login',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(userData)
      })
      if(res.ok){
        const data = await res.json();
        localStorage.setItem('token', data.token);
        toast.success(data.msg)
        navigate('/dashboard')
      }else {
        const errorData = await res.json();
        toast.error(errorData.msg || 'Login failed');
      }
  
    } catch (error) {
      toast.error( 'Login failed');
    }

   }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center items-center gap-3 mb-6">
          <MdTableChart size={20} color='purple'/> TableSprint
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to TableSprint Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email-id</label>
            <input type="email" className="w-full px-3 py-2 border  rounded border-black outline-none focus:border-0 focus:ring" name='email' value={userData.email} onChange={handleChange} />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input type={showPassword?"text":"password" }className="w-full px-3 py-2 border  rounded border-black outline-none focus:border-0 focus:ring" name='password' onChange={handleChange} value={userData.password} />
            {showPassword?<FaEye className='absolute right-2 top-9' onClick={handlePassword}/>:
            <FaEyeSlash className='absolute right-2 top-9' onClick={handlePassword}/>}
          </div>
          <div className="flex justify-end items-center mb-6">
            <Link className='text-purple-500' to='/forget-password'> Forget Password?</Link>
          </div>
          <button type='submit' className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 focus:ring focus:ring-purple-600 transition ">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
