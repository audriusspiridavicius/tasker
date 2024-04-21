import React from 'react'
import type { TaskType } from '../types/task'


export default function Task({task}:{task:TaskType}) {
  
    return (
    <>
 
    {/* <div className='w-full flex'>
        <div className='w-1/6'>{task.id}</div>
        <div className='w-2/6'>{task.name}</div>
        <div className='w-2/6'>{task.deadline.getFullYear()}</div>
        <div className='w-1/6'>{task.priority.valueOf()}</div>
    </div> */}
    </>
  )
}