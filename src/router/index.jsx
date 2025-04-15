import { createBrowserRouter } from "react-router-dom"
import MainLayout from '../layouts/MainLayout'
import Home from '../views/Home'
import User from '../views/User'
import Todo from '../views/Todo'
import Operation from '../views/Operation'
import Profile from '../views/Profile'
import Team from '../views/teams'
import CreateTeam from '../views/teams/create'
import ShowTeam from '../views/teams/show'

export const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />,
    children: [
      {path: '/', element: <Home />},
      {path: '/user', element: <User />},
      {path: '/todo', element: <Todo />},
      {path: '/operation', element: <Operation />},
      {path: '/profile', element: <Profile />},
      {path: '/teams', element: <Team />},
      {path: '/teams/create', element: <CreateTeam />},
      {path: '/teams/:id', element: <ShowTeam />},
      {path: '/teams/:id/edit', element: <CreateTeam />},
    ]
  },
])


