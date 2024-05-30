import useSWR from "swr";
import { isAuthenticated } from "./authenticated";
import { makeRequest } from "./makerequest";



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

export function GetLoggedUser()
{
    if (isAuthenticated()){
        const email = sessionStorage.getItem('user-email')
        
        var result = makeRequest(`http://127.0.0.1:8000/users/email/${email ? email : ""}`,{method:"get"},true)

        return result.then((data) => {return data[0]})
    }
    return null
}
export default function useGetUsers(email = "")
{

    return useSWR(`http://127.0.0.1:8000/users/${email ? email : ""}`,get_users)
}