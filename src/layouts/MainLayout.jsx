import React from 'react'
import Header from './Header'
import Main from './Main'
import Menu from './Menu'

function MainLayout() {
  return (
    <div className='h-full flex'>
      <div>
        <Menu />
      </div>
      <div className='flex flex-col w-full dark:bg-neutral-900'>
        <Header />
        <Main />
      </div>
    </div>
  )
}

export default MainLayout