import React, { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import Search from '../components/Search'


function Header() {

  const settings = JSON.parse(localStorage.getItem('settings')) || {}

  const [theme, setTheme] = useState(settings.theme)
  const [menu, setMenu] = useState(settings.menu)

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    const updatedSettings = { ...settings, theme: newTheme }
    localStorage.setItem('settings', JSON.stringify(updatedSettings))
  }

  const toggleMenu = (newMenu) => {
    setMenu(newMenu)
    const updatedSettings = { ...settings, menu: newMenu }
    localStorage.setItem('settings', JSON.stringify(updatedSettings))
    window.dispatchEvent(new Event('menuToggle'))
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className='h-20 flex items-center px-5 dark:bg-gray-200'>
      <div className='w-fit'>
        {
          menu == 'open' ?
          <Icon name="chevron-left" type="solid" className="text-blue-600" onClick={()=>{toggleMenu('close')}}></Icon>
          :
          <Icon name="bars-staggered" type="solid" className="text-blue-600" onClick={()=>{toggleMenu('open')}}></Icon>
        }
      </div>
      <div className='flex-1 flex justify-center'>
        <Search></Search>
      </div>
      <div className='w-fit flex space-x-3'>
        {/* <Icon name="bell" type="duotone"></Icon> */}
        {
          theme == 'light' ?
          <Icon name="moon" type="duotone" className="text-gray-700 w-5" onClick={()=>{changeTheme('dark')}}></Icon>
          :
          <Icon name="sun-bright" type="duotone" className="text-gray-700 w-5" onClick={()=>{changeTheme('light')}}></Icon>
        }
        
        
      </div>
    </div>
  )
}

export default Header