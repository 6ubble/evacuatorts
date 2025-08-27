import { VEHICLE_TYPES } from './constants.ts'
import { useFormContext } from 'react-hook-form'
import type { OrderFormSchema } from './schema'
import SuccessModal from './SuccessModal'

interface OrderFormProps {
  isSubmitting: boolean
  submitStatus: {
    type: 'success' | 'error' | null
    message: string
  }
  onSubmit: (data: OrderFormSchema) => void
  onCloseSuccess: () => void
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function OrderForm({ isSubmitting, submitStatus, onSubmit, onCloseSuccess, onPhoneChange }: OrderFormProps): React.JSX.Element {
  const { register, handleSubmit, formState: { errors }, watch } = useFormContext<OrderFormSchema>()
  const watchedVehicleType = watch('vehicleType')

  return (
    <section id="order" className="pt-16 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Заказать эвакуацию
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Заполните форму и мы свяжемся с вами в ближайшее время
          </p>
        </div>

        {/* Форма */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          {/* Статус отправки - только для ошибок */}
          {submitStatus.type === 'error' && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2 bg-red-500 flex-shrink-0"></div>
                <span className="font-medium text-sm">{submitStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Имя и телефон */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-all duration-200 text-sm ${
                    errors.name 
                      ? 'border-red-500' 
                      : 'border-gray-300 focus:border-red-400'
                  }`}
                  placeholder="Введите ваше имя"
                  autoComplete="given-name"
                />
                {errors.name && (
                  <div className="mt-1 text-xs text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-1 flex-shrink-0"></div>
                    {errors.name.message}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  onChange={onPhoneChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-all duration-200 text-sm ${
                    errors.phone 
                      ? 'border-red-500' 
                      : 'border-gray-300 focus:border-red-400'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <div className="mt-1 text-xs text-red-600 flex items-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full mr-1 flex-shrink-0"></div>
                    {errors.phone.message}
                  </div>
                )}
              </div>
            </div>

            {/* Тип транспорта */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Тип транспорта *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VEHICLE_TYPES.map((vehicle) => (
                  <label 
                    key={vehicle.id}
                    className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 h-10 ${
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
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 text-xs leading-tight">{vehicle.name}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.vehicleType && (
                <div className="mt-1 text-xs text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-1 flex-shrink-0"></div>
                  {errors.vehicleType.message}
                </div>
              )}
            </div>

            {/* Место эвакуации */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">
                Место эвакуации *
              </label>
              <input
                type="text"
                id="location"
                {...register('location')}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition-all duration-200 text-sm ${
                  errors.location 
                    ? 'border-red-500' 
                    : 'border-gray-300 focus:border-red-400'
                }`}
                placeholder="Например: ул. Ленина, 10 или трасса М-5, км 150"
                autoComplete="street-address"
              />
              {errors.location && (
                <div className="mt-1 text-xs text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-1 flex-shrink-0"></div>
                  {errors.location.message}
                </div>
              )}
            </div>

            {/* Описание проблемы */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                Описание проблемы
              </label>
              <textarea
                id="description"
                rows={3}
                {...register('description')}
                className={`w-full px-3 py-2 focus:outline-none rounded-lg border resize-none transition-all duration-200 text-sm ${
                  errors.description 
                    ? 'border-red-500' 
                    : 'border-gray-300 focus:border-red-400'
                }`}
                placeholder="Опишите проблему: не заводится, спущено колесо, попал в ДТП и т.д."
              />
              {errors.description && (
                <div className="mt-1 text-xs text-red-600 flex items-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full mr-1 flex-shrink-0"></div>
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Кнопка отправки */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[200px] max-w-full px-8 py-3 bg-red-400 hover:bg-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-200 text-base focus:outline-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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
        <SuccessModal onClose={onCloseSuccess} />
      )}
    </section>
  )
}

export default OrderForm