import React from 'react'
import type { TaskType } from '../types/task'
import Task  from "./task"

export default function TaskList({tasks = []}:{tasks:TaskType[]} ) {
  
  
    return (
    <>
       <div className='w-full flex mb-4'>
        <div className='w-1/6 capitalize text-center'></div>
        <div className='w-3/6 capitalize'>task Name</div>
        <div className='w-2/6 capitalize text-center'>deadline</div>
        <div className='w-1/6 capitalize text-center px-5'>priority</div>
    </div>
        {tasks.map((task)=>
            <div key={task.id} className='w-full flex py-5 my-2 border border-gray-200 rounded-lg shadow bg-white hover:shadow-inner hover:cursor-pointer hover:bg-gray-50'>
                <div className='w-1/6 capitalize text-center'></div>
                <div className='w-3/6 capitalize'>{task.name}</div>
                <div className='w-2/6 capitalize text-center'>{task.deadline.getFullYear()}</div>
                <div className='w-1/6 capitalize text-center px-5'><span className=' bg-sky-200 text-sky-600 px-3 py-1 rounded-md'>{task.priority.valueOf()}</span></div>
            </div>
        )}
    </>

  )
}