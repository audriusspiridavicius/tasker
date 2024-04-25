import React from 'react'
import CloseButton from './buttons/closebutton'
import { createContext } from 'react'
import DefaultButton from './buttons/defaultbutton'

export const ModalContext = createContext(null)


export default function Modal({children, show}:{children:any, show:any}) {
  
  return (
   <>
   <div className='fixed w-screen h-screen bg-gray-700 left-0 top-0 bg-opacity-25 '>

    <div className='flex w-screen min-w-screen justify-center items-center min-h-screen'>
        <div className=' xl:min-w-[800px] rounded-xl md:min-w-[600px] min-h-[200px] border border-sky-700 justify-center items-center max-w-xl bg-white p-4 relative'>
           <CloseButton onclick={show} className='absolute right-[-10px] top-[-10px] p-1 bg-gray-200 hover:bg-gray-300 text-black'/>
            <ModalContext.Provider value={show}>
              {children}
            </ModalContext.Provider>
            <DefaultButton onClick={()=>show(false)} className="w-full border-gray-600 text-black hover:bg-gray-400">Close</DefaultButton>
           
        </div>
    </div>


   </div>
   </>
  )
}