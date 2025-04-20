import Icon from '../../components/ui/Icon'
import React from 'react'

function ModuleHeader(props) {
  const { children, title, icon } = props

  return (
    <div className='mb-5 flex justify-between items-center'>
      <div className='flex items-center space-x-3'>
        <Icon name={icon} type="duotone" className="!text-xl"></Icon>
        <h2 className='font-semibold text-lg'>
          {title}
        </h2>
      </div>
      <div>
        { children }
      </div>
    </div>
  )
}

export default ModuleHeader