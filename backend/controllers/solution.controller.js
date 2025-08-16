import Solution from "../models/solution.model.js"

export const createsol=async(req,res)=>{
        const{doubt,description,language,platform,createdby}= req.body

     try{
    //  if(!){
    //     return res.status(400).json({message:"text is required"})
    //  }
     const newsol= new Solution({
         doubt:doubt,
         description:description,
         language:language,
         platform:platform,
         createdby
     })

     if(newsol){
        await newsol.save()
        return res.status(201).json({
            success:true,
            message:"solution created"
        })
     }

     }
     catch(error){
         console.log("error in creating solution",error)
         return res.status(400).json({message:"solution not created"})
     }
}

export const deletesol=async(req,res)=>{
 const id=req.params

          try {
            if(!id){
               return res.status(400).json({message:"text is required"})
           }

           const delsol=await Solution.findByIdAndDelete(id)

            if(delsol){
        return res.status.json(201).json({
            success:true,
            message:"comment deleted"
        })
         }
            else throw"error not deleted"


          } catch (error) {
             console.log("error in deleting solution")
         return res.status(400).json({message:"solution not deleted"})
          }
}
export const updatesol=async(req,res)=>{
const id=req.params
        const{text}= req.body

     try{
     if(!text){
        return res.status(400).json({message:"text is required"})
     }
     
     const updatesol= Solution.findByIdAndUpdate(id,{
        $set:{
            doubt:doubt,
            description:description,
            language:language,
            platform:platform,
        }
     },
    {new:true})

     if(updatesol){
   
        return res.status.json(201).json({
            success:true,
            message:"solution updated"
        })
     }
     else throw"error not updated"
     }
     catch(error){
         console.log("error in updating solution")
         return res.status(400).json({message:"solution not updated"})
     }
}