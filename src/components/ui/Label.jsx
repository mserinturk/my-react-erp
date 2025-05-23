import React from 'react'
import Icon from '../ui/Icon'

function Label(props) {

  const {children, title, icon} = props

  return (
    <div className='flex items-center space-x-5'>
      <div className='bg-gray-50 dark:bg-neutral-800 p-3 rounded-lg w-12 flex justify-center'>
        <Icon name={icon}></Icon>
      </div>
      <div>
        <h2 className='font-semibold text-sm dark:text-neutral-500'>{title}</h2>
        <span className='text-sm text-gray-500 dark:text-neutral-300'>{children}</span>
      </div>
    </div>
  )
}

export default Label