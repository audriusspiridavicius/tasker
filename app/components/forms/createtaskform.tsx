import { TaskType } from "@/app/types/task";
import React, { useState } from "react";
import TextInput from "../form_elements/textinput";
import { Datepicker } from "flowbite-react";
import Select from "../form_elements/select";

import { priority_values } from "@/app/types/task";
import Label from "../form_elements/label";
import AuthorLabel from "../authorlabel";
import DefaultButton from "../buttons/defaultbutton";
import { useContext } from "react";
import { ModalContext } from "../modal";


export default function CreateTaskForm({taskstate, onSave}:any){
    const [task, settask] = taskstate;
    const close = useContext(ModalContext) as any;
    
    return(
    <>
        <form className="">
           <div className="w-full flex justify-between mb-5">
            <div className="w-1/2">
                    <TextInput name="task name" defaultValue={task.name} id="task-name" className="mb-5" onChange={(e:any)=> settask({...task,name:e.target.value})}/>
                    <Select id="priority" title="Select priority" values={priority_values()} selected_value={task.priority ? task.priority : priority_values()[0]} events={{onChange:(event:any)=> settask({...task, priority:event.target.value})}}/>
                    <div>
                        <Label id="task-deadline" name="Task deadline"/>
                        <Datepicker minDate={new Date()} inline={false} defaultDate={task.deadline} id="task-deadline" className="mb-5"  onSelectedDateChanged={(event)=> settask({...task, deadline:event})}/>
                    </div>
                    <div className="flex flex-wrap"> 
                        <Label name="authors"/>  
                        {task.authors ? task.authors.map((author: any)=>
                            <div key={Math.random()*1000} className="mr-2 mb-2">
                                <AuthorLabel>{author}</AuthorLabel>
                            </div>
                        ): <AuthorLabel>none</AuthorLabel>}
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <textarea id="task-description" readOnly defaultValue={task.description} className="w-full h-[200px] min-h-[200px] max-h-[200px] overflow-y-scroll"></textarea>
                </div>
           </div>

            <DefaultButton className="w-full" onClick={()=>{onSave(); close && close()}}>Save</DefaultButton>
            
        </form>
    </>
    )
}