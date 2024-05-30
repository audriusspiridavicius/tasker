'use client'
export const CurrentTaskContext = createContext(null)

import type { TaskType } from "./types/task";
import { Priority } from "./types/task";
import TaskList from "./components/task-list";
import DefaultButton from "./components/buttons/defaultbutton";
import { useState, createContext, useEffect, useContext } from "react";
import Modal from "./components/modal";
import CreateTaskForm from "./components/forms/createtaskform";
import Container from "./components/containers/container";
import TaskGrid from "./components/task-grid";
import { isAuthenticated } from "./utils/authenticated";
import {AuthContext} from "./components/context/authentication";
import GridSkeleton from "./components/gridskeleton";
import Link from "next/link";
const default_task_value:TaskType = {priority:Priority.LOW, deadline:new Date(), authors:[]} 


export default function Home() {
  const [showCreateNewtask, setshowCreateNewtask] = useState(false)
  
  const [currentTask,setCurrentTask] = useState<TaskType>(default_task_value)
  const [displayGrid, setDisplayGrid] = useState(true)
  const {authenticated, setAuthenticated, loading} = useContext(AuthContext);


  {if (loading) return <GridSkeleton/>}
  {if (!authenticated) return  <div className="text-center text-2xl ">Please <Link className="hover:underline" href={"/login"}> Login here</Link></div> }
  return (
    <>
      <Container>
        <DefaultButton onClick={()=>setDisplayGrid(true)}>grid</DefaultButton>
        <DefaultButton onClick={()=>setDisplayGrid(false)}>list</DefaultButton>
      </Container>

      <Container>
        <CurrentTaskContext.Provider value={setCurrentTask}>
          {displayGrid && <TaskGrid onTaskClick={setshowCreateNewtask}/>}
        {!displayGrid &&  <TaskList onTaskClick={setshowCreateNewtask}/>}
          
        </CurrentTaskContext.Provider>

        <DefaultButton data-modal-target="new-task-modal" data-modal-toggle="new-task-modal" 
        onClick={()=> {setCurrentTask(default_task_value);setshowCreateNewtask(!showCreateNewtask);}}>New Task</DefaultButton>
      </Container>
      

      {/* create/edit task modal */}

      {showCreateNewtask && 
        <Modal show={setshowCreateNewtask}>
          <CreateTaskForm taskstate={[currentTask,setCurrentTask]}/>
        </Modal>
      }

      {/* create/edit task modal ends*/}

    </>
  );
}


