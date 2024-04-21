import React from 'react'
import CloseButton from './buttons/closebutton'


export default function Modal({children, show}:{children:any, show:any}) {
  return (
   <>
   
   <div className='fixed w-screen h-screen bg-gray-700 left-0 top-0 bg-opacity-25'>

    <div className='flex w-screen min-w-screen justify-center items-center min-h-screen'>
        <div className=' rounded-xl min-w-[400px] min-h-[200px] border border-red-700 justify-center items-center max-w-xl bg-white p-4 relative'>
           <CloseButton onclick={show} className='absolute right-[-10px] top-[-10px] p-1 bg-gray-200 hover:bg-gray-300 text-black'/>
            {children}
        </div>
    </div>


   </div>


   </>
  )
}