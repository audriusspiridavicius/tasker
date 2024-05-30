import useSWR, { mutate } from "swr"
import { TaskType } from "../types/task"
import useSWRMutation from "swr/mutation"
import { makeRequest } from "./makerequest"


async function saveTask(url:string, { arg }:{ arg: TaskType }) {
    const id = arg.id ? `${arg.id}/` : undefined
    
    if(id)
    {
        await makeRequest(`${url}${id}`,{method: "PUT", body: JSON.stringify(arg), headers: {"Content-Type": "application/json",}}, true )
        // await fetch(`${url}${id}`, {method: "PUT", body: JSON.stringify(arg), headers: {"Content-Type": "application/json",}})
    }
    else{
        await makeRequest(`${url}`, {method: "POST", body: JSON.stringify(arg), headers: {"Content-Type": "application/json",}}, true)
    } 

}


export default function useCreateTask(){

    const {trigger, error, isMutating, data} = useSWRMutation("http://127.0.0.1:8000/tasks/",saveTask)
    
    return {
        trigger,
        isMutating,
        isError: error,
        data,
    }
}