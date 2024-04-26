import useSWR from "swr"



export default function useGetTasks(){
    const options = {
        // body: JSON.stringify({
        //     "access": localStorage.getItem("access-token"),
        // }),
        headers: {
            "Authorization":`Bearer ${localStorage.getItem("access-token")}`,
            "Content-Type": "application/json"
        },
        method: "GET"
    }
    
    const get_Tasks = (url:string) => fetch(url,{...options}).then(r => r.json())


    const {data, error, isLoading } = useSWR("http://127.0.0.1:8000/tasks/",get_Tasks)
    
    return {
        tasks: data,
        isLoading,
        isError: error
    }
}