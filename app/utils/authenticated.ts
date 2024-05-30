
export function isAuthenticated(){
    
    return sessionStorage.getItem("access-token") !== null
}

export const logOut = () => 
    {
        sessionStorage.clear()
    }
