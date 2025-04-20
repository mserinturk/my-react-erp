import React from 'react'
import Icon from './Icon'
import Date from './Date'

function Card(props) {
  const {children, header} = props
  return (
    <div>
      {
        header && (
          <div className='py-5 bg-gray-50 dark:bg-neutral-800 rounded-t-xl flex flex-col sm:flex-row sm:items-center justify-between px-5'>
            <div>
              <h2 className='text-lg font-semibold'>{header.name}</h2>
              <span className='text-sm text-gray-500 dark:text-neutral-400'># {header.id}</span>
            </div>
            <div className='flex space-x-2 items-center'>
              <Icon name="calendar-days" className="!text-sm"></Icon>
              <span className='text-sm'>
                <Date>{header.createdAt}</Date>
              </span>
            </div>
          </div>
        )
      }
      
      <div className='border border-gray-50 dark:border-neutral-800 p-5'>
        {children}
      </div>
    </div>
  )
}

export default Card