import Icon from '../../components/ui/Icon'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ModuleHeader(props) {
  const { children, title, icon } = props
  const navigate = useNavigate()

  return (
    <div className='mb-5 flex justify-between items-center'>
      <div className='flex items-center space-x-3'>
        <Icon onClick={() => navigate(-1)} name="chevron-left"></Icon>
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