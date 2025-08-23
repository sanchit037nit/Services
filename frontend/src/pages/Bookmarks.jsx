import React from 'react'
import { useSolution } from '../store/useSolutionstore.js';
import { useAuthstore} from '../store/useAuthstore.js'
import { useEffect } from 'react';

const Bookmarks = () => {
    const { authUser} = useAuthstore()
    const {bookmarks,getbookmark } = useSolution()

    const id=authUser._id
    useEffect(()=>{
      getbookmark()
    },[])

  return (

         <div className="space-y-5 p-6">
        {bookmarks?.map((pass) => (
           <div  key={pass._id} className='border-black text-black'>
              <div className="space-y-1 text-left">
                <p className="text-black text-lg font-medium">
                  Name:{" "}
                  <span className="text-black-300 font-normal">{pass.doubt}</span>
                </p>
                <p className="text-black text-lg font-medium flex items-center gap-2">
                  Password:{" "}
                  
                </p>
              </div>
              </div>
          ))}
      </div>

  )
}

export default Bookmarks
