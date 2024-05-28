
import { useEffect } from "react";

export function isAuthenticated(){
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //   }, []);
    
    return sessionStorage.getItem("access-token") !== null
}

export const logOut = () => 
    {
        sessionStorage.removeItem("access-token")
        sessionStorage.removeItem("refresh-token")
    }
// export const isAuthenticated = () => true