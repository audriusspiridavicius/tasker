'use client'
import Image from "next/image";
import type { TaskType } from "./types/task";
import { Priority } from "./types/task";
import TaskList from "./components/task-list";
import DefaultButton from "./components/buttons/defaultbutton";
import { useState, createContext, useReducer } from "react";
import Modal from "./components/modal";
import CreateTaskForm from "./components/forms/createtaskform";
import Container from "./components/containers/container";
import TaskGrid from "./components/task-grid";


const default_task_value:TaskType = {priority:Priority.LOW, deadline:new Date()} 

const tasks:TaskType[] = [
{
  id: 1,
  name: "Create new project",
  description: "describes task. general information",
  priority: Priority.LOW,
  deadline: new Date(2024,10,10),
  authors: ["audrius Spiridavicius","Mark Cuban", "Marius Mariauskas"],
  assigned_to: "rokas giedraitis"
},
{
  id: 2,
  name: "write integration tests",
  description: "describes task. write integration tests",
  priority: Priority.MEDIUM,
  deadline: new Date(2024,10,10),
  authors: ["Mark Cuban", "Marius Mariauskas"],
  assigned_to: "audrius Spiridavicius"
},
{
  id: 4,
  name: "Add new endpoint to tasks api!",
  description: "describes task. Add new endpoint to tasks api!",
  priority: Priority.HIGH,
  deadline: new Date(2024,10,10),
  authors: ["Jonas Valanciunas"],
  assigned_to: "vardenis pavardenis"
}


]

const update_task_list = (task_list:TaskType[], updated_task:TaskType)=>
  {
    const result = task_list.map((task:TaskType)=>{
      if(task.id == updated_task.id){
        return {...updated_task};
      }
      return task;
    });
    return result;
  }
const add_task_to_list = (task_list:TaskType[], new_task:TaskType)=>{

  return [...task_list,new_task]
}  
  
  function reducer(state:any, action:any) {

    if(action.type == "update"){
      return update_task_list(state, action.value)
    }
    else if(action.type == "create"){
      return add_task_to_list(state, action.value)
    }
    else if(action.type == "delete"){
      return state.filter((task:TaskType)=>{
        return task.id != action.value.id
      })
    }
  }



export default function Home() {
  const [showCreateNewtask, setshowCreateNewtask] = useState(false)
  
  const [currentTask,setCurrentTask] = useState<TaskType>()
  // const [taskList, setTaskList] = useState(tasks)
  const [taskList, dispatch] = useReducer(reducer, tasks);
  const [displayGrid, setDisplayGrid] = useState(true)

  function update_tasks()
  {
    if(currentTask?.id){
      dispatch({type:"update", value:currentTask})
    }
    else{
      const t = {...currentTask,id:taskList[taskList.length-1].id+1}
      dispatch({type:"create", value:t})
    }
    
  }
  function removeTask(task:TaskType)
  {
    dispatch({type:"delete", value:task})
  }

  return (
    <>
      

      {showCreateNewtask && <Modal show={setshowCreateNewtask}> create new task modal</Modal>}
      <TaskList tasks={tasks} />
      
      <DefaultButton data-modal-target="new-task-modal" data-modal-toggle="new-task-modal" 
      onClick={()=> setshowCreateNewtask(!showCreateNewtask)}>New Task</DefaultButton>

    </>
  );
}
