import Solution from "../models/solution.model.js"

export const createsol=async(req,res)=>{
         const{text,createdby}= req.body

     try{
     if(!text){
        return res.status(400).json({message:"text is required"})
     }
     const newcom= new Comment({
         message:text,
         createdby
     })

     if(newcom){
        await newcom.save()
        return res.status.json(201).json({
            success:true,
            message:"comment created"
        })
     }
     else throw"error not created"
     }
     catch(error){
         console.log("error in creating comment")
         return res.status(400).json({message:"comment not created"})
     }
}
export const deletesol=async(req,res)=>{
 const id=req.params

          try {
            if(!id){
               return res.status(400).json({message:"text is required"})
           }

           const delcom=await Comment.findByIdAndDelete(id)

            if(delcom){
        return res.status.json(201).json({
            success:true,
            message:"comment deleted"
        })
         }
            else throw"error not deleted"


          } catch (error) {
             console.log("error in deleting comment")
         return res.status(400).json({message:"comment not deleted"})
          }
}
export const updatesol=async(req,res)=>{
const id=req.params
        const{text}= req.body

     try{
     if(!text){
        return res.status(400).json({message:"text is required"})
     }
     
     const updatecom= Comment.findByIdAndUpdate(id,{
        $set:{
            message:text
        }
     },
    {new:true})

     if(updatecom){
   
        return res.status.json(201).json({
            success:true,
            message:"comment updated"
        })
     }
     else throw"error not updated"
     }
     catch(error){
         console.log("error in updating comment")
         return res.status(400).json({message:"comment not updated"})
     }
}