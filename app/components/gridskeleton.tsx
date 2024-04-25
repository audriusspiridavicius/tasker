import React from 'react'

export default function GridSkeleton() {
  return (
    <>
    <div className='grid-cols-3 grid grid-flow-row gap-2 mb-5'>
        
        {[...Array(3)].map((value,index)=>
            <div key={index} className="p-2 bg-gray-100 rounded-xl medium grid animate-pulse">
                <div className="h-16 bg-gray-200 rounded w-full"></div>
                <div className="my-2 h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="my-2 h-6 bg-gray-200 rounded w-full"></div>
                <div className="my-2 h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="flex align-bottom justify-evenly self-end mb-auto content-end place-content-end">
                    <div className="text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 w-1/2 h-11 bg-gray-200 rounded"></div>
                    <div className="text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 w-1/2 mr-0 h-11 bg-gray-200 rounded"></div>
                </div>
            </div>
        )}
    </div>
    
    </>
  )
}