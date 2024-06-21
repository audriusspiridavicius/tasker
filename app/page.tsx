'use client'
export const CurrentTaskContext = createContext(null)

import type { TaskType } from "./types/task";
import { Priority } from "./types/task";
import TaskList from "./components/task/task-list";
import DefaultButton from "./components/buttons/defaultbutton";
import { useState, createContext, useEffect, useContext } from "react";
import Modal from "./components/modal";
import CreateTaskForm from "./components/forms/createtaskform";
import Container from "./components/containers/container";
import TaskGrid from "./components/task/task-grid";
import {AuthContext} from "./components/context/authentication";
import GridSkeleton from "./components/gridskeleton";
import Link from "next/link";
import useGetTasks from "./utils/get_tasks";
import Paging from "./components/pagination/paging";
import { isAuthenticated } from "./utils/authenticated";
import RecordPerPpage from "./components/pagination/record_per_page";
export const default_task_value:TaskType = {priority:Priority.LOW, deadline:new Date(), authors:[]} 



function getPagesCount(records_count,per_page){
  
    var pages = 1 + records_count / per_page;
    
    return pages

}


export default function Home() {
  
    const records_per_page_values = [1, 5, 10, 20, 50, 100]
    // const records_per_page = 20
    const [recordsPerPage, setRecordsPerPage] = useState(5)

    

    
    const [showCreateNewtask, setshowCreateNewtask] = useState(false)
    
    const [currentTask,setCurrentTask] = useState<TaskType>(default_task_value)
    const [displayGrid, setDisplayGrid] = useState(true)
    const {authenticated, loading} = useContext(AuthContext);
    const [pageIndex, setPageIndex] = useState(1);
    const {getTasks, result, isError, isMutating} = useGetTasks(pageIndex,recordsPerPage)

  

  useEffect(()=>{
    if(isAuthenticated()){
      getTasks()
    }  
   
    
  },[pageIndex, recordsPerPage])

    {if (loading) return <GridSkeleton/>}
    {if(isError) return <GridSkeleton/>}
    {if (!authenticated) return  <div className="text-center text-2xl ">Please <Link className="hover:underline" href={"/login"}> Login here</Link></div> }
    return (
<>      {!isMutating && result && 
            <Container className="flex justify-between">
            <div>
                <DefaultButton className={displayGrid==true && "bg-blue-800 text-white "} onClick={()=>setDisplayGrid(true)}>grid</DefaultButton>
                <DefaultButton className={displayGrid==false && "bg-blue-800 text-white "} onClick={()=>setDisplayGrid(false)}>list</DefaultButton>
                <RecordPerPpage 
                    values={records_per_page_values} 
                    default_value={recordsPerPage} 
                    onChange={(records_per_page:number)=>
                        {
                            if(getPagesCount(result.total_records,records_per_page) < pageIndex)
                            {setPageIndex(1)};setRecordsPerPage(records_per_page);
                        }}>

                </RecordPerPpage>
            </div>
            <div>
                <DefaultButton 
                    data-modal-target="new-task-modal" 
                    data-modal-toggle="new-task-modal" 
                    onClick={()=> {setCurrentTask(default_task_value);setshowCreateNewtask(true);}} className="self-end">

                    New Task
                </DefaultButton>
            </div>
            </Container>
        }
        {!isMutating && result && 
            <>
            <Container>
                <Paging 
                    settings={{current_page:result.current_page, total_pages:result.pages, lastPage:true, firstPage:true }} 
                    page={[pageIndex, setPageIndex]} ></Paging>
            </Container>
            <Container>

                <CurrentTaskContext.Provider value={{currentTask,setCurrentTask}}>
        
                    {result && displayGrid && <TaskGrid onTaskClick={setshowCreateNewtask} tasksData={{result, isError, isMutating, getTasks}}/>}
                    {result && !displayGrid &&  <TaskList onTaskClick={setshowCreateNewtask} tasksData={{result, isError, isMutating, getTasks}}/>}
                  
                </CurrentTaskContext.Provider>
            </Container>
            </>
        }
    

    {!isMutating && result && 
    <Container>
        <Paging 
            settings={{current_page:result.current_page, total_pages:result.pages,lastPage:true, firstPage:true }} 
            page={[pageIndex, setPageIndex]} >

        </Paging>
    </Container>
    }

    {/* create/edit task modal */}

    {showCreateNewtask && 
    <Modal show={setshowCreateNewtask}>
        <CreateTaskForm taskstate={[currentTask,setCurrentTask]} getTasks={getTasks}/>
    </Modal>
    }

    {/* create/edit task modal ends*/}

</>
  );
}


