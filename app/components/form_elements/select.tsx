import React from 'react'
import Label from './label'

export default function Select({events = {}, values = [], id = "", title = "", selected_value = ""}:{values:string[], id:string, title:string, selected_value:string, events: any}) {
  
    return (
    <>
        <Label id={id} name={title}/>
        <select {...events} defaultValue={selected_value.toUpperCase()} id={id} 
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            
            {values.map((value)=>
                <option key={value} value={value}>{value}</option>
            )}

        </select>
    </>
  )
}