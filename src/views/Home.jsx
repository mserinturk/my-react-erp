import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from '../features/customer/CustomerSlice'
import { getOrders } from '../features/order/OrderSlice'
import { Paper, Typography, Divider, Tooltip as MuiTooltip } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import AppDate from '../components/Date'
import Icon from '../components/Icon'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const COLORS = ['#6366f1', '#10b981', '#f97316']

function Home() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { customers } = useSelector((state) => state.customer)
  const { orders } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getCustomers())
    dispatch(getOrders())
  }, [dispatch])

  const today = new Date().toISOString().split('T')[0]
  const totalSalesToday = orders
    .filter(order => order.date.split('T')[0] === today)
    .reduce((sum, o) => sum + o.products.reduce((t, p) => t + p.price * p.quantity, 0), 0)

  const orderStatusChart = [
    { name: t('views.order.status_pending'), value: orders.filter(o => o.status === 'pending').length },
    { name: t('views.order.status_shipped'), value: orders.filter(o => o.status === 'shipped').length },
    { name: t('views.order.status_delivered'), value: orders.filter(o => o.status === 'delivered').length },
  ]

  const customerTypeChart = [
    { name: t('views.customer.type_individual'), value: customers.filter(c => c.type === 'individual').length },
    { name: t('views.customer.type_company'), value: customers.filter(c => c.type === 'company').length },
  ]

  const recentOrders = orders.slice(-5).reverse()
  const recentCustomers = customers.slice(-5).reverse()

  return (
    <div className="flex flex-col space-y-6">
      <div className='flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0'>
        <div className='p-6 rounded-xl bg-blue-900 w-full lg:w-2/3 relative overflow-hidden'>
          <span className='text-gray-400 dark:text-neutral-400 mb-1 block'>
            {today}
          </span>
          <div>
            <span className='text-gray-200 dark:text-neutral-100 text-2xl mr-2'>{t('welcome')}</span>
            <span className='text-2xl font-semibold text-gray-200 dark:text-white'>Mertcan</span>
          </div>
          <div>
            <Icon name="door-open" className="absolute top-3 right-3 !text-4xl text-white"></Icon>
          </div>
        </div>

        <div className='w-full lg:w-1/3 bg-orange-500 rounded-xl p-6 relative'>
          <h2 className='text-orange-200 font-semibold mb-1'>{t('views.dashboard.daily_balance')}</h2>
          <span className='text-orange-50'>
            {totalSalesToday.toFixed(2)} ₺
          </span>
          <Icon name="bullseye-arrow" className="absolute top-3 right-3 !text-4xl text-white"></Icon>
        </div>
      </div>
      
      <div className='flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0'>
        <div className='bg-gray-50 dark:bg-neutral-900 dark:border border-gray-200 dark:border-neutral-700 p-6 rounded-lg w-full lg:w-1/2'>
          <div className='flex items-center space-x-2'>
            <Icon name="chart-simple" /> 
            <h2 className='text-lg'>{t('views.order.status')}</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orderStatusChart} barGap={16}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='bg-gray-50 dark:bg-neutral-900 dark:border border-gray-200 dark:border-neutral-700 p-6 rounded-lg w-full lg:w-1/2'>
          <div className='flex items-center space-x-2'>
            <Icon name="users" /> 
            <h2 className='text-lg'>{t('views.customer.type')}</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={customerTypeChart}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {customerTypeChart.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row lg:space-x-6 space-y-3 lg:space-y-0'>
        <div className='flex flex-col space-y-3 w-full lg:w-1/3'>
          <div className='w-full bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 flex justify-between'>
            <div className='flex items-center space-x-3'>
              <Icon type="duotone" name="cart-shopping" />
              <div className='flex space-x-3 !items-center cursor-pointer'>
                <Link to="/order" className='hover:underline'>
                  <span>{t('modules.orders.index')}</span>
                </Link>
              </div>
            </div>
            <span className='font-semibold'>
              {orders.length}
            </span>
          </div>

          <div className='w-full bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 flex justify-between'>
            <div className='flex items-center space-x-3'>
              <Icon type="duotone" name="users" />
              <div className='flex space-x-3 items-center cursor-pointer'>
                <Link to="/customer" className='hover:underline'>
                  <span>{t('modules.customers.index')}</span>
                </Link>
              </div>
            </div>
            <span className='font-semibold'>
              {customers.length}
            </span>
          </div>

          <div className='w-full bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 flex justify-between'>
            <div className='flex items-center space-x-3'>
              <Icon type="duotone" name="file-invoice" />
              <div className='flex space-x-3 items-center cursor-pointer'>
                <Link to="/invoice" className='hover:underline'>
                  <span>{t('modules.invoices.index')}</span>
                </Link>
              </div>
            </div>
            <span className='font-semibold'>
              {
                orders.filter(o => o.invoice).length
              }
            </span>
          </div>

        </div>
        <div className='w-full lg:w-2/3 flex flex-col space-y-3 border border-gray-200 dark:border-neutral-700 rounded-lg p-6'>
          <div className='mb-3'>
            <div className='flex items-center pb-3 mb-3 border-b border-gray-200 dark:border-neutral-700'>
              <Icon name="clock-rotate-left" className="mr-2"/>
              <h2 className='font-semibold'>
                {t('modules.orders.index')} - {t('recent')}
              </h2>
            </div>
            <div className=''>
              {recentOrders.map(o => (
                <div key={o.id} className="flex justify-between text-sm mb-3">
                  <span>{o.customer?.name || t('not_found')}</span>
                  <AppDate>{o.date}</AppDate>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='flex items-center pb-3 mb-3 border-b border-gray-200 dark:border-neutral-700'>
              <Icon name="clock-rotate-left" className="mr-2" />
              <h2 className='font-semibold'>
                {t('modules.customers.index')} - {t('recent')}
              </h2>
            </div>
            <div>
              {recentCustomers.map(c => (
                <div key={c.id} className="flex justify-between text-sm mb-3">
                  <span>{c.name}</span>
                  <span>{t(`views.customer.type_${c.type}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home