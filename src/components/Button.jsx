import React from 'react'
import Icon from './Icon'

function Button(props) {
  const { children, prefixIcon, suffixIcon, onClick, disabled, color = 'default' } = props

  const baseClasses = 'px-5 py-3 rounded-xl text-xs flex items-center !space-x-2'
  const disabledClasses = 'opacity-50 cursor-not-allowed'
  
  const colorClasses = {
    default: 'bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-800 dark:text-neutral-200',
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600',
  }

  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`
          ${baseClasses}
          ${colorClasses[color] || colorClasses.default}
          ${disabled ? disabledClasses : 'cursor-pointer'}
        `}
      >
        {prefixIcon && <Icon name={prefixIcon} className="!text-xs" />}
        <span>{children}</span>
        {suffixIcon && <Icon name={suffixIcon} className="!text-xs" />}
      </button>
    </div>
  )
}

export default Button