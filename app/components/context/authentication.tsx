'use client'
import { isAuthenticated } from '@/app/utils/authenticated';
import React, { useEffect } from 'react'
import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

export default function AuthenticationContext({children}) {
    
    const [authenticated, setAuthenticated] = useState(false)
  
    useEffect(()=>{
        setAuthenticated(isAuthenticated())
    },[]);
  
    return (
   <>
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
        {children}
    </AuthContext.Provider>
   
   </>
  )
}