import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { orderFormSchema, type OrderFormSchema } from './schema'
import { useState } from 'react'
import { TelegramService } from '../../shared/telegram/service'
import type { OrderFormData } from './types'

export const useOrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const form = useForm<OrderFormSchema>({
    resolver: yupResolver(orderFormSchema),
    defaultValues: {
      name: '',
      phone: '+7',
      vehicleType: '',
      location: '',
      description: ''
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: OrderFormSchema) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Преобразуем данные в формат для Telegram
      const orderData: OrderFormData = {
        name: data.name,
        phone: data.phone,
        vehicleType: data.vehicleType,
        location: data.location,
        description: data.description
      }

      // Отправляем заказ в Telegram
      const result = await TelegramService.sendOrder(orderData)
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        
        // Сброс формы при успешной отправке
        form.reset()
      } else {
        setSubmitStatus({ type: 'error', message: result.message })
      }
    } catch (error) {
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

  return {
    form,
    isSubmitting,
    submitStatus,
    onSubmit,
    handleCloseSuccess
  }
}
