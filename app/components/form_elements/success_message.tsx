import React from 'react'

export default function SuccessMessage({children}) {
  
if (!children) return ""  
return (
    <div className="p-4 mb-4 text-sm text-green-900 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 border border-green-400" role="alert">
        {children}
    </div>
  )
}