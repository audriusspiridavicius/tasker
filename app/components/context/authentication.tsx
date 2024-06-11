'use client'
import { isAuthenticated } from '@/app/utils/authenticated';
import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { GetLoggedUser } from '@/app/utils/user/get_users';
import { User } from '@/app/types/user';

export const AuthContext = createContext(null)

export default function AuthenticationContext({children}:{children:any}) {
    
    const [loading,setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [user,setUser] = useState<User>()
  
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
    return (
   <>
    <AuthContext.Provider value={{authenticated, setAuthenticated, user, loading, setUser: (user:User) => {
            setUser(user);
        }}}>
        {children}
    </AuthContext.Provider>
   
   </>
  )
}