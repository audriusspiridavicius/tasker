'use client'
import React from 'react'
import { Priority, TaskType } from '../types/task'
import AuthorLabel from './authorlabel'
import DefaultButton from './buttons/defaultbutton'
import { CurrentTaskContext } from '../page'
import { useContext } from 'react'
import useDeleteTask from '../utils/delete_task'


const default_task_value:TaskType = {priority:Priority.LOW, deadline:new Date(), authors:[], name:"", assigned_to:""} 

export default function TaskGrid({ onTaskClick, tasksData}:any) {
  
    

    const {trigger:trigger_task_delete,isError:deletion_error} = useDeleteTask()

    const {currentTask,setCurrentTask} = useContext(CurrentTaskContext)
    
    const tasks = tasksData?.result?.data


    // {if (!isAuthenticated) return `not authenticated`}
    // {if (isError) return `An error has occurred. ${isError.message}. Please try again`;}
    
    // if (tasksData?.isMutating) return <GridSkeleton/>;
    // if (tasks.detail) return  tasks.detail;
    return (
    <>
  
    {deletion_error && " error occured while trying to delete task. please try again"}
    <div className='grid-cols-3 grid grid-flow-row gap-2 mb-5 '>
        {tasks?.length > 0 && tasks && tasks.map((task:TaskType)=>
            <div key={task.id} className={`p-2 bg-gray-100 rounded-xl ${task.priority} grid`}>
                <div className=' text-xl border-b-4 my-2 leading-loose align-middle  uppercase overflow-ellipsis h-12 overflow-hidden text-nowrap '>{task.name}</div>
                <div className=' uppercase my-2'>{task.priority}</div>
                <div className='my-2'>{task.deadline?.toLocaleString()}</div>
                <div className='my-2 flex flex-wrap'>

                {task.authors ? task.authors.map((author: any)=>
                            <div key={Math.random()*1000} className="mr-2 mb-2">
                                <AuthorLabel className="border-2 border-black text-2xl">{author.fullname}</AuthorLabel>
                            </div>
                        ): <AuthorLabel className="">none</AuthorLabel>}
                </div>
                <div className='flex align-bottom justify-evenly self-end mb-auto content-end place-content-end'>
                    <DefaultButton className="w-1/2" onClick={()=>{setCurrentTask(task);onTaskClick(true);}} >View</DefaultButton>
                    <DefaultButton className="w-1/2 mr-0" onClick={()=>trigger_task_delete(task.id).then(()=> tasksData.getTasks(1))}>delete</DefaultButton>
                </div>

            </div>
        )}
    </div>
    </>
  )
}
