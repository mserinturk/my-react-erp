import React from 'react'
import Header from './Header'
import Main from './Main'
import Menu from './Menu'
import Footer from './Footer'

function MainLayout() {
  return (
    <div className='h-full flex'>
      <div>
        <Menu />
      </div>
      <div className='flex flex-col w-full dark:bg-neutral-900'>
        <Header />
        <Main />
        <div className="block sm:!hidden">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout