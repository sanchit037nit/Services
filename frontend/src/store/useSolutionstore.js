import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import { axiosinstance } from '../lib/axios.js'


export const useSolution =create((set,get)=>({
     
    solutions:[],
    likess:0,

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
    
    inclikes:async(id)=>{
         try{
            const res = await axiosinstance.get(`/sol/like/${id}`)
            // console.log(res.data.sols)
            set({ likess: res.data })
            // console.log(solutions)
        }
        catch(error){
            toast.error(error.response.data.message)
        }
    }
}))