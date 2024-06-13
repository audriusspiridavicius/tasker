'use client'
import { makeRequest } from "./makerequest"
import useSWRMutation from "swr/mutation"

export default function useGetTasks(page,per_page){
    

    const  get_Tasks = async (url:string, {page = 1, per_page = 0} :{page:  number, per_page:number }) => 
    {
        const options = {
            method: "GET"
        }
        
        var page_query_parameter = `page=${page}`
        var per_page_query_parameter = per_page > 0 ? `&page_size=${per_page}` :  ""

        url = `${url}?${page_query_parameter}${per_page_query_parameter}`

        const result = await makeRequest(url,options, true);
        return result
    }

    var {trigger:getTasks, data, error, isMutating } = useSWRMutation(["http://127.0.0.1:8000/tasks/", {page, per_page}],([url,{page, per_page}])=> get_Tasks(url,{page,per_page}))
    
    return {
        result: data,
        isMutating,
        isError: error,
        getTasks
    }
}