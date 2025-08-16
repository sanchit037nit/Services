import React from 'react'
import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import { axiosinstance } from '../lib/axios.js'

export const useAuthstore = create((set,get) => ({

  authUser:null,
  signup: async(data) => {

    try{

        const res=await axiosinstance.post("/auth/signup",data)
        set({authUser:res.data})
        toast.success("signed up successfully")
        
    }
    catch(error){
        toast.error(error.response.data.message)
    }

  },

  login: async(data)=>{
    try{
        const res=await axiosinstance.post("/auth/login",data)
        set({authUser:res.data})

        toast.success("logged in successfully")
    }
    catch(error){
        toast.error(error.response.data.message)
    }
  },

  logout: async() =>{
      try{
         await axiosinstance.post("/auth/logout")
         set({authUser:null})
         toast.success("logged out successfully")
      }
      catch(error){
        toast.error(error.response.data.message)
      }
  },

  checkauth: async() =>{
      try{
         const res=await axiosinstance.get("/auth/check")
         set({authUser:res.data})

      }
      catch(error){
        // toast.error(error.message)
        set({authUser:null})
      }
  },

  deleteaccount: async() =>{
      try{
       const {authUser} = get()
        console.log(authUser)
         await axiosinstance.delete(`/auth/deleteaccount/${authUser._id}`)
         set({authUser:null})

         toast.success("Account deleted successfully")
      }
      catch(error){
        toast.error(error.response.data.message)
      }
  }

}));
