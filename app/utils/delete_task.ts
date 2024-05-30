import useSWRMutation from "swr/mutation"
import { makeRequest } from "./makerequest"

async function delete_task(url:string, { arg }:{ arg: number }){
    
    const result = await makeRequest(`${url}${arg}/`, {
        method: 'DELETE',
    }, true)
    if (result.status != 204) 
    
    {
        throw Error("Something went wrong during task deletion.")
    }

    return {
        success: result.ok,
        message: 'Task deleted',
        error: result.status != 204 && 'Error deleting task'
    }
}

export default function useDeleteTask(){

    const {trigger, error, isMutating, data} = useSWRMutation("http://127.0.0.1:8000/tasks/",delete_task)
    
    return {
        trigger,
        isMutating,
        isError: error,
        data,
    }
}