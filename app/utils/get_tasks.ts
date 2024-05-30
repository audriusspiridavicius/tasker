'use client'
import useSWR from "swr"
import refreshToken from "./refresh_token"
import { isAuthenticated } from "./authenticated"
import { makeRequest } from "./makerequest"






export default function useGetTasks(){
    

    const  get_Tasks = async (url:string) => 
    {
        const options = {
            method: "GET"
        }

        const result = await makeRequest(url,options, true);
        return result
    }

    var {data, error, isLoading } = useSWR("http://127.0.0.1:8000/tasks/",get_Tasks)
    
    return {
        tasks: data,
        isLoading,
        isError: error
    }
}