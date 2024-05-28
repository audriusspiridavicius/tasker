'use client'
import useSWR from "swr"
import refreshToken from "./refresh_token"
import { isAuthenticated } from "./authenticated"



export default function useGetTasks(){
    

    const  get_Tasks = async (url:string) => 
    {
        const options = {
            headers: {
                "Authorization":`Bearer ${sessionStorage.getItem("access-token")}`,
                "Content-Type": "application/json"
            },
            method: "GET"
        }
        const a = await fetch(url,{...options});
        return a.json()
    }


    var {data, error, isLoading } = useSWR("http://127.0.0.1:8000/tasks/",get_Tasks)
    // const isLoading = false

    // if(data?.code == "token_not_valid" && (isAuthenticated()))
        if(data?.code == "token_not_valid")

        {
            refreshToken()
        }
        
    var {data, error, isLoading } = useSWR("http://127.0.0.1:8000/tasks/",get_Tasks)
    
    return {
        tasks: data,
        isLoading,
        isError: error
    }
}