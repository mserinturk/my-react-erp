import React, { useEffect, useState } from 'react'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import { Link, useParams } from 'react-router-dom'
import AppButton from '../../components/ui/Button'
import AppLabel from '../../components/ui/Label'
import api from '../../services/API'
import { useTranslation } from 'react-i18next'
import Date from '../../components/ui/Date'
import AppCard from '../../components/ui/Card'
import Loading from '../../components/ui/Loading'
import ModuleMain from '../../layouts/module/ModuleMain'
import ModuleSidebar from '../../layouts/module/ModuleSidebar'

function OrderShow() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    api.get(`order/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err))
  }, [id])

  const calculateTotal = () => {
    return order?.products?.reduce((acc, p) => acc + (p.price * p.quantity), 0).toFixed(2)
  }

  if (!order) return <Loading />

  return (
    <Module>
      <ModuleHeader
        title={t('modules.orders.show')}
        icon="cart-shopping"
      >
        <Link to={`/order/create`}>
          <AppButton prefixIcon="circle-plus" mobileIcon={true}>
            <span className='hidden sm:block'>
              {t('modules.orders.create')}
            </span>
          </AppButton>
        </Link>
      </ModuleHeader>
      <ModuleBody>
        <ModuleMain>
          <AppCard header={order}>
            <div className="flex flex-col space-y-6">
              <AppLabel icon="user" title={t('views.order.customer')}>
                {order.customer?.name}
              </AppLabel>
              <AppLabel icon="note-sticky" title={t('views.order.order_note')}>
                {order.order_note}
              </AppLabel>
              <AppLabel icon="money-bill" title={t('views.order.total_price')}>
                {calculateTotal()} ₺
              </AppLabel>
              <AppLabel icon="calendar-days" title={t('views.order.date')}>
                <Date>{order.date}</Date>
              </AppLabel>
              <AppLabel icon="truck-fast" title={t('views.order.shipping_method')}>
                {order.shipping_method}
              </AppLabel>
              <AppLabel icon="circle-check" title={t('views.order.status')}>
                {t(`views.order.status_${order.status}`)}
              </AppLabel>
              <AppLabel icon="file-invoice" title={t('views.order.invoice')}>
                {order.invoice ? t('yes') : t('no')}
              </AppLabel>
            </div>
          </AppCard>
        </ModuleMain>
        <ModuleSidebar title={t('views.order.product_details')}>
          <div className="flex flex-col space-y-3">
            {order.products.map((p, i) => (
              <div key={i} className="flex items-center justify-between border border-gray-100 dark:border-neutral-700 rounded-xl p-4 bg-white dark:bg-neutral-900">
                <div className="flex items-center space-x-4">
                  {p.img ? (
                    <img src={p.img} alt={p.name} className="w-12 h-12 rounded object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded flex items-center justify-center text-xs text-gray-400">
                      {t('no_image')}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">{p.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {p.quantity} × {p.price} ₺
                    </span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-100">
                  {(p.price * p.quantity).toFixed(2)} ₺
                </div>
              </div>
            ))}
          </div>
        </ModuleSidebar>
      </ModuleBody>
    </Module>
  )
}

export default OrderShow