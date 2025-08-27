import { PRICING_DATA } from './constants.ts'

function GeneralPricing(): React.JSX.Element {
  return (
    <section id="general-pricing" className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Наши цены
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Стоимость эвакуации по всей России
          </p>
        </div>

        {/* Таблица цен */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-base font-semibold text-gray-900 uppercase tracking-wider">
                    Тип транспорта
                  </th>
                  <th className="px-6 py-4 text-left text-base font-semibold text-gray-900 uppercase tracking-wider">
                    Описание
                  </th>
                  <th className="px-6 py-4 text-right text-base font-semibold text-base font-semibold text-gray-900 uppercase tracking-wider">
                    Стоимость
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {PRICING_DATA.map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-semibold text-gray-900">
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-600">
                        {item.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-xl font-bold text-red-500">
                        {item.price}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GeneralPricing
