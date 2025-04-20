import React from 'react'
import Icon from './Icon'

function FormRow(props) {

  const {children, title, description, row = true} = props

  return (
    <div className='w-full'>
      {
        row ?
        (
          <div className='flex flex-col sm:flex-row mb-12'>
            <div className='md:w-96'>
              <h3 className='text-gray-800 text-sm dark:text-neutral-300 font-semibold mb-1'>
                {title}
              </h3>
              <div className='w-full flex items-center sm:px-5 sm:hidden my-2'>
                {children}
              </div>
              <div className='flex space-x-1 items-center'>
                <Icon name="circle-info" className="text-xs mr-1"></Icon>
                <span className='text-sm text-gray-500 dark:text-neutral-400'>
                  {description}
                </span>
              </div>
            </div>
            <div className='w-full hidden items-center sm:px-5 sm:flex'>
              {children}
            </div>
          </div>
        )
        :
        (
          <div className='flex flex-col w-full mb-6'>
            <div className=''>
              <h3 className='text-gray-800 text-sm dark:text-neutral-300 font-semibold mb-1'>
                {title}
              </h3>
              <div className='w-full flex items-center my-2'>
                {children}
              </div>
              <div className='flex space-x-1 items-center'>
                <Icon name="circle-info" className="text-xs mr-1"></Icon>
                <span className='text-sm text-gray-500 dark:text-neutral-400'>
                  {description}
                </span>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default FormRow