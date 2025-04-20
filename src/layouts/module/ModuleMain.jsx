import React from 'react'

function ModuleMain(props) {
  const {children} = props
  return (
    <div className='w-full'>
      {children}
    </div>
  )
}

export default ModuleMain