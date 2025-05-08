import React, { useEffect, useState } from 'react'
import Icon from '../components/ui/Icon'
import Search from '../components/Search'
import { useMobileMenu } from '../contexts/MobileMenuContext'
import { Link } from 'react-router-dom'

function Header() {
  const { openMobileMenu } = useMobileMenu()
  
  const settings = JSON.parse(localStorage.getItem('settings')) || {}

  const [menu, setMenu] = useState(settings.menu)
  
  const toggleMenu = (newMenu) => {
    setMenu(newMenu)
    const updatedSettings = { ...settings, menu: newMenu }
    localStorage.setItem('settings', JSON.stringify(updatedSettings))
    window.dispatchEvent(new Event('menuToggle'))
  }

  return (
    <div className='sm:h-20 h-16 flex items-center px-5 dark:bg-neutral-900'>
      <div className='w-fit'>
        {
          menu == 'open' ?
          <Icon name="bars-staggered" type="solid" className="!text-blue-600 !hidden lg:!block" onClick={()=>{toggleMenu('close')}}></Icon>
          :
          <div>
            <div className="!text-blue-600 hidden lg:block">
              <Icon name="bars" type="solid" onClick={()=>{toggleMenu('open')}}></Icon>
            </div>
          </div>
        }
         <div className="!text-blue-600 block lg:!hidden">
            <Icon name="bars" type="solid" onClick={openMobileMenu}></Icon>
          </div>
      </div>
      <div className='flex-1 lg:hidden flex justify-center'>
        <div className='w-fit'>
          <Link to={"/"} className='flex items-center justify-center space-x-1.5 w-fit'>
            <Icon name="superpowers" type="brands" className="!text-xl text-blue-600" />
            <span className='text-sm'>My React APP</span>
          </Link>
        </div>
      </div>
      <div className='lg:flex-1 flex justify-center'>
        <Search></Search>
      </div>
    </div>
  )
}

export default Header