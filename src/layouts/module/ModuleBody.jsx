import React from 'react'

function ModuleBody(props) {

  const {children} = props

  return (
    <div className='h-full overflow-auto py-5'>
      {children}
    </div>
  )
}

export default ModuleBody