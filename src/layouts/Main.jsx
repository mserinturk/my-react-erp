import React from 'react'
import { Outlet } from "react-router-dom"

function Main() {
  return (
    <div className='overflow-auto h-full p-10 app-shadow rounded-tl-2xl'>
      <Outlet />
    </div>
  )
}

export default Main