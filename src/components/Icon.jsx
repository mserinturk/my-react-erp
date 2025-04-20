import React from 'react'

function Icon(props) {
  const {name = "", type = "light", className, size = "lg", onClick} = props
  return (
    <div>
      <i className={`fa-${type} fa-${name} text-${size} ${className || ''} ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}></i>
    </div>
  )
}


export default Icon