import React from 'react'

type Props = {}

export default function NamedContainer({children,...props}:any) {
  return (
    
    <fieldset {...props} className={`border border-1 rounded-xl p-5 my-5 ${props?.className}`}>
        <legend>{props.title}</legend>
        <div>
            {children}
        </div>
    </fieldset>

  )
}