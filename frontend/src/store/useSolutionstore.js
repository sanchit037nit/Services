import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import { axiosinstance } from '../lib/axios.js'
import { useAuthstore } from './useAuthstore.js'


export const useSolution =create((set,get)=>({
     
    solutions:[],
    bookmarks:[],
  

    createsol: async(data)=>{
        try{
        const {solutions}=get()
        const newsol=axiosinstance.post("/sol/createsol",data)
        console.log(newsol)
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
        const updatesol=axiosinstance.post("/sol/updatesol",data)
        toast.success("blog updated successfully")
        }
        catch(error){
            console.log("error in updating solution",error)
            toast.error("error in updating blog")
        }
    },

    deletesol: async(solid)=>{
        try{
        const deletesol=axiosinstance.delete('/sol/deletesol',solid)
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

             const resp=axiosinstance.get('/auth/users')
             console.log(resp.data)
            //  set({users:resp.data})

            // const {users} =useAuthstore.getState() 
            set((state)=>{
                 bookmarks: state.users.map((user) =>
        user._id === id ? { ...user, bookmarks: updatedbookmarks} : user
            )})
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

     getbookmark: async(id) =>{
        try{
            const res = await axiosinstance.get(`/sol/getbook/${id}`)
            // console.log(res.data.sols)
            set({ bookmarks: [...res.data] })
            // console.log(solutions)
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    },

    handlecomment:async(id,data)=>{
        try {
              await axiosinstance.post(`/sol/comment/${id}`,data)
        } catch (error) {
            console.log("error in coomment",error)
        }
    }
}))