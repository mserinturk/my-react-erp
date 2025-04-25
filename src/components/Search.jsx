import React, { useEffect, useState } from 'react'
import Icon from './ui/Icon'
import MenuList from '../constans/Menu'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Modal from './ui/Modal'


function Search() {
  const { t } = useTranslation()

  const [searchKey, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [visible, setVisible] = useState(false)

  const search = (e) => {
    const keyword = e.target.value
    setSearch(keyword)
    setSearch(e.target.value)

    if (keyword.trim() === "") {
      setResults([])
      return
    }

    const allChildren = MenuList.flatMap(menu => menu.children)

    const filtered = allChildren.filter(child =>
      t(child.key).toLowerCase().includes(keyword.toLowerCase()) ||
      child.path.toLowerCase().includes(keyword.toLowerCase())
    )

    setResults(filtered)
  }

  const completeSearch = () => {
    setSearch("")
    setVisible(false)
  }

  return (
    <div>
      <div className='flex lg:hidden'>
        <Icon name="magnifying-glass" onClick={() => { setVisible(true) }}></Icon>
      </div>
      <div className='w-96 relative hidden lg:block'>
        <div className='flex items-center relative'>
          <div
            onClick={() => { setVisible(true) }}
            className='border border-gray-200 rounded-4xl h-10 text-xs px-3 text-gray-500 bg-gray-50 dark:bg-neutral-800 dark:border-neutral-800 pr-8 w-full cursor-pointer'
          ></div>
          <Icon name="magnifying-glass" type="light" className="absolute right-3 -translate-y-1/2 text-sm"></Icon>
        </div>
      </div>
      <Modal
        visible={visible}
        size="mini"
        onClose={() => setVisible(false)}
        icon="magnifying-glass"
        title={t('search')}
      >
        <div className='relative'>
          <div className='flex items-center relative mb-6'>
            <input
              onClick={() => { setVisible(true) }}
              type="text"
              value={searchKey}
              onChange={(e) => { search(e) }}
              className='border border-gray-200 rounded-4xl h-11 text-xs px-3 text-gray-500 dark:text-neutral-400 bg-gray-50 dark:bg-neutral-900 dark:border-neutral-800 pr-8 w-full'
            />
            <Icon name="magnifying-glass" type="light" className="absolute right-4 -translate-y-1/2 text-sm"></Icon>
          </div>
          {searchKey.length > 0 ?
            <div className='w-full max-h-52 overflow-auto rounded-xl p-3 app-shadow mt-2'>
              {results.length > 0
                ?
                (
                  results.map(result => (
                    <Link key={result.key} to={result.path} onClick={() => completeSearch()}>
                      <div className='p-3 text-sm rounded-lg cursor-pointer flex hover:bg-gray-50'>
                        <Icon name={result.icon} className="mr-2 text-sm" />
                        {t(result.key)}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className='text-xs text-gray-400 dark:text-neutral-500 px-2 py-1 flex space-x-2 items-center'>
                    <Icon name="ban" className="text-sm"></Icon>
                    {t('search_not_found_description')}<span className='font-semibold ml-1'>{searchKey}</span>
                  </div>
                )}
            </div>
            :
            <div>
              <h3 className='text-sm font-medium mb-3'>{t('popular_search')}</h3>
              <div className='grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-6'>
                <Link to={'/'} onClick={() => completeSearch()} className='border border-gray-200 dark:border-neutral-700 text-sm rounded-xl p-3 flex space-x-3 hover:bg-gray-50 dark:hover:bg-neutral-800'>
                  <Icon name="home" className="text-sm"></Icon>
                  <span>{t('menu.home')}</span>
                </Link>
                <Link to={'/customer'} onClick={() => completeSearch()} className='border border-gray-200 dark:border-neutral-700 text-sm rounded-xl p-3 flex space-x-3 hover:bg-gray-50 dark:hover:bg-neutral-800'>
                  <Icon name="users" className="text-sm"></Icon>
                  <span>{t('menu.customer')}</span>
                </Link>
                <Link to={'/order'} onClick={() => completeSearch()} className='border border-gray-200 dark:border-neutral-700 text-sm rounded-xl p-3 flex space-x-3 hover:bg-gray-50 dark:hover:bg-neutral-800'>
                  <Icon name="boxes" className="text-sm"></Icon>
                  <span>{t('menu.order')}</span>
                </Link>
              </div>
            </div>
          }
        </div>
      </Modal>
    </div>

  )
}

export default Search