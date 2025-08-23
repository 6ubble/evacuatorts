import { useHeroSlider } from './useHeroSlider.ts'
import { BUTTON_LABELS } from './constants.ts'

function Hero(): React.JSX.Element {
  const { currentSlide, slides, goToSlide } = useHeroSlider()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64
      const elementPosition = element.offsetTop - headerHeight
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
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
      ))}


        
      {/* Контент поверх изображения */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white px-6 md:px-12 max-w-4xl">
          <div
            key={currentSlide}
            className="animate-fade-in-up"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-3xl text-red-300 font-medium mb-4 md:mb-6 opacity-90">
              {slides[currentSlide].subtitle}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto opacity-80">
              {slides[currentSlide].description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('order')}
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-200 text-base md:text-lg"
            >
              {BUTTON_LABELS.ORDER}
            </button>
            <button 
              onClick={() => scrollToSection('general-pricing')}
              className="border border-white/80 hover:bg-white/80 hover:text-gray-900 text-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-200 text-base md:text-lg"
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
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-200 ${
              index === currentSlide 
                ? 'bg-red-500' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
