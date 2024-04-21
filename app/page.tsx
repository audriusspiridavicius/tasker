'use client'
import Image from "next/image";
import type { TaskType } from "./types/task";
import { Priority } from "./types/task";
import TaskList from "./components/task-list";
import DefaultButton from "./components/buttons/defaultbutton";
import { useState } from "react";
import Modal from "./components/modal";
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



export default function Home() {
  const [showCreateNewtask, setshowCreateNewtask] = useState(false)
  
  return (
    <>
      

      {showCreateNewtask && <Modal show={setshowCreateNewtask}> create new task modal</Modal>}
      <TaskList tasks={tasks} />
      
      <DefaultButton data-modal-target="new-task-modal" data-modal-toggle="new-task-modal" 
      onClick={()=> setshowCreateNewtask(!showCreateNewtask)}>New Task</DefaultButton>

    </>
  );
}
