import React from 'react'

function ModuleSidebar(props) {
  const {children, title} = props
  return (
    <div>
      { children && (
        <div className='w-full md:w-96 bg-gray-50 dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 rounded-xl'>
          <h2 className='mb-5 text-lg text-gray-500 dark:text-neutral-400'>{title}</h2>
          <div>
            {children}
          </div>
        </div>
      ) }
    </div>
    
  )
}

export default ModuleSidebar