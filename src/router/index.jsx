import { createBrowserRouter } from "react-router-dom"
import MainLayout from '../layouts/MainLayout'
import Home from '../views/Home'

// Customer
import Customer from '../views/customer'
import CreateCustomer from '../views/customer/create'
import ShowCustomer from '../views/customer/show'

// Order
import Order from '../views/order'
import CreateOrder from '../views/order/create'
import ShowOrder from '../views/order/show'

export const router = createBrowserRouter([
  {
    path: '/', 
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },

      // Customer
      { path: '/customer', element: <Customer /> },
      { path: '/customer/create', element: <CreateCustomer /> },
      { path: '/customer/:id', element: <ShowCustomer /> },
      { path: '/customer/:id/edit', element: <CreateCustomer /> },

      // Order
      { path: '/order', element: <Order /> },
      { path: '/order/create', element: <CreateOrder /> },
      { path: '/order/:id', element: <ShowOrder /> },
      { path: '/order/:id/edit', element: <CreateOrder /> },
    ]
  },
])