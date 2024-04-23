import React from 'react'
import { TaskType } from '../types/task'
import AuthorLabel from './authorlabel'
import DefaultButton from './buttons/defaultbutton'
import { CurrentTaskContext } from '../page'
import { useContext } from 'react'

export default function TaskGrid({tasks=[], onTaskClick, onDeleteClick}:any) {
  
    const setTask = useContext(CurrentTaskContext) as any
    return (
    <>
    <div className='grid-cols-3 grid grid-flow-row gap-2 mb-5 '>
        {tasks.map((task:TaskType)=>
            <div key={task.id} className={`p-2 bg-gray-100 rounded-xl ${task.priority} grid`}>
                <div className=' text-xl border-b-4 my-2 leading-loose align-middle  uppercase overflow-ellipsis h-12 overflow-hidden text-nowrap '>{task.name}</div>
                <div className=' uppercase my-2'>{task.priority}</div>
                <div className='my-2'>{task.deadline?.toLocaleString()}</div>
                <div className='my-2 flex flex-wrap'>

                {task.authors ? task.authors.map((author: any)=>
                            <div key={Math.random()*1000} className="mr-2 mb-2">
                                <AuthorLabel className="border-2 border-black text-2xl">{author}</AuthorLabel>
                            </div>
                        ): <AuthorLabel className="">none</AuthorLabel>}

                </div>
                <div className='flex align-bottom justify-evenly self-end mb-auto content-end place-content-end'>
                    <DefaultButton className="w-1/2" onClick={()=>{setTask(task);onTaskClick(true);}}>View</DefaultButton>
                    <DefaultButton className="w-1/2 mr-0" onClick={()=>onDeleteClick(task)}>delete</DefaultButton>


                </div>

            </div>
        )}
    </div>
    
    </>
  )
}
