import React from 'react'

const variants = {
  info: "bg-blue-100 text-blue-800 border-blue-300",
  success: "bg-green-100 text-green-800 border-green-300",
  danger: "bg-red-100 text-red-800 border-red-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  error: "bg-red-100 text-red-800 border-red-300",
}

const Message = ({variant = "info", children}) => {
  return (
    <div className={`border p-4 rounded-md ${variants[variant]}`} >
      {children}
    </div>
  )
}

export default Message