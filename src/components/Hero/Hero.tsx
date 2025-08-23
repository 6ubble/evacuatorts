import { useHeroSlider } from './useHeroSlider.ts'
import { BUTTON_LABELS } from './constants.ts'

function Hero(): React.JSX.Element {
  const { currentSlide, slides, goToSlide } = useHeroSlider()

  return (
    <section id="home" className="relative bg-gray-900 overflow-hidden h-screen w-full min-h-screen">
      {/* Фон */}
      <div className="absolute inset-0 bg-gray-900"></div>

      {/* Текущее изображение слайда */}
      <div className="relative z-10 h-full">
        <img 
          src={slides[currentSlide].image} 
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
        />
        
        {/* Затемнение */}
        <div className="absolute inset-0 bg-black/65"></div>
        
        {/* Контент поверх изображения */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4 md:px-8 max-w-5xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-xl md:text-3xl lg:text-4xl text-pink-200 font-semibold mb-6 md:mb-8 drop-shadow-lg">
              {slides[currentSlide].subtitle}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => {
                  const element = document.getElementById('order')
                  if (element) {
                    const headerHeight = window.innerWidth >= 768 ? 80 : 64
                    const elementPosition = element.offsetTop - headerHeight
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    })
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 md:py-5 px-8 md:px-10 rounded-full transition-colors duration-200 text-lg md:text-xl"
              >
                {BUTTON_LABELS.ORDER}
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('general-pricing')
                  if (element) {
                    const headerHeight = window.innerWidth >= 768 ? 80 : 64
                    const elementPosition = element.offsetTop - headerHeight
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    })
                  }
                }}
                className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 md:py-5 px-8 md:px-10 rounded-full transition-colors duration-200 text-lg md:text-xl"
              >
                {BUTTON_LABELS.PRICES}
              </button>
            </div>
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
