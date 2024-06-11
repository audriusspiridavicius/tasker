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
import Select  from 'react-select';
import useGetUsers from "@/app/utils/user/get_users";


  
export default function CreateTaskForm({taskstate, getTasks}){
    
    const [task, settask]:[TaskType, any] = taskstate;
    const close = useContext(ModalContext) as any;
    
    const {trigger, isError, isMutating} = useCreateTask()
    const {data:users, error:usrs_error, isLoading:users_loading} = useGetUsers()    

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
                    {!users_loading && 
                        <div className="flex flex-wrap"> 
                            <Label name="authors"/>  
                            <Select key={"id"}
                            isMulti={true} 
                            options={[...users].map((user)=>{ return {value:user.id, label:`${user.fullname}`}})} 
                            defaultValue={[...task.authors].map(author =>{return {value:author.id, label:`${author.fullname}`}})}
                            onChange={(event)=>settask({...task, authors:[...event].map(obj=>{return {id:obj.value}})})}
                        />
                        </div>
                    }
                </div>
                <div className="w-1/2 pl-4">
                    <textarea id="task-description" readOnly defaultValue={task.description} className="w-full min-h-[174px] max-h-[174px] overflow-y-scroll "></textarea>
                    {!users_loading &&
                    <div>
                        <Label name="assigned to"/>
                        <Select
                        isMulti={false}
                        options={[...users].map((user)=>{ return {value:user.id, label:`${user.fullname}`}})} 
                        defaultValue={task.assigned_to ? {value:task.assigned_to.id, label:`${task.assigned_to.fullname} `} : {value:"", label:""}}
                        onChange= {(event)=>settask({...task, assigned_to:{id:event?.value, fullname: event?.label}})}/>
                    </div>


                    }
                </div>
           </div>

            <DefaultButton className="w-full" onClick={()=>{trigger(task).then(()=>getTasks(1));!isError && !isMutating && close && close();}}>Save</DefaultButton>
            
        </form>
    </>
    )
}