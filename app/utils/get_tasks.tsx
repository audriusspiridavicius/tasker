import useSWR from "swr"



export default function useGetTasks(){
    const get_Tasks = (url:string) => fetch(url).then(r => r.json())


    const {data, error, isLoading } = useSWR("http://127.0.0.1:8000/tasks/",get_Tasks)
    return {
        tasks: data,
        isLoading,
        isError: error
    }
}