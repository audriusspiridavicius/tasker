'use client'
import React, { useContext } from 'react'
import UserInfo from '../components/forms/user'
import { AuthContext } from '../components/context/authentication'
import { User } from '../types/user'

export default function Profile() {
  
    const userContext = useContext(AuthContext);

    const {user, setUser} = userContext 


    return (
    <>
        <h1 className='text-center text-2xl'>Profile Page</h1>

        <UserInfo user={[user, setUser]}/>
    </>
  )
}