import { VEHICLE_TYPES } from './constants.ts'
import { useFormContext } from 'react-hook-form'
import type { OrderFormSchema } from './schema'

interface OrderFormProps {
  isSubmitting: boolean
  submitStatus: {
    type: 'success' | 'error' | null
    message: string
  }
  onSubmit: (data: OrderFormSchema) => void
  onCloseSuccess: () => void
}

function OrderForm({ isSubmitting, submitStatus, onSubmit, onCloseSuccess }: OrderFormProps): React.JSX.Element {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useFormContext<OrderFormSchema>()
  const watchedVehicleType = watch('vehicleType')

  // Обработчик для строгого ввода телефона с +7
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
    
    // Запрещаем удаление +7 в начале
    if ((e.key === 'Backspace' || e.key === 'Delete') && input.selectionStart! <= 2) {
      e.preventDefault()
      return
    }
    
    // Запрещаем ввод символов перед +7 (позиция курсора 0 или 1)
    if (input.selectionStart! < 2 && !allowedKeys.includes(e.key)) {
      e.preventDefault()
      return
    }
    
    // Разрешаем только цифры после +7
    if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
      e.preventDefault()
    }
  }

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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Имя и телефон */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-3 py-2 border rounded-2xl focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-400'
                  }`}
                  placeholder="Введите ваше имя"
                />
                {errors.name && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                    {errors.name.message}
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
                  {...register('phone')}
                  onKeyDown={handlePhoneKeyDown}
                  maxLength={12}
                  className={`w-full px-3 py-2 border rounded-2xl focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-400'
                  }`}

                />
                {errors.phone && (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                    {errors.phone.message}
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
                    onClick={() => setValue('vehicleType', vehicle.id)}
                    className={`flex items-center p-2 border rounded-2xl cursor-pointer transition-colors ${
                      watchedVehicleType === vehicle.id 
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
              {errors.vehicleType && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                  {errors.vehicleType.message}
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
                {...register('location')}
                className={`w-full px-3 py-2 border rounded-2xl focus:outline-none transition-colors ${
                  errors.location ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-400'
                }`}
                placeholder="Укажите адрес или описание места"
              />
              {errors.location && (
                <div className="mt-1 text-sm text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                  {errors.location.message}
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
                {...register('description')}
                className={`w-full px-3 py-2 focus:outline-none rounded-2xl border resize-none transition-colors ${
                  errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-red-400'
                }`}
                placeholder="Опишите проблему с автомобилем..."
              />
              {errors.description && (
                <div className="mt-1 text-sm text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                  {errors.description.message}
                </div>
              )}
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
