import React from 'react'

function Button({children,type= 'button', bgColor = 'bg-gradient-to-r from-blue-500 to-purple-600', textColor = 'text-white', className = '',...props}) {

  return (
    <button
      type={type}
      className={`inline-block px-8 py-3 duration-200 rounded-xl font-semibold shadow-lg hover:shadow-xl ${bgColor} ${textColor} hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button