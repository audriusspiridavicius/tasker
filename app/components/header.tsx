'use client'
import React, { useContext, useEffect, useState } from 'react'
import DefaultButton from './buttons/defaultbutton';
import { isAuthenticated, logOut } from '../utils/authenticated';
import Link from 'next/link';
import { AuthContext } from './context/authentication';
import { User } from '../types/user';


export default function Header() {
    const {authenticated, setAuthenticated, user}= useContext(AuthContext);
    const email = user?.email

    return (
    <>
        <div className="flex w-full max-w-screen-lg p-4 m-auto content-end justify-between">
            <div><Link href={'/'}>Tasks</Link> | <Link href={'/login'}>Login</Link></div>
            <div>
                {authenticated && 
                <div>
                    <DefaultButton>{email}</DefaultButton>
                    
                    <DefaultButton className="self-end" onClick={()=> {logOut();setAuthenticated(false)}}>
                        logout</DefaultButton>

                </div>
}
            </div>
            
            
        </div>
    </>
  )
}