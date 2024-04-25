import { Priority, TaskType } from "@/app/types/task";
import React, { useState } from "react";
import TextInput from "../form_elements/textinput";
import { Datepicker } from "flowbite-react";

import { priority_values } from "@/app/types/task";
import Label from "../form_elements/label";
import DefaultButton from "../buttons/defaultbutton";
import { useContext } from "react";
import { ModalContext } from "../modal";
import useCreateTask from "@/app/utils/create_task";
import { User } from "@/app/page";
import Select  from 'react-select';

export const users:User[] = [
    {id:1, first_name:"audrius", last_name:"spiridavicius"},
    {id:2, first_name:"petras", last_name:"petraitis"},
    {id:3, first_name:"miroslav", last_name:"miroslav"},
    {id:4, first_name:"Andrejus", last_name:"pizdejus"},
    {id:5, first_name:"giedrius", last_name:"pavardenis"},
    {id:6, first_name:"Jolanta", last_name:"jolantiene"}
  ]
  
export default function CreateTaskForm({taskstate}){
    const [task, settask]:[TaskType, any] = taskstate;
    const close = useContext(ModalContext) as any;
    
    const {trigger, isError, isMutating} = useCreateTask()

    return(
    <>
        <form className="">
           <div className="w-full flex justify-between mb-5">
                <div className="w-1/2">
                    <TextInput name="task name" defaultValue={task.name} id="task-name" className="mb-5" onChange={(e:any)=> settask({...task,name:e.target.value})}/>
                    <div className="mb-5">
                        <Label id="task-priority"  name="priority"/>
                        <Select id="task-priority" name="priority" isSearchable={true} options={priority_values()}  defaultValue={{value:task.priority,label:task.priority}} onChange={(event)=>settask({...task, priority:event.value})}/>   
                    </div>
                    <div>
                        <Label id="task-deadline" name="Task deadline"/>
                        <Datepicker minDate={new Date()} inline={false} defaultDate={new Date(task.deadline)} id="task-deadline" className="mb-5"  onSelectedDateChanged={(event)=> settask({...task, deadline:event})}/>
                    </div>
                    <div className="flex flex-wrap"> 
                        <Label name="authors"/>  
                        <Select 
                        isMulti={true} 
                        options={[...users].map((user,index)=>{ return {value:user.id, label:`${user.first_name} ${user.last_name}`}})} 
                        defaultValue={[...task.authors].map(author_id =>{return {value:author_id, label:`${users[author_id-1]?.first_name} ${users[author_id-1]?.last_name}`}})}
                        onChange={(event)=>settask({...task, authors:[...event].map(obj=>{return obj.value})})}
                    />
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <textarea id="task-description" readOnly defaultValue={task.description} className="w-full min-h-[174px] max-h-[174px] overflow-y-scroll "></textarea>

                    <Select
                        isMulti={false}
                        options={[...users].map((user,index)=>{ return {value:user.id, label:`${user.first_name} ${user.last_name}`}})} 
                        defaultValue={{value:task.assigned_to, label:task.assigned_to ? `${users[task.assigned_to-1]?.first_name} ${users[task.assigned_to-1]?.last_name}` : ""}}
                        onChange= {(event)=>settask({...task, assigned_to:event.value})}
                    />
                
                </div>
           </div>
            {isMutating && "mutating!!!!!!!!!!!!!!!!!!!!!!!"}
            {isError && "error!!!!!!!!!!!!!!!!!!!!!!!"}
            <DefaultButton className="w-full" onClick={()=>{const updatedAuthors: number[] = [1];settask({...task, authors:updatedAuthors, assigned_to:2})}}>Save 123</DefaultButton>
            <DefaultButton className="w-full" onClick={()=>{trigger(task);!isError && !isMutating && close && close()}}>Save</DefaultButton>
            
        </form>
    </>
    )
}