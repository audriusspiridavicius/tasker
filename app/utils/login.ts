import useSWRMutation from "swr/mutation";
import { User } from "../types/user";
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation'
import { useContext } from "react";
import { AuthContext } from "../components/context/authentication";
import { isAuthenticated } from "./authenticated";
import { error } from "console";
// import { useSession } from "next-auth/react";

async function login(url:string,{arg}:{arg:User})
{
    
    var auth_result;
    
    try{
        auth_result = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:arg.email,password:arg.password})
            })
    }
    catch(error)
    {           
        throw "something went wrong. Please try again!"
    }      
    const auth_data = await auth_result.json()

    return {...auth_data, status:auth_result.status,email:arg.email}
}


export default function useLogin(){

    const {authenticated, setAuthenticated} = useContext(AuthContext);
    
    const {data, error, trigger, isMutating} = useSWRMutation('http://127.0.0.1:8000/api/token/', login)

    
    if(data && data.status && data.status == 200){
        sessionStorage.setItem('access-token',data.access)
        sessionStorage.setItem('refresh-token',data.refresh)
        sessionStorage.setItem('user-email',data.email)
        // refresh();
        // push('/');
        setAuthenticated(isAuthenticated())
        redirect("/")
            
    }
    return {
        data,
        error,
        trigger,
        isMutating
    }
}