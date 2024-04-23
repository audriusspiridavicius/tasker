import React from 'react'

type Props = {}

export default function Container({children,...props}:any) {
  return (
    <>
    
    <div {...props} className='border border-1 rounded-xl p-5 my-5'>
        {children}
    </div>
    
    </>
  )
}