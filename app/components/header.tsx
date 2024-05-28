'use client'
import React, { useContext, useEffect, useState } from 'react'
import DefaultButton from './buttons/defaultbutton';
import { isAuthenticated, logOut } from '../utils/authenticated';
import Link from 'next/link';
import { AuthContext } from './context/authentication';


export default function Header() {
    const {authenticated, setAuthenticated} = useContext(AuthContext);

    // useEffect(()=>{
    //     setAuthenticated(isAuthenticated())
    //   },[]);

    return (
    <>
        <div className="flex w-full max-w-screen-lg p-4 m-auto content-end justify-between">
            <div><Link href={'/'}>Tasks</Link> | <Link href={'/login'}>Login</Link></div>
            <div>
                {authenticated && 
                <DefaultButton className="self-end" onClick={()=> {logOut();setAuthenticated(isAuthenticated())}}>logout</DefaultButton>}
            </div>
            
            
        </div>
    </>
  )
}