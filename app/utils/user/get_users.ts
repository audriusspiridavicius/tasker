import useSWR from "swr";
import { isAuthenticated } from "../authenticated";
import { makeRequest } from "../makerequest";
import { User } from "@/app/types/user";
import { json } from "stream/consumers";


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

export async function GetLoggedUser(): Promise<User | null>
{
    if (isAuthenticated()){
        const email = sessionStorage.getItem('user-email')
        
        try{
            var result = await makeRequest(`http://127.0.0.1:8000/users/email/${email ? email : ""}`,{method:"get"},true)
        }
        catch(error){
            console.error("Error fetching user data:", error);
            return null
        }

        const user:User = {
            id:result[0].id || 0,
            email:result[0].email || "",
            first_name:result[0].first_name || "",
            last_name:result[0].last_name || "",
            profile_picture:result[0].profile_picture || "",
            is_superuser:result[0].is_superuser || false,
            is_staff:result[0].is_staff || false,
            is_active:result[0].is_active || false,
        }
        
        return user;
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