import React from 'react'
import { Outlet } from "react-router-dom"

function Main() {
  return (
    <div className='overflow-auto h-full p-5 sm:p-10 app-shadow md:rounded-tl-2xl dark:bg-neutral-900 dark:border-t dark:border-l dark:border-neutral-800'>
      <Outlet />
    </div>
  )
}

export default Main