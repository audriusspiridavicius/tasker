import React from "react";
import Label from "./label";
export default function TextInput(props:any){
    return(
        <div>
            <Label id={props.id} name={props.name}/>
            <input {...props} defaultValue={props.defaultValue} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${props.className && `${props.className}`}`} 
            type="text" id={props.id} 
            placeholder={props.placeholder? props.placeholder : `Enter your ${props.name}`} 
             />
        </div>
    )
}