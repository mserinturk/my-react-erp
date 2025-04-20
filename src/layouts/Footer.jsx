import React from 'react'
import Icon from '../components/ui/Icon'
import Search from '../components/Search'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='h-12 w-full flex space-x-3 dark:bg-neutral-950'>
      <div className='flex-1 flex items-center justify-center'>
        <Link to={'/'}>
          <Icon name="home"></Icon>
        </Link>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <Search></Search>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <Link to={'/profile'}>
          <Icon name="user"></Icon>
        </Link>
      </div>
    </div>
  )
}

export default Footer