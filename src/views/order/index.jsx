import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import ModuleMain from '../../layouts/module/ModuleMain'
import { getOrders } from '../../features/order/OrderSlice'
import AppButton from '../../components/ui/Button'
import { Link } from 'react-router-dom'
import AppTable from '../../components/Table'
import { useTranslation } from 'react-i18next'
import Date from '../../components/ui/Date'
import { deleteOrder } from '../../features/order/OrderSlice'


function OrderIndex() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { orders, loading } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const calculateTotalPrice = (products = []) =>
    products.reduce((total, p) => total + (p.price * p.quantity), 0).toFixed(2)

  return (
    <Module>
      <ModuleHeader title={t('modules.orders.index')} icon="cart-shopping">
        <Link to={'/order/create'}>
          <AppButton prefixIcon="cart-shopping" mobileIcon={true}>
            <span className='hidden sm:block'>
              {t('modules.orders.create')}
            </span>
          </AppButton>
        </Link>
      </ModuleHeader>
      <ModuleBody>
        <ModuleMain>
          <AppTable
            loading={loading}
            rows={orders}
            module="order"
            headerCells={[
              t('views.order.name'), // <-- Buraya eklendi
              t('views.order.customer'),
              t('views.order.total_products'),
              t('views.order.total_price'),
              t('views.order.date'),
              t('views.order.status'),
              t('views.order.invoice'),
            ]}
            columnWidths={[120, 200, 100, 100, 120, 100, 100]}
            rowCells={(row) => [
              <Link to={`/order/${row.id}`} className="font-semibold truncate block">{row.name}</Link>,
              <Link to={`/order/${row.id}`} className="truncate block">{row.customer?.name}</Link>,
              row.products?.length || 0,
              `${calculateTotalPrice(row.products)} ₺`,
              <Date>{row.date}</Date>,
              t(`views.order.status_${row.status}`),
              row.invoice ? t('yes') : t('no')
            ]}
            deleteAction={deleteOrder}
          />
        </ModuleMain>
      </ModuleBody>
    </Module>
  )
}

export default OrderIndex