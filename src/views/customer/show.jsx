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

function show() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    api.get(`customer/${id}`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error(err))
  }, [id])

  if (!customer) return <Loading></Loading>

  return (
    <Module>
      <ModuleHeader
        title={t('modules.customers.show')}
        icon="users"
      >
        <div className='flex space-x-3'>
          <Link to={'/customer/' + id + '/edit'}>
            <AppButton prefixIcon="pen-to-square">{t('modules.customers.edit')}</AppButton>
          </Link>
          <Link to={'/customer/create'}>
            <AppButton prefixIcon="circle-plus">{t('modules.customers.create')}</AppButton>
          </Link>
        </div>
      </ModuleHeader>
      <ModuleBody>
        <ModuleMain>
          <AppCard header={customer}>
            <div className='flex flex-col space-y-6'>
              <AppLabel icon="user-tie" title={t('views.customer.name')}>
                {customer.name}
              </AppLabel>
              <AppLabel icon="envelope" title={t('views.customer.email')}>
                {customer.email}
              </AppLabel>
              <AppLabel icon="phone" title={t('views.customer.phone')}>
                {customer.phone}
              </AppLabel>
              <AppLabel icon="location-dot" title={t('views.customer.address')}>
                {customer.address}
              </AppLabel>
              <AppLabel icon="building-columns" title={t('views.customer.tax_office')}>
                {customer.tax_office}
              </AppLabel>
              <AppLabel icon="file-invoice" title={t('views.customer.tax_number')}>
                {customer.tax_number}
              </AppLabel>
              <AppLabel icon="globe" title={t('views.customer.country')}>
                {customer.country}
              </AppLabel>
              <AppLabel icon="user-tag" title={t('views.customer.type')}>
                {t(`views.customer.type_${customer.type}`)}
              </AppLabel>
              <AppLabel icon="circle-check" title={t('views.customer.status')}>
                {t(`views.customer.status_${customer.status}`)}
              </AppLabel>
              <AppLabel icon="user" title={t('views.customer.contact_person')}>
                {customer.contact_person}
              </AppLabel>
              <AppLabel icon="note-sticky" title={t('views.customer.notes')}>
                {customer.notes}
              </AppLabel>
              <AppLabel icon="calendar-days" title={t('views.customer.created_at')}>
                <Date>{customer.created_at}</Date>
              </AppLabel>
            </div>
          </AppCard>
        </ModuleMain>
      </ModuleBody>
    </Module>
  )
}

export default show
