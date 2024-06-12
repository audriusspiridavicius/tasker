'use client'
import React, { useContext } from 'react'
import UserInfo from '../components/forms/user'
import { AuthContext } from '../components/context/authentication'
import { User } from '../types/user'
import Link from 'next/link'

export default function Profile() {
  
    const userContext = useContext(AuthContext);

    const {user, setUser} = userContext 

    const {authenticated} = userContext

    if(!authenticated) return <div className="text-center text-2xl ">Please <Link className="hover:underline" href={"/login"}> Login here</Link></div>


    return (
    <>
        <h1 className='text-center text-2xl'>Profile Page</h1>

        <UserInfo user={[user, setUser]}/>
    </>
  )
}