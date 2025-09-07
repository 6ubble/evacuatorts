import { PRICING_DATA } from './constants.ts'

function GeneralPricing(): React.JSX.Element {
  // Функция для скролла к форме заказа (такая же как в header и pricing)
  const handlePricingCardClick = () => {
    const element = document.getElementById('order')
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64 // Высота header на разных экранах
      const elementPosition = element.offsetTop - headerHeight + 30
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="general-pricing" className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Наши цены
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Стоимость эвакуации по всей России
          </p>
        </div>

        {/* Карточки цен */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING_DATA.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:border-red-300 cursor-pointer h-48 flex flex-col justify-between"
              onClick={handlePricingCardClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handlePricingCardClick()
                }
              }}
            >
              {/* Заголовок карточки */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
              </div>

              {/* Цена */}
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">
                  {item.price}
                </div>
              </div>

              {/* Описание */}
              <div className="text-center">
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>

              {/* Декоративная линия */}
              <div className="pt-4 border-t border-gray-100">
                <div className="w-16 h-1 bg-red-400 mx-auto rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GeneralPricing
