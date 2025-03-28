import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../components/Icon'
import MenuList from '../constans/Menu'
import Modal from '../components/Modal'

function Menu() {
  const { t } = useTranslation()
  const location = useLocation()

  const activeGroupId = MenuList.find(menu =>
    menu.children.some(child => location.pathname === child.path)
  )?.id

  const [visible, setVisible] = useState(false)

  const [menuState, setMenuState] = useState(() => {
    const settings = JSON.parse(localStorage.getItem('settings')) || {}
    return settings.menu || 'open'
  })

  useEffect(() => {
    const handleMenuToggle = () => {
      const settings = JSON.parse(localStorage.getItem('settings')) || {}
      setMenuState(settings.menu || 'open')
    }

    window.addEventListener('menuToggle', handleMenuToggle)
    return () => window.removeEventListener('menuToggle', handleMenuToggle)
  }, [])

  return (
    <div className='h-full flex'>
      <div className={'h-full w-16 flex flex-col '+ `${menuState == 'open' ? 'border-r border-gray-200' : 'border-none'}`}>
        <div className='flex h-20 items-center justify-center'>
          <Icon name="superpowers" type="brands" className="!text-2xl text-blue-600" />
        </div>

        <div className="flex flex-col items-center flex-1 space-y-5 py-5">
          {
            MenuList.map((menu) => {
              const isActive = menu.id === activeGroupId
              return (
                <div key={menu.key}>
                  <Link to={menu.path}>
                    <div className={`rounded-lg p-2 hover:bg-blue-50 ${isActive ? 'bg-blue-50 ' : ''}`}>
                      <Icon
                        name={menu.icon}
                        type="duotone"
                        className={`text-md transition-all w-5 text-center ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                      />
                    </div>
                  </Link>
                </div>
              )
            })
          }
        </div>
        <div className='h-12 flex items-center justify-center'>
          <Icon name="gear" type="duotone" className="text-xl text-gray-500 hover:text-gray-600" onClick={() => setVisible(true)}/>
        </div>
      </div>

      <div className={`${menuState == 'open' ? 'w-64 px-5 transition-all' : 'w-0 transition-all overflow-hidden'}`}>
        {
          MenuList.filter(menu => menu.id === activeGroupId).map((menu) => (
            <nav key={menu.key} className='h-full'>
              <div className='h-20 flex items-center'>{t(menu.key)}</div>
              <div className='py-5'>
              {
                menu.children.map((child) => (
                  <div key={child.key}>
                    <ul>
                      <li className='text-sm text-gray-500 hover:text-blue-600 transition-all pb-5'>
                        <Link
                          to={child.path}
                          className={`${location.pathname === child.path ? 'text-blue-600 pl-2' : ''} flex items-center space-x-2 hover:pl-2 transition-all`}
                        >
                          <div className='w-5 flex justify-center'>
                            <Icon name={child.icon} type="light" />
                          </div>
                          <span>{t(child.key)}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))
              }
              </div>
            </nav>
          ))
        }
      </div>

      <Modal 
        visible={visible} 
        onClose={() => setVisible(false)} 
        icon="gear" 
        title="Settings" 
        description="Bu alandan ayarları düzenleyebilirsiniz."
        footer="footer"
        >
          sadfasdf
      </Modal>
    </div>
  )
}

export default Menu