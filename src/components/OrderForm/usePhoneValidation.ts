import { useState } from 'react'
import { isValidPhoneNumber, getPhoneHint, formatPhoneNumber } from './phoneUtils.ts'

export const usePhoneValidation = (onInputChange: (field: 'phone', value: string) => void) => {
  const [phoneError, setPhoneError] = useState<string>('')
  const [phoneTouched, setPhoneTouched] = useState<boolean>(false)

  // Обработчик изменения номера телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const value = input.value
    
    // Если пользователь удаляет символы и остается только +, не форматируем
    if (value === '+' || value === '') {
      onInputChange('phone', '+7')
      return
    }
    
    const formattedValue = formatPhoneNumber(value)
    onInputChange('phone', formattedValue)
    
    // Валидируем номер если поле уже было в фокусе
    if (phoneTouched) {
      validatePhone(formattedValue)
    }
  }

  // Валидация номера телефона
  const validatePhone = (phone: string): boolean => {
    if (!phone || phone === '+7') {
      setPhoneError('Введите номер телефона')
      return false
    }
    
    if (!isValidPhoneNumber(phone)) {
      setPhoneError('Введите корректный номер телефона')
      return false
    }
    
    setPhoneError('')
    return true
  }

  // Обработчик потери фокуса
  const handlePhoneBlur = (phone: string) => {
    setPhoneTouched(true)
    validatePhone(phone)
  }

  // Сброс ошибки
  const resetPhoneError = () => {
    setPhoneError('')
    setPhoneTouched(false)
  }

  // Получение подсказки для номера
  const getPhoneHintText = (phone: string): string => {
    if (!phone || phone === '+7') return ''
    return getPhoneHint(phone)
  }

  return {
    phoneError,
    phoneTouched,
    validatePhone,
    handlePhoneChange,
    handlePhoneBlur,
    resetPhoneError,
    getPhoneHintText
  }
}
