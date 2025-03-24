import { createBrowserRouter } from "react-router-dom"
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import About from '../pages/About'

export const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />,
    children: [
      {path: '/', element: <Home />},
      {path: '/about', element: <About />}
    ]
  },
])


