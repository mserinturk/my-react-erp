import React from 'react'

function Icon(props) {
  const {name = "", type = "light", className} = props
  return (
    <div>
      <i className={`fa-${type} fa-${name} ${className || ''}`}></i>
    </div>
  )
}

export default Icon