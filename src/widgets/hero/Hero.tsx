import { useHeroSlider } from './useHeroSlider.ts'
import { BUTTON_LABELS } from './constants.ts'

function Hero(): React.JSX.Element {
  const { currentSlide, slides, goToSlide } = useHeroSlider()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64
      const elementPosition = element.offsetTop - headerHeight + 40
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="relative bg-gray-900 overflow-hidden h-screen w-full min-h-screen">
      {/* Фоновые изображения всех слайдов */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
      ))}

      {/* Контент поверх изображения */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white px-6 md:px-12 max-w-4xl hero-content">
          {/* Контейнер с фиксированной высотой для текста */}
          <div className="min-h-[280px] md:min-h-[320px] flex flex-col justify-center">
            <div
              key={currentSlide}
              className="animate-fade-in-up"
            >
              <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight animate-fade-in-up text-white min-h-[1.2em] flex items-center justify-center">
                {slides[currentSlide].title}
              </h1>
              <h2 className="text-lg md:text-3xl text-red-400 font-medium mb-4 md:mb-6 opacity-95 animate-fade-in-up min-h-[1.2em] flex items-center justify-center">
                {slides[currentSlide].subtitle}
              </h2>
              <p className="text-base md:text-xl text-gray-100 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto opacity-90 animate-fade-in-up min-h-[3em] flex items-center justify-center">
                {slides[currentSlide].description}
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

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 md:space-x-4 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ease-in-out transform ${
              index === currentSlide 
                ? 'bg-red-500 scale-125' 
                : 'bg-white/50 hover:bg-white/70 hover:scale-110'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
