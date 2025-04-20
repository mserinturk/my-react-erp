import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/API'
import Loading from '../../components/Loading'
import Icon from '../../components/Icon'
import AppDate from '../../components/Date'
import { useTranslation } from 'react-i18next'

function InvoiceShow() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [invoice, setInvoice] = useState(null)

  useEffect(() => {
    api.get(`order/${id}`).then(res => setInvoice(res.data)).catch(console.error)
  }, [id])

  if (!invoice) return <Loading />

  const totalAmount = invoice.products.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <div className="w-full md:w-4/6 md:aspect-[21/30] bg-white dark:bg-neutral-900 rounded-b-lg mx-auto p-6 overflow-auto border border-gray-200 dark:border-neutral-700 rounded-xl">
      <div className="border-b border-gray-300 dark:border-neutral-700 py-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{invoice.name}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-neutral-300 md:mb-36">
        <div>
          <p className="text-gray-500 dark:text-neutral-500 uppercase mb-1">{t('views.order.customer')}</p>
          <p>{invoice.customer?.name}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-neutral-500 uppercase mb-1">{t('views.order.date')}</p>
          <p><AppDate>{invoice.date}</AppDate></p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-neutral-500 uppercase mb-1">{t('views.order.shipping_method')}</p>
          <p>{invoice.shipping_method}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-neutral-500 uppercase mb-1">{t('views.order.status')}</p>
          <p>{t(`views.order.status_${invoice.status}`)}</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="bg-gray-100 dark:bg-neutral-800 rounded-md px-4 py-2 grid grid-cols-4 text-xs font-semibold text-gray-600 dark:text-neutral-300 uppercase">
          <span>{t('views.order.product')}</span>
          <span className="text-center">{t('views.order.quantity')}</span>
          <span className="text-center">{t('views.order.price')}</span>
          <span className="text-center">{t('views.order.total')}</span>
        </div>
        {invoice.products.map((p, i) => (
          <div key={i} className="grid grid-cols-4 px-4 py-3 border-b border-gray-200 dark:border-neutral-700 text-sm text-gray-800 dark:text-neutral-100">
            <span>{p.name}</span>
            <span className="text-center">{p.quantity}</span>
            <span className="text-center">{p.price.toFixed(2)} ₺</span>
            <span className="text-center">{(p.quantity * p.price).toFixed(2)} ₺</span>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <div className="space-y-3 w-64">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-neutral-500">{t('views.order.total_price')}:</span>
            <span className="font-semibold">{totalAmount.toFixed(2)} ₺</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default InvoiceShow