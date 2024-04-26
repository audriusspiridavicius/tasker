'use client'
import React, { useState } from 'react'
import TextInput from '../form_elements/textinput'
import DefaultButton from '../buttons/defaultbutton'
import useLogin from '@/app/utils/login'
import type { User } from '@/app/types/user'

export default function Login() {
    const {data, error, trigger, isMutating} = useLogin()

    const [user, setUser] = useState()
  
  
    return (
    <>
        <form> 
            <h1 className="text-2xl font-bold mb-5">Login</h1>
            data={data?.auth_data}<br/>
            data={data?.status}
            <br/>
            error={error}
            <TextInput  name="email" id="user-email" type="email" className="mb-5" onChange={(e)=> setUser({...user,email:e.target.value})}/>
            <TextInput  name="password" id="user-password" type="password" className="mb-5" onChange={(e)=> setUser({...user,password:e.target.value})}/>

            <DefaultButton onClick={()=> trigger(user)}>Login</DefaultButton>

        </form>
    </>
  )
}