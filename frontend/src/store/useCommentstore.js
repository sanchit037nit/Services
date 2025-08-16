import React from 'react'
import {create} from 'zustand'
import toast from 'toast'
import { axiosinstance } from '../lib/axios.js'

export const  useComment= create((set,get) =>({

    comments:[],

    createcom:async(data)=>{
        try{

          const {comments}=get()
          const newcom= axiosinstance.post("/com/createcom",data)
          set({comments:[...comments,newcom.data]})
          toast.success("comment added")
        }
        catch(error){
            console.log("error in creating comment",error)
            toast.error("comment not created")
        }
    },
    
        updatecom: async(data)=>{
            try{
            const updatesol=axiosinstance.post("/com/updatecom",data)
            toast.success("comment updated successfully")
            }
            catch(error){
                console.log("error in updating comment",error)
                toast.error("error in updating comment")
            }
        },

           deletecom: async(comid)=>{
                try{
                const deletecom=axiosinstance.delete("/com/deletecom",comid)
                toast.success("comment deleted successfully")
                }
                catch(error){
                    console.log("error in deleting comment",error)
                    toast.error("error in deleting comment")
                }
            }

}))