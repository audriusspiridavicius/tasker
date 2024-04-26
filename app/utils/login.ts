import useSWRMutation from "swr/mutation";
import { User } from "../types/user";


async function login(url:string,{arg}:{arg:User})
{
    const auth_result = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:arg.email,password:arg.password})
        })

    // if (!auth_result.ok){
    //     throw Error("authorization failed")
    // }


    const auth_data = await auth_result.json()
    
    return {...auth_data, status:auth_result.status}


}


export default function useLogin(){

    const {data, error, trigger, isMutating} = useSWRMutation('http://127.0.0.1:8000/api/token/', login)

    
    
    if(data && data.status && data.status == 200){
        localStorage.setItem('access-token',data.access)
        localStorage.setItem('refresh-token',data.refresh)
    }
    // else if(data?.status == )
    
    
    
    return {
        data,
        error,
        trigger,
        isMutating
    }


}