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
import { Controller, useForm } from 'react-hook-form'
import ErrorMessage from "../form_elements/error_message";

  
export default function CreateTaskForm({taskstate, getTasks}){
    
    const [task, settask]:[TaskType, any] = taskstate;
    const close = useContext(ModalContext) as any;
    
    const {trigger, isError, isMutating} = useCreateTask()
    const {data:users, error:usrs_error, isLoading:users_loading} = useGetUsers()    

    const {register, handleSubmit, formState:{errors}, control} = useForm({defaultValues:{
        name:task.name,
        authors:[...task.authors].map(author =>{return {value:author.id, label:`${author.fullname}`}}),
        assigned_to: task.assigned_to ? { value: task.assigned_to.id, label: task.assigned_to.fullname } : null
    }})


    const handleValidSubmit = async (data)=>{
        await trigger(task);
        await getTasks(1);
        !isError && !isMutating && close && close()
    }

    const handleErrors = ()=>{
        console.log("form errors")
    }

    return(
    <>
        <form className="" onSubmit={handleSubmit(handleValidSubmit, handleErrors)}>
           <div className="w-full flex justify-between mb-5">
                <div className="w-1/2">
                    <TextInput {...register("name",{"required":"this field is required"})} id="name" className="mb-5" onChange={(e:any)=> settask({...task,name:e.target.value})}/>
                    {errors.name && <ErrorMessage>Please enter task name</ErrorMessage>}
                    <div className="mb-5">
                        <Label id="task-priority"  name="priority"/>
                        <Select id="task-priority" name="priority" isSearchable={true} options={priority_values()}  defaultValue={{value:task.priority,label:task.priority}} onChange={(event)=>settask({...task, priority:event.value})}/>   
                    </div>
                    <div>
                        <Label id="task-deadline" name="Task deadline"/>
                        <Datepicker minDate={new Date()} inline={false} defaultDate={new Date(task.deadline)} id="task-deadline" className="mb-5"  onSelectedDateChanged={(event)=> settask({...task, deadline:event})}/>
                    </div>
                    {!users_loading && 
                        <div className="flex flex-wrap mb-5"> 
                            <Label name="authors"/>  
                            <Controller 
                                name="authors"
                                control={control}
                                rules={{required:"Select at least 1 author"}}
                                render={({field: { onChange, onBlur, value, name, ref },})=>(

                                <Select key={"id"}
                                ref={ref}
                                value={value}
                                isMulti={true} 
                                options={[...users].map((user)=>{ return {value:user.id, label:`${user.fullname}`}})} 
                                onChange={(event)=>{onChange(event);settask({...task, authors:[...event].map(obj=>{return {id:obj.value}})})}}
                                className="w-full"
                                name={name}
                                />
                            )}
                        />
                        
                            
                        </div>
                        
                    }
                    {errors.authors && <ErrorMessage> {errors.authors.message}</ErrorMessage> }
                </div>
                <div className="w-1/2 pl-4">
                    <textarea id="task-description" readOnly defaultValue={task.description} className="w-full min-h-[174px] max-h-[174px] overflow-y-scroll "></textarea>
                    {!users_loading &&
                        <div className="mb-5">
                            <Label name="Assigned to"/> 
                            <Controller
                                control={control}
                                rules={{
                                    required: "field is required",
                                  }}
                                name="assigned_to"
                                render={({field: { onChange, onBlur, value, name, ref },}) => (
                                    <Select 
                                    value={value}
                                    ref={ref}
                                    isMulti={false}
                                    options={[...users].map((user)=>{ return {value:user.id, label:`${user.fullname}`}})} 
                                    defaultValue={task.assigned_to ? {value:task.assigned_to.id, label:`${task.assigned_to.fullname} `} : {value:"", label:""}}
                                    onChange={(event)=>{onChange(event);settask({...task, assigned_to:{id:event?.value, fullname: event?.label}})}}/>    )}
                            />
                                                     
                        </div>
                        
                    }
                    {errors.assigned_to && <ErrorMessage>Please select Assigned To user</ErrorMessage>} 
                </div>
           </div>

            <DefaultButton className="w-full" type="submit">Save</DefaultButton>
            
        </form>
    </>
    )
}