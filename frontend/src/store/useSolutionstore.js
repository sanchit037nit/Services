import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import { axiosinstance } from '../lib/axios.js'
import { useAuthstore } from './useAuthstore.js'


export const useSolution =create((set,get)=>({
     
    solutions:[],
    bookmarks:[],
    user:[],
    mysols:[],
  

    createsol: async(data)=>{
        try{
        const {solutions}=get()
        const newsol= await axiosinstance.post("/sol/createsol",data)
        // console.log(newsol)
        set({solutions:[...solutions,newsol.data]})
        toast.success("blog posted successfully")
        }
        catch(error){
            console.log("error in posting solution",error)
            toast.error("error in creating blog")
        }
    },

    updatesol: async(data)=>{
        try{
        const updatesol=await axiosinstance.post("/sol/updatesol",data)
        toast.success("blog updated successfully")
        }
        catch(error){
            console.log("error in updating solution",error)
            toast.error("error in updating blog")
        }
    },

    deletesol: async(id)=>{
        try{
        const deletesol=await axiosinstance.delete(`/sol/deletesol/${id}`)
           set((state) => ({
      solutions: state.solutions.filter((post) => post._id !== id)
    }));
           set((state) => ({
      mysols: state.mysols.filter((post) => post._id !== id)
    }));
           set((state) => ({
      bookmarks: state.bookmarks.filter((post) => post._id !== id)
    }));
        toast.success("blog deleted successfully")
        }
        catch(error){
            console.log("error in deleting solution",error)
            toast.error("error in deleting blog")
        }
    },

    getsol: async() =>{
        try{
            const res = await axiosinstance.get(`/sol/get`)
            // console.log(res.data.sols)
            set({ solutions: [...res.data.sols] })
            // console.log(solutions)
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    getmysol: async() =>{
        try{
            const res = await axiosinstance.get(`/sol/getsolbyid`)
            console.log(res.data)
            set({ mysols: res.data.sols })
            // console.log(solutions)
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    getusers: async() =>{
        try{
            const res = await axiosinstance.get(`/auth/get`)
            // console.log(res.data.sols)
            set({ users: [...res.data.users] })
            // console.log(solutions)
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },
    
    inclikes:async(id)=>{
         try{
            const res = await axiosinstance.get(`/sol/like/${id}`)
                const updatedLikedBy = res.data; 

    set((state) => ({
      solutions: state.solutions.map((post) =>
        post._id === id ? { ...post, likes: updatedLikedBy } : post
      )}))

        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    bookmark:async(id)=>{
         try{
            const res = await axiosinstance.post(`/sol/bookmark/${id}`)
            const updatedbookmarks=res.data

            const userss=axiosinstance.get('/auth/users')
             console.log(userss.data)
             set({users:userss.data})
             
            set((state)=>{
                 bookmarks: state.users.map((user) =>
        user._id === id ? { ...user, bookmarks: updatedbookmarks} : user
            )})
        }
        catch(error){
            console.log(error)
            // toast.error(error.response.data.message)
        }
    },

     getbookmark: async() =>{
        try{
            const res = await axiosinstance.get(`/sol/getbook`)
            // console.log(res.data)
            set({ bookmarks:res.data.bookmarks })
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    handlecomment:async(id,text)=>{
        try {
            // console.log(text)
              await axiosinstance.post(`/sol/comment/${id}`,{text})
        } catch (error) {
            console.log("error in coomment",error)
        }
    }
}))