'use client'
import { isAuthenticated } from '@/app/utils/authenticated';
import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { GetLoggedUser } from '@/app/utils/get_users';

export const AuthContext = createContext(null)

export default function AuthenticationContext({children}) {
    
    const [loading,setLoading] = useState(true)
    // const [authenticated, setAuthenticated] = useState(isAuthenticated())
    const [authenticated, setAuthenticated] = useState(false)
    const [user,setUser] = useState(null)
  
    useEffect(() => {
        
        if (isAuthenticated()){
            setAuthenticated(isAuthenticated())
            if(!user){
                const loggedusr = GetLoggedUser()
                loggedusr?.then((usr)=>{console.log(usr);setUser(usr)})
            }
        }
        setLoading(false)
    },[user]);
    // if(loading) return "loading"
    return (
   <>
    <AuthContext.Provider value={{authenticated, setAuthenticated, user, loading, setUser: (user) => {
            console.log(`Setting123 user:${user}`);
            setUser(user);
        }}}>
        {children}
    </AuthContext.Provider>
   
   </>
  )
}