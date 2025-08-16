import {create} from 'zustand'
import toast from 'toast'
import { axiosinstance } from '../lib/axios.js'


export const useSolution =create((set,get)=>({
     
    solutions:[],
    isliked:false,

    createsol: async(data)=>{
        try{
        const {solutions}=get()
        const newsol=axiosinstance.post("/sol/createsol",data)
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
        const deletesol=axiosinstance.delete("/sol/deletesol",solid)
        toast.success("blog deleted successfully")
        }
        catch(error){
            console.log("error in deleting solution",error)
            toast.error("error in deleting blog")
        }
    }
     
}))