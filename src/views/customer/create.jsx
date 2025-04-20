import React, { useState, useEffect } from 'react'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import ModuleMain from '../../layouts/module/ModuleMain'
import ModuleSidebar from '../../layouts/module/ModuleSidebar'
import AppButton from '../../components/Button'
import AppFormRow from '../../components/FormRow'
import { useDispatch } from 'react-redux'
import { createCustomer, updateCustomer } from '../../features/customer/CustomerSlice'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/API'
import { useTranslation } from 'react-i18next'
import {
  TextField, RadioGroup, Radio, FormControlLabel,
  Select, MenuItem, InputLabel, FormControl, TextareaAutosize
} from '@mui/material'

function Create() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    tax_number: "",
    tax_office: "",
    type: "",
    status: "active",
    contact_person: "",
    notes: "",
    country: ""
  })

  useEffect(() => {
    if (id) {
      api.get(`customer/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error("Veri alınamadı:", err))
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const save = async () => {
    if (id) {
      await dispatch(updateCustomer({ id, data: form }))
      navigate(`/customer/${id}`)
    } else {
      const newCustomer = await dispatch(createCustomer(form)).unwrap()
      navigate(`/customer/${newCustomer.id}`)
    }
  }

  return (
    <Module>
      <ModuleHeader
        title={!id ? t('modules.customers.create') : t('modules.customers.update')}
        icon="users"
      >
        <AppButton prefixIcon="save" onClick={save}>
          {id ? t('modules.customers.update') : t('modules.customers.save')}
        </AppButton>
      </ModuleHeader>
      <ModuleBody>
        <ModuleMain className='flex flex-1 flex-col'>
          <AppFormRow
            title={t('views.customer.type')}
            description={t('views.customer.type_description')}
          >
            <RadioGroup
              row
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <FormControlLabel value="individual" control={<Radio />} label={t('views.customer.type_individual')} />
              <FormControlLabel value="company" control={<Radio />} label={t('views.customer.type_company')} />
            </RadioGroup>
          </AppFormRow>
          <AppFormRow
            title={t('views.customer.name')}
            description={t('views.customer.name_description')}
          >
            <TextField name="name" value={form.name} onChange={handleChange} fullWidth />
          </AppFormRow>

          <AppFormRow
            title={t('views.customer.email')}
            description={t('views.customer.email_description')}
          >
            <TextField name="email" type="email" value={form.email} onChange={handleChange} fullWidth />
          </AppFormRow>

          <AppFormRow
            title={t('views.customer.phone')}
            description={t('views.customer.phone_description')}
          >
            <TextField name="phone" value={form.phone} onChange={handleChange} fullWidth />
          </AppFormRow>

          <AppFormRow
            title={t('views.customer.tax_number')}
            description={t('views.customer.tax_number_description')}
          >
            <TextField name="tax_number" value={form.tax_number} onChange={handleChange} fullWidth />
          </AppFormRow>

          <AppFormRow
            title={t('views.customer.tax_office')}
            description={t('views.customer.tax_office_description')}
          >
            <TextField name="tax_office" value={form.tax_office} onChange={handleChange} fullWidth />
          </AppFormRow>

          <AppFormRow
            title={t('views.customer.country')}
            description={t('views.customer.country_description')}
          >
            <TextField name="country" value={form.country} onChange={handleChange} fullWidth />
          </AppFormRow>

          <AppFormRow
            title={t('views.customer.address')}
            description={t('views.customer.address_description')}
          >
            <TextField
              name="address"
              value={form.address}
              onChange={handleChange}
              multiline
              minRows={3}
              fullWidth
            />
          </AppFormRow>
        </ModuleMain>
        <ModuleSidebar title={t('views.customer.sidebar_title')}>
          <AppFormRow
            row={false}
            title={t('views.customer.contact_person')}
            description={t('views.customer.contact_person_description')}
          >
            <TextField name="contact_person" value={form.contact_person} onChange={handleChange} fullWidth />
          </AppFormRow>
          <AppFormRow
            row={false}
            title={t('views.customer.notes')}
            description={t('views.customer.notes_description')}
          >
            <TextField
              name="notes"
              value={form.notes}
              onChange={handleChange}
              multiline
              minRows={3}
              fullWidth
            />
          </AppFormRow>
          <AppFormRow
            row={false}
            title={t('views.customer.status')}
            description={t('views.customer.status_description')}
          >
            <RadioGroup
              row
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <FormControlLabel value={true} control={<Radio />} label={t('views.customer.active')} />
              <FormControlLabel value={false} control={<Radio />} label={t('views.customer.inactive')} />
            </RadioGroup>
          </AppFormRow>
        </ModuleSidebar>
      </ModuleBody>
    </Module>
  )
}

export default Create