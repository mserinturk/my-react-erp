import React from 'react'

function Module(props) {

  const { children } = props

  return (
    <div className='h-full flex flex-col'>
      {children}
    </div>
  )
}

export default Module