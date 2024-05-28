'use client'
import React, { useState } from 'react'
import TextInput from '../form_elements/textinput'
import DefaultButton from '../buttons/defaultbutton'
import useLogin from '@/app/utils/login'
import type { User } from '@/app/types/user'
import { useForm } from 'react-hook-form'



export default function Login() {
    const {data, error, trigger, isMutating} = useLogin()

    const [user, setUser] = useState()
  
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:{email:"", password:""}})

    const onSubmit = () => {trigger(user)}
    const onError = () => {console.log("error occured!!!!")}

    return (
    <>
        
        <form onSubmit={handleSubmit(onSubmit,onError)}> 
            <h1 className="text-2xl font-bold mb-5">Login</h1>

            <TextInput {...register("email", {required:"Email field is required!"})}  name="email" id="user-email" type="email" className="mb-5" onChange={(e)=> setUser({...user,email:e.target.value})}/>
            {errors.email && 
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errors.email.message}
                </div>
            }

            <TextInput {...register("password", {required:`password field is required`, minLength:{value:4, message:"min length of password is 4"}})}  name="password" id="user-password" type="password" className="mb-5" onChange={(e)=> setUser({...user,password:e.target.value})}/>
            {errors.password &&
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errors.password.message}
                </div>
            }
            
            {data?.detail && 

            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Something went wrong!</span> {data?.detail}
            </div>}
            
            
            {error && 

                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Something went wrong!</span> {error}
                </div>
            }

            <DefaultButton  disabled={isMutating} type="submit">
                
            {isMutating ? "Logging in...": "Login"}
            </DefaultButton>

        </form>
    </>
  )
}