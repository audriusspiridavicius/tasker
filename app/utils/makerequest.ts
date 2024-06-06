import refreshToken from "./refresh_token"

export async function makeRequest(url: string, options: object, authorization = false)
{
    if (authorization){
        options = {...options,  headers: {
            "Authorization":`Bearer ${sessionStorage.getItem("access-token")}`,
            "Content-Type": "application/json"
        }}
    }
    
    const response = await fetch(url,{...options})
    const data = await response.json()
    
    if(response.status == 401){
        await refreshToken()
        return await makeRequest(url,options, true)
    }
    if (response.ok) {
        return data
    }
}