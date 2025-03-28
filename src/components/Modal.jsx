import React, { useState } from 'react'
import Icon from './Icon'
import PropTypes from 'prop-types'

function Modal(props) {
  const { visible, onClose, icon, title, description, children, footer } = props

  if(!visible) return null
  
  return (
    <div className='absolute w-full h-full bg-black/20 flex items-center justify-center'>
      <div className='app-modal bg-white rounded-lg flex flex-col'>
        <div className='flex justify-between p-5 app-shadow'>
          <div className='flex items-center space-x-3'>
            <Icon name={icon} type="light" className="text-2xl text-gray-700"></Icon>
            <div className='flex flex-col space-y-0'>
              <h2 className='font-semibold capitalize text-lg'>{title}</h2>
              <span className='text-xs text-gray-500'>{description}</span>
            </div>
          </div>
          <Icon name="xmark-circle" type="light" onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700"></Icon>
        </div>
        <div className='p-5 h-full overflow-auto'>
          {children}
        </div>
        {
          footer ? 
          <div className='h-20 border-t border-gray-100 flex items-center p-5'>
            {footer}
          </div>
          :
          null
        }
      </div>
    </div>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired
}

export default Modal
