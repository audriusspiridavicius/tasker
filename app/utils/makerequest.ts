import refreshToken from "./refresh_token"

export async function makeRequest(url: string, options: object, authorization = false):Promise<any>
{
    let headers = options?.headers;
    
    if (authorization){
        headers = {
            ...headers,
            "Authorization":`Bearer ${sessionStorage.getItem("access-token")}`,
        }
    }
    

    options = {...options,headers:{...headers}}
    let response = undefined;
    try{
        response = await fetch(url,{...options})
    }
    catch{
        throw Error("Server error!");
    }
        
    let data = {};
        if(response.status != 204){
            data = await response.json();
        }
        else{
            data = response
        }
        
        if(response.status == 401){
            await refreshToken()
            return await makeRequest(url,options, true)
        }
        return data
    
}