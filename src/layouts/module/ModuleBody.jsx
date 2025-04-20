import React from 'react'

function ModuleBody(props) {

  const {children} = props

  return (
    <div className='h-full w-full overflow-auto py-5 md:space-x-6 flex flex-col md:flex-row app-hide-scroll'>
      {children}
    </div>
  )
}

export default ModuleBody