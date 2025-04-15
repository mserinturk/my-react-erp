import React, { useState, useEffect } from 'react'
import Icon from './Icon'
import PropTypes from 'prop-types'

function Modal(props) {
  const { visible, size, onClose, icon, title, description, children, footer } = props

  const [value, setValue] = useState(0)

  return (
    <div className={`fixed inset-0 z-50 items-center justify-center ${visible ? 'flex' : 'hidden'} bg-black/20 dark:bg-black/80`}>
      <div className={'bg-white dark:bg-neutral-900 rounded-lg flex flex-col app-modal-' + size}>
        <div className='app-shadow'>
          <div className='flex justify-between p-5 dark:shadow-none dark:border-b dark:border-neutral-800'>
            <div className='flex items-center space-x-3'>
              <Icon name={icon} type="light" className="text-2xl" />
              <div className='flex flex-col space-y-0'>
                <h2 className='font-semibold capitalize text-lg'>{title}</h2>
                <span className='text-xs text-gray-500 dark:text-neutral-400'>{description}</span>
              </div>
            </div>
            <Icon name="xmark-circle" type="light" onClick={onClose} className="text-xl hover:text-gray-700 dark:hover:text-neutral-200 cursor-pointer" />
          </div>
        </div>

        <div className='p-5 h-full overflow-auto'>
          {children}
        </div>

        {footer && (
          <div className='h-20 border-t border-gray-100 dark:border-neutral-800 flex items-center p-5'>
            {footer}
          </div>
        )}
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
