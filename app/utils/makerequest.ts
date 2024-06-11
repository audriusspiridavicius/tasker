import refreshToken from "./refresh_token"

export async function makeRequest(url: string, options: object, authorization = false):Promise<any>
{
    let headers;
    
    if (authorization){
        headers = {
            "Authorization":`Bearer ${sessionStorage.getItem("access-token")}`,
        }
    }
    

    options = {...options,headers:{...headers}}
    
    const response = await fetch(url,{...options})
    let data;
        if(response.status == 204){
            data = response
           
        }
        else{
            data = await response.json();
        }
        
        if(response.status == 401){
            await refreshToken()
            return await makeRequest(url,options, true)
        }
        return data
    
}