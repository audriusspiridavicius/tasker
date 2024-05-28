

export default async function refreshToken() {
    
    const options = {
        "headers":{
            "Content-Type": "application/json"
        },
        "method": 'POST',
        body: JSON.stringify({ "refresh": sessionStorage.getItem("refresh-token"),})
        
    }
    const result = await fetch("http://127.0.0.1:8000/api/token/refresh/",{...options}) 
    const data = await result.json()
    
    if(!result.ok)
    {
        throw new Error(data.message)
    }

        sessionStorage.setItem("access-token",data.access)
}