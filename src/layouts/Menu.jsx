import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../components/Icon'
import MenuList from '../constans/Menu'
import Modal from '../components/Modal'
import { motion, AnimatePresence } from 'framer-motion'
import { useMobileMenu } from '../contexts/MobileMenuContext'
import { useThemeContext } from '../contexts/CustomThemeProvider'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { MenuItem, Select, Switch } from '@mui/material'

function Menu() {
  const { t } = useTranslation()
  const location = useLocation()
  const { theme, toggleTheme } = useThemeContext()

  const settings = JSON.parse(localStorage.getItem('settings')) || {}
  const [language, setLanguage] = useState(settings.language)
  const [visible, setVisible] = useState(false)
  const { mobileMenu, closeMobileMenu } = useMobileMenu()

  const activeGroupId = MenuList.find(menu =>
    menu.children.some(child =>
      location.pathname === child.path || location.pathname.startsWith(child.path + '/')
    )
  )?.id

  const [menuState, setMenuState] = useState(() => {
    const settings = JSON.parse(localStorage.getItem('settings')) || {}
    return settings.menu || 'open'
  })

  const changeLanguage = (language) => {
    setLanguage(language)
    const updatedSettings = { ...settings, language: language }
    localStorage.setItem('settings', JSON.stringify(updatedSettings))
    window.location.reload()
  }

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
      <div className='md:hidden'>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.1 }}
              className="fixed top-0 left-0 w-full h-full bg-white dark:bg-neutral-900 shadow-lg z-50 flex flex-col"
            >
              <div className='flex justify-between p-5 items-center border-b border-gray-200 dark:border-neutral-700'>
                <Link to={'/'} className='flex items-center justify-center space-x-1.5'>
                  <Icon name="superpowers" type="brands" className="!text-xl text-blue-600" />
                  <span className='text-sm'>My React APP</span>
                </Link>
                <Icon name="xmark" type="duotone" className="text-xl" onClick={closeMobileMenu} />
              </div>
              <div className="p-5 h-full">
                {MenuList.map(menu => (
                  <SimpleTreeView key={menu.key}>
                    <TreeItem itemId={menu.id} label={t(menu.key)} className='!pb-3'>
                      {menu.children.map(children => (
                        <Link key={children.key} to={children.path} onClick={closeMobileMenu} className='flex items-center pl-3'>
                          <Icon name={children.icon} className="!text-base"></Icon>
                          <TreeItem itemId={children.key} label={t(children.key)} className='!ml-2' />
                        </Link>
                      ))}
                    </TreeItem>
                  </SimpleTreeView>
                ))}
              </div>
              <div className='p-5 border-t border-gray-200 dark:border-neutral-800 flex space-x-3 items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <div className='bg-gray-50 dark:bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full'>
                    <Icon name="user" type="duotone"></Icon>
                  </div>
                  <span>
                    Mertcan Serintürk
                  </span>
                </div>
                <Icon name="gear" onClick={() => setVisible(true)}></Icon>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='hidden md:flex'>
        <div className={'h-full w-16 flex flex-col ' + `${menuState == 'open' ? 'border-r border-gray-200 dark:border-neutral-800' : 'border-none'}`}>
          <div className='flex h-20 items-center justify-center'>
            <Link to={'/'}>
              <Icon name="superpowers" type="brands" className="!text-2xl !text-blue-600" />
            </Link>
          </div>
          <div className="flex flex-col items-center flex-1 space-y-5 py-5">
            {MenuList.map((menu) => {
              const isActive = menu.id === activeGroupId
              return (
                <div key={menu.key}>
                  <Link to={menu.path}>
                    <div className={`rounded-lg p-2 hover:bg-blue-50 dark:hover:bg-blue-950 ${isActive ? 'bg-blue-50 dark:bg-blue-950 ' : ''}`}>
                      <Icon
                        name={menu.icon}
                        type="duotone"
                        className={`text-md transition-all w-5 text-center ${isActive ? '!text-blue-600 dark:text-blue-300' : ''}`}
                      />
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
          <div className='h-12 flex items-center justify-center'>
            <Icon name="gear" type="duotone" className="text-xl hover:text-gray-600 dark:hover:text-neutral-300" onClick={() => setVisible(true)} />
          </div>
        </div>

        <div className={`${menuState == 'open' ? 'w-64 px-5 transition-all dark:bg-neutral-900' : 'w-0 transition-all overflow-hidden'}`}>
          {MenuList.filter(menu => menu.id === activeGroupId).map((menu) => (
            <nav key={menu.key} className='h-full'>
              <div className='h-20 flex items-center'>{t(menu.key)}</div>
              <div className='py-5'>
                {menu.children.map((child) => (
                  <div key={child.key}>
                    <ul>
                      <li className='text-gray-500 dark:text-neutral-400 transition-all pb-6'>
                        <Link
                          to={child.path}
                          className={`${location.pathname.split('/')[1] === child.path.split('/')[1] ? '!text-blue-600 !pl-3' : ''} flex items-center space-x-2 hover:pl-3 transition-all`}
                        >
                          <div className='w-5 flex justify-center'>
                            <Icon name={child.icon} className={`${location.pathname.split('/')[1] === child.path.split('/')[1] ? '!text-blue-600' : ''}`} type="duotone"/>
                          </div>
                          <span className='ml-1 text-sm'>{t(child.key)}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          ))}
        </div>
      </div>

      <Modal
        visible={visible}
        size="large"
        onClose={() => setVisible(false)}
        icon="gear"
        title={t('settings.settings_title')}
        description={t('settings.settings_description')}
      >
        <div className='flex justify-between mb-5 border-b border-gray-50 dark:border-neutral-700 p-5'>
          <div className='flex items-center space-x-5'>
            <Icon name="globe" className="!text-xl w-5 text-center"></Icon>
            <div>
              <h2 className='font-semibold text-sm'>{t('settings.select_language')}</h2>
              <span className='text-xs text-gray-500 dark:text-neutral-400'>
                {t('settings.select_language_description')}
              </span>
            </div>
          </div>
          <Select
            className='w-36 !text-sm'
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem className='!text-sm' value='en'>
              {t('settings.english')}
            </MenuItem>
            <MenuItem className='!text-sm' value='tr'>
              {t('settings.turkish')}
            </MenuItem>
          </Select>
        </div>
        <div className='flex justify-between p-5'>
          <div className='flex items-center space-x-5'>
            {theme === 'light' ?
              <Icon name="moon" type="duotone" className="w-5 text-center" />
              :
              <Icon name="sun-bright" type="duotone" className="w-5 text-center" />
            }
            <div>
              <h2 className='font-semibold text-sm'>{t('settings.dark_mode')}</h2>
              <span className='text-xs text-gray-500 dark:text-neutral-400'>
                {t('settings.dark_mode_description')}
              </span>
            </div>
          </div>
          <div className='flex items-center'>
            <Switch checked={theme === 'dark'} onChange={toggleTheme} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Menu
