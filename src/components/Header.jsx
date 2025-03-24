import React from 'react'
import Icon from './Icon'

function Header() {
  return (
    <div className='h-20 app-shadow flex items-center px-10'>
      <Icon name="superpowers" type="brands" className="text-2xl"></Icon>
      <h1 className='ml-2 font-semibold'>My React ERP</h1>
    </div>
  )
}

export default Header