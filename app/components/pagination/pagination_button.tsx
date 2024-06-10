import React from 'react'

type Props = {}

export default function PaginationButton({current, children, onClick}) {
  return (
    <button onClick={onClick}
        className={`${!current && "text-blue-400"}  underline h-[30px] mr-2 ${current && " no-underline cursor-default text-black"}`} >
        {children}
    </button>
  )
}