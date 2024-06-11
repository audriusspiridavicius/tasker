import React from "react";
import Label from "./label";
import { forwardRef } from "react";

export default forwardRef(function TextInput(props:any,ref){
    return(
        <div>
            <Label id={props.id} name={props.name}/>
            <input ref={ref} {...props} defaultValue={props.defaultValue} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${props.className && `${props.className}`}`} 
            type={props.type ? props.type : "text"} id={props.id} 
            placeholder={props.placeholder && !props.defaultValue ? props.placeholder : `Enter your ${props.name}`} 
            name={props.id}
             />
        </div>
    )
})