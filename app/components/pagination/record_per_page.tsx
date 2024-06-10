import React from 'react'



type Props = {
    values:number[],
    default_value:number,
    onChange: (value:number) => void 
}



export default function RecordPerPpage({values, default_value, onChange}: Props) {
  
    return (
    <select defaultValue={values[values.indexOf(default_value)]} onChange={(event)=>onChange(Number(event.target.value))}>
        {values.map((value, index) => 
            <option key={index} value={value}>{value}</option>
        )}
    </select>
  )
}