import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import MenuList from '../constans/Menu'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'


function Search() {
  const { t } = useTranslation()

  const [searchKey, setSearch] = useState("")
  const [results, setResults] = useState([])

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
      child.key.toLowerCase().includes(keyword.toLowerCase()) ||
      child.path.toLowerCase().includes(keyword.toLowerCase())
    )
  
    setResults(filtered)
  }

  return (
    <div className='w-1/2 relative'>
      <div className='flex items-center relative'>
        <input 
          type="text"
          value={searchKey}
          onChange={(e) => {search(e)}}
          className='border border-gray-200 rounded-4xl h-10 text-xs px-3 text-gray-500 bg-gray-50 pr-8 w-full' 
          />
        <Icon name="magnifying-glass" type="light" className="absolute right-3 -translate-y-1/2 text-sm"></Icon>
      </div>
      {results.length > 0 && (
        <div className='w-full max-h-64 overflow-auto bg-white app-shadow rounded-xl p-3 absolute top-12 z-10'>
          {results.map(result => (
            <Link key={result.key} to={result.path} onClick={() => {setResults("")}}>
              <div className='p-2 text-sm hover:bg-gray-50 rounded-lg cursor-pointer flex'>
                <Icon name={result.icon} className="mr-2 text-sm"></Icon>
                {t(result.key)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search