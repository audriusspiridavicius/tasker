import React from 'react'
import type { TaskType } from '../types/task'
import Task  from "./task"
import { useContext } from 'react'
import { CurrentTaskContext } from '../page'
import DefaultButton from './buttons/defaultbutton'
import DeleteButton from './buttons/deletebutton'


export default function TaskList({tasks = [], onTaskClick, onDeleteClick}: any) {
    
    const setTask = useContext(CurrentTaskContext) as any
  
    return (
    <>
       <div className='w-11/12 flex mb-4'>
        <div className='w-1/6 capitalize text-center'></div>
        <div className='w-3/6 capitalize'>task Name</div>
        <div className='w-2/6 capitalize text-center'>deadline</div>
        <div className='w-1/6 capitalize text-center px-5'>priority</div>
    </div>
        {tasks.map((task)=>
            <div key={task.id} className='flex'>
                <div onClick={()=>{setTask(task); onTaskClick(true)} }  className='w-11/12 flex py-5 my-2 border border-gray-200 rounded-lg shadow bg-white hover:shadow-inner hover:cursor-pointer hover:bg-gray-50'>
                    <div className='w-1/6 capitalize text-center'>{task.id}</div>
                    <div className='w-3/6 capitalize'>{task.name}</div>
                    <div className='w-2/6 capitalize text-center'>{task.deadline?.getFullYear()}</div>
                    <div className='w-1/6 capitalize text-center px-5'><span className=' bg-sky-200 text-sky-600 px-3 py-1 rounded-md uppercase'>{task.priority}</span></div>
                </div>
                <div className='w-1/12 items-center flex justify-center'>
                    <DeleteButton className="ml-10 mb-0" onClick={()=>onDeleteClick(task)}/>
                </div>
            </div>
            
        )}
    </>

  )
}