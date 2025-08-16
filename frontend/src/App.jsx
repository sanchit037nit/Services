import { useState, useCallback, useEffect, useRef } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import { Signuppage } from './pages/Signuppage'
import { Toaster } from 'react-hot-toast'
import { Loginpage } from './pages/Loginpage'
import { Firstpage } from './pages/Firstpage'
import  {Homepage}  from './pages/Homepage'
import Uploadpage from './pages/Uploadpage.jsx'
import Aipage from './pages/Aipage.jsx'
import './App.css'
import { useAuthstore } from './store/useAuthstore.js'



const App=()=>{
  const { authUser ,checkauth} = useAuthstore()

  // useEffect(()=>{
  //   checkauth()
  // },[checkauth]);

    // console.log( authUser)
  return (
    <div>
    <Routes>
      <Route path="/" element={<Firstpage />} />
      <Route path="/signup" element={!authUser ?<Signuppage /> : <Navigate to="/Homepage" />} />
      <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/Homepage" />} />
      <Route path="/Homepage" element={authUser ? <Homepage /> : <Navigate to="/" />} />
      <Route path="/upload" element={authUser ? <Uploadpage /> : <Navigate to="/" />} />
      <Route path="/aipage" element={authUser ? <Aipage /> : <Navigate to="/" />} />
   
    </Routes>

    <Toaster />
    </div>
  )
}

export default App