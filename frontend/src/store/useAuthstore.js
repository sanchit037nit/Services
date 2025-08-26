import React from 'react'
import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import { axiosinstance } from '../lib/axios.js'

export const useAuthstore = create((set,get) => ({

  authUser:null,
  isupdatingprofile:false,
    users:[],

    getusers: async()=>{
        try {
             const res=axiosinstance.get('/auth/users')
             console.log(res.data)
             set({users:res.data})
        } catch (error) {
            console.log("error in getting users",error)
        }

    },

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

  updateprofile: async(data) => {

    try{
          set({ isupdatingprofile: true });
        const res=await axiosinstance.post("/auth/update",data)
        // set({authUser:res.data})
        toast.success("Profile updated successfully")
        
    }
    catch(error){
        toast.error(error.response.data.message)
    }
    finally{
      set({ isupdatingprofile: false });
    }
  },

  login: async(data)=>{
    try{
        const res=await axiosinstance.post("/auth/login",data)
      // set((state) => ({ authUser: [...state.authUser, ...res.data] }))
      set((state) => ({ authUser: res.data.user }))

        toast.success("logged in successfully")
    }
    catch(error){
      console.log(error)
        toast.error("error")
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
         console.log(res.data)
        //  set({authUser:res.data})

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
