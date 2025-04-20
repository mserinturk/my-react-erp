import React, { useState, useEffect } from 'react'
import Module from '../../layouts/module/Module'
import ModuleHeader from '../../layouts/module/ModuleHeader'
import ModuleBody from '../../layouts/module/ModuleBody'
import ModuleMain from '../../layouts/module/ModuleMain'
import AppButton from '../../components/ui/Button'
import AppFormRow from '../../components/ui/FormRow'
import Icon from '../../components/ui/Icon'
import { useTranslation } from 'react-i18next'
import {
  Stepper, Step, StepLabel, TextField, Select,
  MenuItem, RadioGroup, FormControlLabel, Radio, Button
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from '../../features/customer/CustomerSlice'
import { createOrder } from '../../features/order/OrderSlice'
import { useNavigate } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const productList = [
  { id: 1, name: 'Product A', price: 99.99, img: 'https://st-troy.mncdn.com/mnresize/775/775/Content/media/ProductImg/original/md1q4tua-iphone-16e-128gb-black-638756627887658242.jpg', ean: '1234567890123', qty: 100, sku: 'PRODA001' },
  { id: 2, name: 'Product B', price: 149.50, img: 'https://st-troy.mncdn.com/Content/media/ProductImg/original/mxwn3tua-iphone-16-plus-256gb-black-638617421087738143.jpg?width=785', ean: '9876543210987', qty: 200, sku: 'PRODB001' },
  { id: 3, name: 'Product C', price: 74.25, img: 'https://st-troy.mncdn.com/Content/media/ProductImg/original/myng3tua-iphone-16-pro-128gb-natural-titanium-638617386283887185.jpg?width=785', ean: '4567890123456', qty: 150, sku: 'PRODC001' }
]

function OrderCreate() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { customers } = useSelector((state) => state.customer)

  const [activeStep, setActiveStep] = useState(0)
  const [form, setForm] = useState({
    name: '',
    customer: {},
    order_note: '',
    products: [{ id: '', name: '', price: 0, quantity: 1 }],
    date: dayjs(),
    shipping_method: '',
    status: 'pending',
    invoice: false
  })

  useEffect(() => {
    dispatch(getCustomers())
  }, [dispatch])

  const steps = [
    t('views.order.step_customer'),
    t('views.order.step_products'),
    t('views.order.step_final'),
    t('views.order.step_preview')
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleCustomerSelect = (id) => {
    const selected = customers.find(c => c.id === id)
    setForm(prev => ({ ...prev, customer: selected || {} }))
  }

  const handleProductChange = (index, field, value) => {
    const updated = [...form.products]
    if (field === 'id') {
      const selected = productList.find(p => p.id === parseInt(value))
      updated[index] = {
        id: selected.id,
        name: selected.name,
        price: selected.price,
        quantity: 1,
        img: selected.img
      }
    } else {
      if (field === 'quantity') {
        value = value < 1 ? 1 : value
      }
      updated[index][field] = value
    }
    setForm(prev => ({ ...prev, products: updated }))
  }

  const addProduct = () => {
    setForm(prev => ({ ...prev, products: [...prev.products, { id: '', name: '', price: 0, quantity: 1 }] }))
  }

  const removeProduct = (index) => {
    const updated = form.products.filter((_, i) => i !== index)
    setForm(prev => ({ ...prev, products: updated }))
  }

  const handleNext = () => setActiveStep(prev => prev + 1)
  const handleBack = () => setActiveStep(prev => prev - 1)

  const save = async () => {
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000)
    const payload = {
      ...form,
      name: `ORD-${randomNumber}`,
      date: form.date.toISOString()
    }
  
    const result = await dispatch(createOrder(payload)).unwrap()
    navigate(`/order/${result.id}`)
  }

  const calculateTotalPrice = () => {
    return form.products.reduce((total, product) => {
      const price = parseFloat(product.price) || 0
      const quantity = parseInt(product.quantity) || 0
      return total + price * quantity
    }, 0).toFixed(2)
  }

  return (
    <Module>
      <ModuleHeader
        title={t('modules.orders.create')}
        icon="cart-shopping"
      >
      </ModuleHeader>
      <ModuleBody>
        <ModuleMain>
          <div className="flex flex-col h-full">
            <Stepper activeStep={activeStep} className='bg-gray-50 rounded-xl py-5' alternativeLabel>
              {steps.map((label, i) => (
                <Step key={i}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>

            <div className='h-full mt-10 overflow-auto app-hide-scroll'>
              {activeStep === 0 && (
                <div className="flex flex-col">
                  <AppFormRow row={false} title={t('views.order.customer')} description={t('views.order.customer_description')}>
                    <Select fullWidth value={form.customer?.id || ''} onChange={(e) => handleCustomerSelect(e.target.value)}>
                      {customers.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                    </Select>
                  </AppFormRow>
                  <AppFormRow row={false} title={t('views.order.order_note')} description={t('views.order.order_note_description')}>
                    <TextField multiline minRows={3} fullWidth name="order_note" value={form.order_note} onChange={handleChange} />
                  </AppFormRow>
                </div>
              )}

              {activeStep === 1 && (
                <div className="flex flex-col">
                  {form.products.map((product, i) => (
                    <div key={i} className='border border-dashed border-gray-200 dark:border-neutral-700 rounded-xl p-5 mr-4 mb-6 relative'>
                      <div className='flex w-full'>
                        <AppFormRow row={false} title={t('views.order.product')} description={t('views.order.product_description')}>
                          <Select fullWidth value={product.id} onChange={(e) => handleProductChange(i, 'id', e.target.value)} className='mr-5'>
                            {productList.map(p => (
                              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                            ))}
                          </Select>
                          <TextField className='w-32' inputProps={{ min: 1 }} label={t('views.order.quantity')} type='number' value={product.quantity} onChange={(e) => handleProductChange(i, 'quantity', e.target.value)} />
                        </AppFormRow>
                      </div>
                      <div className='flex flex-col space-y-3 absolute -right-4 top-3'>
                        {i === form.products.length - 1 && (
                          <div onClick={addProduct} className='bg-gray-50 hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer'>
                            <Icon name="plus" className="text-xs"></Icon>
                          </div>
                        )}
                        {form.products.length > 1 && (
                          <div color="danger" onClick={() => removeProduct(i)} className='bg-red-50 hover:bg-red-100 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer'>
                            <Icon name="trash" className="text-xs text-red-500"></Icon>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeStep === 2 && (
                <div className="flex flex-col h-full">
                  <AppFormRow title={t('views.order.date')} description={t('views.order.date_description')}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={form.date}
                        onChange={(date) => setForm(prev => ({ ...prev, date }))}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </LocalizationProvider>
                  </AppFormRow>
                  <AppFormRow title={t('views.order.shipping_method')} description={t('views.order.shipping_method_description')}>
                    <TextField fullWidth name='shipping_method' value={form.shipping_method} onChange={handleChange} />
                  </AppFormRow>
                  <AppFormRow title={t('views.order.status')} description={t('views.order.status_description')}>
                    <RadioGroup row name='status' value={form.status} onChange={handleChange}>
                      <FormControlLabel value='pending' control={<Radio />} label={t('views.order.status_pending')} />
                      <FormControlLabel value='shipped' control={<Radio />} label={t('views.order.status_shipped')} />
                      <FormControlLabel value='delivered' control={<Radio />} label={t('views.order.status_delivered')} />
                    </RadioGroup>
                  </AppFormRow>
                  <AppFormRow title={t('views.order.invoice')} description={t('views.order.invoice_description')}>
                    <RadioGroup row name='invoice' value={form.invoice ? 'yes' : 'no'} onChange={(e) => setForm(prev => ({ ...prev, invoice: e.target.value === 'yes' }))}>
                      <FormControlLabel value='yes' control={<Radio />} label={t('yes')} />
                      <FormControlLabel value='no' control={<Radio />} label={t('no')} />
                    </RadioGroup>
                  </AppFormRow>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-8">
                  <div className="bg-white dark:bg-neutral-900 border-b py-6 border-gray-200 dark:border-neutral-700 flex justify-between px-3">
                    <p className="font-semibold text-gray-600 dark:text-gray-300">{form.customer.name || t('not_found')}</p>
                    <span className="text-sm font-semibold">
                      {calculateTotalPrice()} ₺
                    </span>
                  </div>

                  <div className="bg-white dark:bg-neutral-900">
                    <div className="space-y-4">
                      {form.products.map((product, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between border border-gray-100 dark:border-neutral-700 rounded-lg px-4 py-3"
                        >
                          <div className="flex items-center space-x-4">
                            {product.img ? (
                              <img src={product.img} alt={product.name} className="w-10 h-10 rounded object-cover" />
                            ) : (
                              <div className="w-10 h-10 bg-gray-100 dark:bg-neutral-700 rounded flex items-center justify-center text-xs text-gray-400">
                                {t('no_image')}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium">{product.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{product.quantity} × {product.price} ₺</p>
                            </div>
                          </div>
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {(product.quantity * product.price).toFixed(2)} ₺
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 space-y-4 shadow-sm border border-gray-100 dark:border-neutral-700">
                    {[
                      {
                        icon: "note-sticky",
                        label: t('views.order.order_note'),
                        value: form.order_note
                      },
                      {
                        icon: "calendar-days",
                        label: t('views.order.date'),
                        value: form.date.format('YYYY-MM-DD')
                      },
                      {
                        icon: "truck-fast",
                        label: t('views.order.shipping_method'),
                        value: form.shipping_method
                      },
                      {
                        icon: "circle-check",
                        label: t('views.order.status'),
                        value: t(`views.order.status_${form.status}`)
                      },
                      {
                        icon: "file-invoice",
                        label: t('views.order.invoice'),
                        value: form.invoice ? t('yes') : t('no')
                      }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-neutral-800 rounded-lg">
                            <Icon name={item.icon} className="text-gray-900 dark:text-neutral-100" type="thin"></Icon>
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                        <div className="text-sm text-right text-gray-700 dark:text-gray-300 max-w-[50%] truncate">
                          {item.value || <span className="italic text-gray-400">{t('not_available')}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className='flex justify-between mt-10'>
              <AppButton
                disabled={activeStep === 0}
                color="primary"
                prefixIcon="arrow-left"
                onClick={handleBack}
              >
                {t('back')}
              </AppButton>

              {activeStep < steps.length - 1 ? (
                <AppButton suffixIcon="arrow-right" onClick={handleNext}>
                  {t('next')}
                </AppButton>
              ) : (
                <AppButton prefixIcon="floppy-disk" onClick={save}>
                  {t('modules.orders.save')}
                </AppButton>
              )}
            </div>
          </div>
        </ModuleMain>
      </ModuleBody>
    </Module>
  )
}

export default OrderCreate