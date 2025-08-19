import React from "react";
import { useNavigate } from "react-router-dom";

export const Firstpage = () => {
  const navigate=useNavigate()
  const handlelogin=(e)=>{
      e.preventDefault()
      navigate('/login')
  }
  const handlesignup=(e)=>{
      e.preventDefault()
      navigate('/signup')
  }
  return (

  <div className="flex items-center justify-center w-full bg-gray-800">
  <button className="px-4 py-2 bg-blue-500 rounded" onClick={handlelogin}>Login</button>
  <button className="px-4 py-2 bg-red-500 rounded ml-2" onClick={handlesignup}>Signup</button>
</div>

  );
};



