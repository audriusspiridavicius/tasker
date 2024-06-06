import useSWRMutation from "swr/mutation";
import { User } from "../types/user";

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
    if(auth_result && auth_result.status && auth_result.status == 200){
        
        sessionStorage.setItem('access-token',auth_data.access)
        sessionStorage.setItem('refresh-token',auth_data.refresh)
        sessionStorage.setItem('user-email',arg.email)
    }
    return {...auth_data, status:auth_result.status,email:arg.email}
}


export default function useLogin(){
    
    const {data, error, trigger, isMutating} = useSWRMutation('http://127.0.0.1:8000/api/token/', login)

    return {
        data,
        error,
        trigger,
        isMutating
    }
}