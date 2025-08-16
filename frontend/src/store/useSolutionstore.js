import {create} from 'zustand'
import toast from 'toast'
import { axiosinstance } from '../lib/axios.js'


export const useSolution =create((set,get)=>({
     
    solutions:[],

    createsol: async(data)=>{

        const {solutions}=get()
        const newsol=axiosinstance.post("/sol/createsol",data)
        set({solutions:[...solutions,newsol.data]})
        toast.success("blog posted successfully")
    }
     
}))