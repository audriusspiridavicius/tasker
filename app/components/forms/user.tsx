import { User } from '@/app/types/user'
import React from 'react'
import Textinput from '../form_elements/textinput'
import Container from '../containers/container'
import DefaultButton from '../buttons/defaultbutton'
import CustomLabel from '../customlabel'
import { useForm } from 'react-hook-form'
import { UpdateUser } from '@/app/utils/user/update_user'


export default function UserInfo({user}: any) {


    const [currentUser, SetCurrentUser] = user
    const { register, handleSubmit, formState:{errors} } = useForm(
        {defaultValues:
            {
                id:currentUser?.id,
                email:currentUser?.email,
                first_name:currentUser?.first_name,
                last_name:currentUser?.last_name,
                profile_picture:currentUser?.profile_picture,
                is_staff:false
            }})

    const handleValidForm = async (data) => {
        const updated_user:User = await UpdateUser(data)
        SetCurrentUser({...updated_user})
    }
    const handleError = () => {
        console.log(`error form `)
    }
    

    if(!currentUser) return "loading"
    return (
    <>
        <Container>

            <form onSubmit={handleSubmit(handleValidForm,handleError)}>
                
                <input {...register("id")} type="hidden" id="id" name="id" value={currentUser.id} />
                <input {...register("is_staff")} type="hidden" id="is_staff" name="is_staff" value={currentUser.is_staff}/>
                <Container className="mb-10">
                    <Textinput {...register("email")} className="mb-5" id="email" name="email address" value={currentUser?.email} />
                </Container>
                

                <Textinput {...register("first_name",{required:true})} className="mb-5" id="first_name" name="First name" defaultValue={currentUser.first_name} />
                <Textinput {...register("last_name",{required:true})} className="mb-5" id="last_name" name="last name" defaultValue={currentUser.last_name} onChange={(event)=>SetCurrentUser({...currentUser,last_name:event.target.value})}/>


                <Container className="my-10 p-0">
                    <img src={currentUser.profile_picture} alt="profile image" width={100} height={100} className='mb-2'/>
                    <input  {...register("profile_picture", {required:true})} id="profile_picture" name="profile_picture" className=' w-full hover:cursor-pointer' type='file' accept='image/*' />
                errors:{errors && errors.profile_picture?.message}
               </Container>
                <Container>
                    <CustomLabel className="mr-2">superuser:{currentUser.is_superuser ? "yes" : "no"}</CustomLabel>

                    <CustomLabel className="mx-2">staff member:{currentUser.is_staff ? "yes" : "no"}</CustomLabel>
                    <CustomLabel className="mx-2">active:{currentUser.is_active ? "yes" : "no"}</CustomLabel>

                </Container>

                <DefaultButton className="my-10 w-full" type="submit">Save</DefaultButton>

            </form>
        </Container>
       
    </>
  )
}