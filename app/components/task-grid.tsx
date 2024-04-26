import React from 'react'
import { TaskType } from '../types/task'
import AuthorLabel from './authorlabel'
import DefaultButton from './buttons/defaultbutton'
import { CurrentTaskContext } from '../page'
import { useContext } from 'react'
import useGetTasks from '../utils/get_tasks'
import useDeleteTask from '../utils/delete_task'
import GridSkeleton from './gridskeleton'
import useGetUsers from '../utils/get_users'


export default function TaskGrid({ onTaskClick, onDeleteClick}:any) {
  
    const {tasks, isError, isLoading} = useGetTasks()
    const {trigger:trigger_task_delete,isError:deletion_error} = useDeleteTask()
 


    const setTask = useContext(CurrentTaskContext) as any
    
    {if (isError) return `An error has occurred. ${isError.message}`;}
    
    if (isLoading) return <GridSkeleton/>;
    return (
    <>
    {deletion_error && " error occured while trying to delete task. please try again"}
    <div className='grid-cols-3 grid grid-flow-row gap-2 mb-5 '>
        {tasks && !isError && tasks.map((task:TaskType)=>
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
                    <DefaultButton className="w-1/2" onClick={()=>{setTask(task);onTaskClick(true);}}>View</DefaultButton>
                    <DefaultButton className="w-1/2 mr-0" onClick={()=>trigger_task_delete(task.id)}>delete</DefaultButton>
                </div>

            </div>
        )}
    </div>
    
    </>
  )
}
