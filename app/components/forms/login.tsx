'use client'
import React, { useContext, useState } from 'react'
import TextInput from '../form_elements/textinput'
import DefaultButton from '../buttons/defaultbutton'
import useLogin from '@/app/utils/login'
import type { User } from '@/app/types/user'
import { useForm } from 'react-hook-form'
import { useNavigate, } from "react-router-dom";
import { isAuthenticated } from '@/app/utils/authenticated'
import { AuthContext } from '../context/authentication'
import { GetLoggedUser } from '@/app/utils/get_users'



export default function Login() {
    const navigate = useNavigate();
    // const history = useHistory();
    const {authenticated, setAuthenticated, setUser}:{user:User} = useContext(AuthContext);
    const {data, error, trigger, isMutating} = useLogin()

    const [user, setUser1] = useState()
  
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:{email:"", password:""}})

    const onSubmit = async () => {
        const data = await trigger(user);
        if (data) {
            const logged = await GetLoggedUser();

            if(logged){
                setUser(logged);
                // navigate("/");
            }
        }

    }
    const onError = () => {console.log("error occured!!!!")}

    return (
    <>
        
        <form onSubmit={handleSubmit(onSubmit,onError)}> 
            <h1 className="text-2xl font-bold mb-5">Login</h1>

            <TextInput {...register("email", {required:"Email field is required!"})}  name="email" id="user-email" type="email" className="mb-5" onChange={(e)=> setUser1({...user,email:e.target.value})}/>
            {errors.email && 
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errors.email.message}
                </div>
            }

            <TextInput {...register("password", {required:`password field is required`, minLength:{value:4, message:"min length of password is 4"}})}  name="password" id="user-password" type="password" className="mb-5" onChange={(e)=> setUser1({...user,password:e.target.value})}/>
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