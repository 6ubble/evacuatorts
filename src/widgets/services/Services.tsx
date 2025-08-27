import { SERVICES_DATA } from './constants.ts'

function Services(): React.JSX.Element {
  // Функция для скролла к форме заказа (такая же как в header и pricing)
  const handleServiceCardClick = () => {
    const element = document.getElementById('order')
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64 // Высота header на разных экранах
      const elementPosition = element.offsetTop - headerHeight + 40
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Услуги эвакуатора
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полный спектр услуг по эвакуации транспорта по всей России
          </p>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="text-center">
              <div className="mb-4 flex justify-center">
                <img
                  src={service.image}
                  alt={service.title}
                  className="max-w-xs rounded-lg transition-transform duration-300"
                  id={`image-${service.id}`}
                />
              </div>

              <div
                className="inline-flex items-center justify-center px-4 py-2 border-2 border-gray-300 rounded-full transition-all duration-300 hover:bg-red-400 hover:border-red-400 hover:text-white cursor-pointer min-w-[200px] h-12"
                onClick={handleServiceCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleServiceCardClick()
                  }
                }}
                onMouseEnter={() => {
                  const image = document.getElementById(`image-${service.id}`)
                  if (image) image.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={() => {
                  const image = document.getElementById(`image-${service.id}`)
                  if (image) image.style.transform = 'scale(1)'
                }}
              >
                <h3 className="text-sm font-bold text-center leading-tight">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
