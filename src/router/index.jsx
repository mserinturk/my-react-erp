import { createBrowserRouter } from "react-router-dom"
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import User from '../pages/User'
import Todo from '../pages/Todo'
import Operation from '../pages/Operation'

export const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />,
    children: [
      {path: '/', element: <Home />},
      {path: '/user', element: <User />},
      {path: '/todo', element: <Todo />},
      {path: '/operation', element: <Operation />},
    ]
  },
])


