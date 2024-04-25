import useSWR from "swr";



async function get_users(url:string)
{
    const result = await fetch(url) 
    const data = await result.json()
    
    if(!result.ok)
    {
        throw new Error(data.message)
    }

    return data
}

export default function useGetUsers()
{
    return useSWR("http://127.0.0.1:8000/users/",get_users)
}