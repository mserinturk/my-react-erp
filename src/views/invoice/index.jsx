import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import ModuleMain from '../../layouts/module/ModuleMain'
import AppButton from '../../components/ui/Button'
import { Link } from 'react-router-dom'
import AppTable from '../../components/Table'
import { useTranslation } from 'react-i18next'
import AppDate from '../../components/ui/Date'
import { getOrders } from '../../features/order/OrderSlice'

function InvoiceIndex() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { orders, loading } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const invoices = orders.filter(order => order.invoice)

  const calculateTotal = (products = []) =>
    products.reduce((total, p) => total + (p.price * p.quantity), 0).toFixed(2)

  return (
    <Module>
      <ModuleHeader title={t('modules.invoices.index')} icon="file-invoice">
        <Link to="/order">
          <AppButton prefixIcon="cart-shopping">{t('modules.orders.index')}</AppButton>
        </Link>
      </ModuleHeader>
      <ModuleBody>
        <ModuleMain>
          <AppTable
            loading={loading}
            deletable={false}
            rows={invoices}
            module="invoice"
            headerCells={[
              t('views.invoice.customer'),
              t('views.invoice.total_products'),
              t('views.invoice.total_price'),
              t('views.invoice.date'),
              t('views.invoice.status'),
            ]}
            columnWidths={[200, 120, 120, 120, 120]}
            rowCells={(row) => [
              <Link to={`/invoice/${row.id}`} className="font-semibold truncate block">{row.customer?.name}</Link>,
              row.products?.length || 0,
              `${calculateTotal(row.products)} ₺`,
              <AppDate>{row.date}</AppDate>,
              t(`views.order.status_${row.status}`)
            ]}
          />
        </ModuleMain>
      </ModuleBody>
    </Module>
  )
}

export default InvoiceIndex