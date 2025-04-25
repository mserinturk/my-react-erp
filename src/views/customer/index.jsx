import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import ModuleMain from '../../layouts/module/ModuleMain'
import { getCustomers } from '../../features/customer/CustomerSlice'
import AppButton from '../../components/ui/Button'
import { Link } from 'react-router-dom'
import AppTable from '../../components/Table'
import { useTranslation } from 'react-i18next'
import Date from '../../components/ui/Date'
import { deleteCustomer } from '../../features/customer/CustomerSlice'

function CustomerIndex() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { customers, loading } = useSelector((state) => state.customer)

  useEffect(() => {
    dispatch(getCustomers())
  }, [dispatch])

  return (
    <Module>
      <ModuleHeader title={t('modules.customers.index')} icon="users">
        <Link to={'/customer/create'}>
          <AppButton prefixIcon="users" mobileIcon={true}>
            <span className='hidden sm:block'>
              {t('modules.customers.create')}
            </span>
            </AppButton>
        </Link>
      </ModuleHeader>
      <ModuleBody>
        <ModuleMain>
          <AppTable
            loading={loading}
            rows={customers}
            module="customer"
            headerCells={[
              t('views.customer.name'),
              t('views.customer.type'),
              t('views.customer.phone'),
              t('views.customer.country'),
              t('views.customer.status'),
              t('views.customer.created_at'),
            ]}
            columnWidths={[150, 200, 150, 150, 100, 100]}
            rowCells={(row) => [
              <Link to={`/customer/${row.id}`} className="font-semibold truncate block">{row.name}</Link>,
              t(`views.customer.type_${row.type}`),
              row.phone,
              row.country,
              t(`views.customer.status_${row.status}`),
              <Date>{row.createdAt}</Date>
            ]}
            deleteAction={deleteCustomer}
          />
        </ModuleMain>
      </ModuleBody>
    </Module>
  )
}

export default CustomerIndex