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

  // Умный обработчик телефона - форматирует на лету
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Разрешаем только цифры, +, пробелы, дефисы, скобки
    value = value.replace(/[^\d+\s()-]/g, '')
    
    // Автоформатирование для удобства ввода
    const digits = value.replace(/\D/g, '')
    
    if (digits.length <= 1) {
      value = digits
    } else if (digits.length <= 4) {
      // +7 (XXX
      value = `+7 (${digits.slice(1)}`
    } else if (digits.length <= 7) {
      // +7 (XXX) XXX
      value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
    } else if (digits.length <= 9) {
      // +7 (XXX) XXX-XX
      value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    } else {
      // +7 (XXX) XXX-XX-XX
      value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
    }
    
    e.target.value = value
  }

  return (
    <section id="order" className="pt-16 pb-16">
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
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {/* Статус отправки - только для ошибок */}
          {submitStatus.type === 'error' && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full mr-3 bg-red-500 flex-shrink-0"></div>
                <span className="font-medium">{submitStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Имя и телефон */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 text-base ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
                  }`}
                  placeholder="Введите ваше имя"
                  autoComplete="given-name"
                />
                {errors.name && (
                  <div className="mt-2 text-sm text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.name.message}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-base font-semibold text-gray-700 mb-2">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 text-base ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <div className="mt-2 text-sm text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.phone.message}
                  </div>
                )}
              </div>
            </div>

            {/* Тип транспорта */}
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-3">
                Тип транспорта *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {VEHICLE_TYPES.map((vehicle) => (
                  <label 
                    key={vehicle.id}
                    className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-sm ${
                      watchedVehicleType === vehicle.id 
                        ? 'border-red-400 bg-red-50 shadow-sm' 
                        : 'border-gray-300 hover:border-red-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      {...register('vehicleType')}
                      value={vehicle.id}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{vehicle.name}</div>
                      <div className="text-sm text-red-600 mt-1">{vehicle.price}</div>
                    </div>
                    {watchedVehicleType === vehicle.id && (
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center ml-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
              {errors.vehicleType && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></div>
                  {errors.vehicleType.message}
                </div>
              )}
            </div>

            {/* Место эвакуации */}
            <div>
              <label htmlFor="location" className="block text-base font-semibold text-gray-700 mb-2">
                Место эвакуации *
              </label>
              <input
                type="text"
                id="location"
                {...register('location')}
                className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 text-base ${
                  errors.location 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
                }`}
                placeholder="Например: ул. Ленина, 10 или трасса М-5, км 150"
                autoComplete="street-address"
              />
              {errors.location && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></div>
                  {errors.location.message}
                </div>
              )}
            </div>

            {/* Описание проблемы */}
            <div>
              <label htmlFor="description" className="block text-base font-semibold text-gray-700 mb-2">
                Описание проблемы
              </label>
              <textarea
                id="description"
                rows={4}
                {...register('description')}
                className={`w-full px-4 py-3 focus:outline-none focus:ring-2 rounded-2xl border resize-vertical transition-all duration-200 text-base ${
                  errors.description 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-red-400 focus:ring-red-100'
                }`}
                placeholder="Опишите проблему: не заводится, спущено колесо, попал в ДТП и т.д."
              />
              {errors.description && (
                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></div>
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Кнопка отправки */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Отправляем...
                  </span>
                ) : (
                  'Отправить заказ'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Модалка успеха */}
      {submitStatus.type === 'success' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-gray-200 shadow-2xl">
            <div className="text-center">
              {/* Иконка успеха */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <div className="h-8 w-8 text-green-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Заголовок */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Заказ отправлен!
              </h3>
              
              {/* Сообщение */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                Мы получили ваш заказ и свяжемся с вами в ближайшее время
              </p>
              
              {/* Кнопка закрытия */}
              <button
                onClick={onCloseSuccess}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default OrderForm