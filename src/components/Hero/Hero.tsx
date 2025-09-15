// Типы для компонента Hero
interface ButtonLabels {
  ORDER: string
  PRICES: string
}

// Константы для кнопок
const BUTTON_LABELS: ButtonLabels = {
  ORDER: "Заказать эвакуатор",
  PRICES: "Узнать цены"
}

function Hero(): React.JSX.Element {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64
      const elementPosition = element.offsetTop - headerHeight + 30
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="relative bg-gray-900 overflow-hidden h-screen w-full min-h-screen">
      {/* Статичное фоновое изображение */}
      <div className="absolute inset-0">
        <img 
          src='https://s3.twcstorage.ru/dcd39072-64d4703d-c6e7-4803-9e32-dea6459a0f17/images/Evacuator/hero.avif' 
          alt="Эвакуатор по всей России"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Контент поверх изображения */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white px-6 md:px-12 max-w-4xl hero-content">
          {/* Контейнер с фиксированной высотой для текста */}
          <div className="min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight animate-fade-in-up text-white min-h-[1.2em] flex items-center justify-center">
                Эвакуатор по всей России
              </h1>
              <h2 className="text-lg md:text-3xl text-red-400 font-medium mb-4 md:mb-6 opacity-95 animate-fade-in-up min-h-[1.2em] flex items-center justify-center">
                Круглосуточная эвакуационная служба
              </h2>
              <p className="text-base md:text-xl text-gray-100 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto opacity-90 animate-fade-in-up min-h-[3em] flex items-center justify-center">
                Быстрая и надежная эвакуация автомобилей в любое время суток
              </p>
            </div>
          </div>
          
          {/* Кнопки в отдельном контейнере с фиксированным позиционированием */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center animate-fade-in-up mt-8">
            <button 
              onClick={() => scrollToSection('order')}
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-200 text-base md:text-lg focus:outline-none min-w-[200px] md:min-w-[220px]"
            >
              {BUTTON_LABELS.ORDER}
            </button>
            <button 
              onClick={() => scrollToSection('general-pricing')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-200 text-base md:text-lg focus:outline-none border border-white/30 min-w-[200px] md:min-w-[220px]"
            >
              {BUTTON_LABELS.PRICES}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero