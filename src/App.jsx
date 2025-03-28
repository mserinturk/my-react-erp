import { RouterProvider } from "react-router-dom"
import {router} from './router/index'
import { useEffect } from "react"

function App() {

  useEffect(()=>{
    if(!localStorage.getItem('settings')){
      localStorage.setItem('settings', JSON.stringify({
        language: 'en',
        theme: 'light',
        menu: 'open'
      }))
    }
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
