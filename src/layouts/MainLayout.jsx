import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/Header'


function MainLayout() {
  return (
    <div className='h-full flex flex-col'>
      <Header></Header>
      <div className='h-full p-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout