import { json } from "stream/consumers";
import { makeRequest } from "../makerequest";
import { User } from "@/app/types/user";

export async function UpdateUser(user){



    let form_data = new FormData();
    form_data.append("email", user.email)
    form_data.append("first_name", user.first_name)
    form_data.append("last_name", user.last_name)
    form_data.append("profile_picture", user.profile_picture[0])
    form_data.append("is_staff", user.is_staff)

    const options = {
        method: "PUT",
        body: form_data
    }

    const user_update_response = await makeRequest(`http://127.0.0.1:8000/users/13/`,options, true)
    console.log(`user_update_response ${user_update_response}`)
    return user_update_response
}