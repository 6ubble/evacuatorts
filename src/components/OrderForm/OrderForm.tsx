import { VEHICLE_TYPES } from './constants.ts'
import type { OrderFormProps } from '../../types/types.ts'
import { usePhoneValidation } from './usePhoneValidation.ts'
import { useState } from 'react'

function OrderForm({ formData, isSubmitting, submitStatus, onInputChange, onSubmit, onCloseSuccess }: OrderFormProps): React.JSX.Element {
  const { phoneError, phoneTouched, handlePhoneChange, handlePhoneBlur, getPhoneHintText } = usePhoneValidation(onInputChange)
  const [showRequiredErrors, setShowRequiredErrors] = useState<boolean>(false)

  return (
    <section id="order" className="pt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Заказать эвакуацию
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Заполните форму и мы свяжемся с вами в ближайшее время
          </p>
        </div>

        {/* Форма */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          {/* Статус отправки - только для ошибок */}
          {submitStatus.type === 'error' && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full mr-3 bg-red-500"></div>
                <span className="font-medium">{submitStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault()
            setShowRequiredErrors(true)
            
            // Проверяем обязательные поля
            const hasEmptyFields = !formData.name.trim() || 
                                  formData.phone === '+7' || 
                                  !formData.vehicleType || 
                                  !formData.location.trim()
            
            // Если есть незаполненные поля, не отправляем форму
            if (hasEmptyFields) {
              return
            }
            
            // Если все поля заполнены, отправляем форму
            onSubmit(e)
          }} className="space-y-4">
            {/* Имя и телефон */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-2xl focus:outline-none transition-colors ${
                    showRequiredErrors && !formData.name.trim() 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-red-400'
                  }`}
                  placeholder="Введите ваше имя"
                />
                {showRequiredErrors && !formData.name.trim() && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                    Это поле обязательно
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={() => handlePhoneBlur(formData.phone)}
                  className={`w-full px-3 py-2 border rounded-2xl focus:outline-none transition-colors ${
                    (phoneError && phoneTouched) || (showRequiredErrors && (formData.phone === '+7' || phoneError !== ''))
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-red-400'
                  }`}
                  placeholder="+7"
                />
                {phoneError && phoneTouched && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                    {phoneError}
                  </div>
                )}
                {!phoneError && formData.phone && phoneTouched && formData.phone !== '+7' && getPhoneHintText(formData.phone) && (
                  <div className="mt-1 text-sm text-green-600 flex items-center">
                    <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                    {getPhoneHintText(formData.phone)}
                  </div>
                )}
                {showRequiredErrors && (formData.phone === '+7' || phoneError !== '') && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                    Это поле обязательно
                  </div>
                )}
              </div>
            </div>

            {/* Тип транспорта */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Тип транспорта *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {VEHICLE_TYPES.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    onClick={() => onInputChange('vehicleType', vehicle.id)}
                    className={`flex items-center p-2 border rounded-2xl cursor-pointer transition-colors ${
                      formData.vehicleType === vehicle.id 
                        ? 'border-red-400' 
                        : 'border-gray-300 hover:border-red-400'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{vehicle.name}</div>
                      <div className="text-xs text-red-500">{vehicle.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              {showRequiredErrors && !formData.vehicleType && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                  Это поле обязательно
                </div>
              )}
            </div>

            {/* Место эвакуации */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Место эвакуации *
              </label>
                              <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => onInputChange('location', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-2xl focus:outline-none transition-colors ${
                    showRequiredErrors && !formData.location.trim() 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-red-400'
                  }`}
                  placeholder="Укажите адрес или описание места"
                />
                {showRequiredErrors && !formData.location.trim() && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                    Это поле обязательно
                  </div>
                )}
              </div>

            {/* Описание проблемы */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Описание проблемы
              </label>
              <textarea
                id="description"
                rows={2}
                value={formData.description}
                onChange={(e) => onInputChange('description', e.target.value)}
                className="w-full px-3 py-2 focus:outline-none rounded-2xl border border-gray-300 resize-none"
                placeholder="Опишите проблему с автомобилем..."
              />
            </div>

            {/* Кнопка отправки */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-2xl transition-colors duration-200 text-base"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить заказ'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Модалка успеха */}
      {submitStatus.type === 'success' && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 border border-gray-200">
            {/* Заголовок */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Заказ отправлен
            </h3>
            
            {/* Сообщение */}
            <p className="text-gray-600 mb-6 text-center">
              Мы получили ваш заказ и свяжемся с вами в ближайшее время
            </p>
            
            {/* Кнопка закрытия */}
            <button
              onClick={onCloseSuccess}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-2xl transition-colors duration-200"
            >
              Понятно
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default OrderForm
