import React from 'react'

type Props = {}

export default function Label(props:any) {
  return (
   <>
    <label htmlFor={props.id} className={` capitalize w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white ${props.className && props.className}`}>{props.name}</label>
   </>
  )
}