import React from 'react'
import Icon from './Icon'

function Button(props) {
  const {children, prefixIcon, onClick} = props

  return (
    <div>
      <button className='bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 px-5 py-3 rounded-xl text-xs dark:text-neutral-200 flex items-center !space-x-2 cursor-pointer' onClick={onClick}>
        <Icon name={prefixIcon} className="!text-xs"></Icon>
        <span>
          {children}
        </span>
      </button>
    </div>
  )
}

export default Button