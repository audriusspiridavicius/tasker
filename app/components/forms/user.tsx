import { User } from '@/app/types/user'
import React, { useState } from 'react'
import Textinput from '../form_elements/textinput'
import Container from '../containers/container'
import DefaultButton from '../buttons/defaultbutton'
import CustomLabel from '../customlabel'
import { useForm } from 'react-hook-form'
import { UpdateUser } from '@/app/utils/user/update_user'
import ErrorMessage from '../form_elements/error_message'
import Success from '../form_elements/success_message'
import SuccessMessage from '../form_elements/success_message'


export default function UserInfo({user}: any) {


    const [currentUser, SetCurrentUser]:[User,(user:User)=>void] = user
    const [saved, SetSaved] = useState(false)
    const { register, handleSubmit, formState:{errors} } = useForm(
        {defaultValues:
            {
                id:currentUser?.id,
                email:currentUser?.email,
                first_name:currentUser?.first_name,
                last_name:currentUser?.last_name,
                profile_picture:"",
                is_staff:false
            }})

    const handleValidForm = async (data) => {
        const updated_user:User = await UpdateUser(data)
        SetCurrentUser({...currentUser,...updated_user})
        SetSaved(true)
    }
    const handleError = () => {
        SetSaved(false)
        console.log(`error form `)
    }
    

    if(!currentUser) return "loading"
    return (
    <>
        <Container>

            <form onSubmit={handleSubmit(handleValidForm,handleError)}>
                
                <input {...register("id")} type="hidden" id="id" name="id" value={currentUser.id} />
                <input {...register("is_staff")} type="hidden" id="is_staff" name="is_staff" value={String(currentUser.is_staff)}/>
                <input {...register("email")} type="hidden" value={currentUser.email}/>
                <Container className="mb-10">
                    <Textinput  className="mb-5" id="email" name="email address" value={currentUser?.email} disabled/>
                </Container>
                

                <Textinput {...register("first_name",{required:" field is required"})} className="mb-5" id="first_name" name="First name" defaultValue={currentUser.first_name} />
                {errors.first_name && <ErrorMessage>{errors.first_name.message}</ErrorMessage>}
                <Textinput {...register("last_name",{required:true})} className="mb-5" id="last_name" name="last name" defaultValue={currentUser.last_name} />


                <Container className="my-10 p-0">
                    <img src={currentUser.profile_picture} alt="profile image" width={100} height={100} className='mb-2'/>
                    <input  {...register("profile_picture")} id="profile_picture" name="profile_picture" className=' w-full hover:cursor-pointer' type='file' accept='image/*' />
                    {errors.profile_picture && <ErrorMessage>{errors.profile_picture?.message}</ErrorMessage> }
               </Container>
                
                {currentUser.is_superuser &&
                    <Container>
                        <CustomLabel className="mr-2">superuser:{currentUser.is_superuser ? "yes" : "no"}</CustomLabel>

                        <CustomLabel className="mx-2">staff member:{currentUser.is_staff ? "yes" : "no"}</CustomLabel>
                        <CustomLabel className="mx-2">active:{currentUser.is_active ? "yes" : "no"}</CustomLabel>

                    </Container>
                }
                {saved && <SuccessMessage>User details was successfully saved</SuccessMessage>}
                <DefaultButton className="my-10 w-full" type="submit">Save</DefaultButton>

            </form>
        </Container>
       
    </>
  )
}