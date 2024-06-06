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

export async function GetLoggedUser()
{
    console.log(`acces token = ${sessionStorage.getItem("access-token")}`)
    if (isAuthenticated()){
        const email = sessionStorage.getItem('user-email')
        
        try{
            var result = await makeRequest(`http://127.0.0.1:8000/users/email/${email ? email : ""}`,{method:"get"},true)
        }
        catch(error){
            console.error("Error fetching user data:", error);
            return null
        }

        return result[0]
    }
    else {
        console.error("User not authenticated");
        return null;
    }
}
export default function useGetUsers(email = "")
{

    return useSWR(`http://127.0.0.1:8000/users/${email ? email : ""}`,get_users)
}