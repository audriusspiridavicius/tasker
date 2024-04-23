import React from 'react'
import Label from './form_elements/label'


export default function AuthorLabel({ children, ...props }:any) {
  return (
    <>
    <kbd {...props} className={`break-keep font-bold capitalize px-2 py-1.5 text-xs text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 ${props.className && props.className}`}>
        {children}
    </kbd>

    </>
  )
}