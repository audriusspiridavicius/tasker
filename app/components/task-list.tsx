import React, { useEffect } from 'react'
import type { TaskType } from '../types/task'
import Task  from "./task"
import { useContext } from 'react'
import { CurrentTaskContext } from '../page'
import DefaultButton from './buttons/defaultbutton'
import DeleteButton from './buttons/deletebutton'
import useSWR from 'swr'
import useGetTasks from '../utils/get_tasks'
import useDeleteTask from '../utils/delete_task'
import { Avatar } from 'flowbite-react'

const images:string[] = ["person9.png","person10.jpg","person8.jpg","profile7.jpg"]

export default function TaskList({onTaskClick, tasksData}: any) {
    

    const {trigger, isError:err, data} = useDeleteTask()
    const tasks = tasksData?.result?.data
    const {currentTask,setCurrentTask} = useContext(CurrentTaskContext)

    {if (tasksData.isError) return "An error has occurred.";}
    // if (isLoading) return "Loading...";


    return (
    <>
       <div className='w-11/12 flex mb-4'>
        <div className='w-1/6 capitalize text-center'></div>
        <div className='w-3/6 capitalize'>task Name</div>
        <div className='w-2/6 capitalize text-center'>deadline</div>
        <div className='w-1/6 capitalize text-center px-5'>priority</div>
    </div>

        {tasks?.map((task:TaskType)=>
            <div key={task.id} className='flex'>
                <div onClick={()=>{setCurrentTask(task); onTaskClick(true)} }  className='w-11/12 flex py-5 my-2 border border-gray-200 rounded-lg shadow bg-white hover:shadow-inner hover:cursor-pointer hover:bg-gray-50'>
                    <div className='w-1/6 capitalize text-center'>
                    <Avatar.Group>
                        {images.map((image, index)=>
                            <Avatar key={index} img={image} rounded stacked/>
                        )}

                    </Avatar.Group>

                    </div>
                    <div className='w-3/6 capitalize'>{task.name}</div>
                    <div className='w-2/6 capitalize text-center'>{new Date(task.deadline).getFullYear()}</div>
                    <div className='w-1/6 capitalize text-center px-5'><span className=' bg-sky-200 text-sky-600 px-3 py-1 rounded-md uppercase'>{task.priority}</span></div>
                </div>
                <div className='w-1/12 items-center flex justify-center'>
                    
                    <DeleteButton className="ml-10 mb-0" onClick={()=>trigger(task.id).then(()=> tasksData.getTasks(1))}/>
                </div>
            </div>
            
        )}
    </>

  )
}