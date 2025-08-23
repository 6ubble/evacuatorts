import { useState } from 'react'
import OrderForm from './OrderForm.tsx'
import type { OrderFormData } from '../../types/types.ts'
import { TelegramService } from '../../telegram/service.ts'

function OrderFormContainer(): React.JSX.Element {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '+7',
    vehicleType: '',
    location: '',
    description: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Сбрасываем статус при изменении формы
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Отправляем заказ в Telegram
      const result = await TelegramService.sendOrder(formData)
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        
        // Сброс формы при успешной отправке
        setFormData({
          name: '',
          phone: '',
          vehicleType: '',
          location: '',
          description: ''
        })
      } else {
        setSubmitStatus({ type: 'error', message: result.message })
      }
    } catch {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Произошла ошибка при отправке заказа. Попробуйте позже.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseSuccess = () => {
    setSubmitStatus({ type: null, message: '' })
  }

  return (
    <OrderForm
      formData={formData}
      isSubmitting={isSubmitting}
      submitStatus={submitStatus}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onCloseSuccess={handleCloseSuccess}
    />
  )
}

export default OrderFormContainer
