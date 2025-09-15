import type { NavigationProps } from './types'

function Navigation({ scrollToSection }: NavigationProps): React.JSX.Element {
  const textColor = 'text-white'
  const hoverBorder = 'hover:border-red-300'
  
  return (
    <div className="flex items-center justify-between w-full">
      {/* Левая навигация - скрыта на мобильных, видна на md+ */}
      <nav className="hidden md:flex space-x-8">
        <button 
          onClick={() => scrollToSection('services')}
          className={`${textColor} ${hoverBorder} font-medium transition-all duration-300 text-xl px-4 py-2 border border-transparent rounded-xl`}
        >
          Услуги
        </button>
        <button 
          onClick={() => scrollToSection('general-pricing')}
          className={`${textColor} ${hoverBorder} font-medium transition-all duration-300 text-xl px-4 py-2 border border-transparent rounded-xl`}
        >
          Цены
        </button>
        <button 
          onClick={() => scrollToSection('order')}
          className={`${textColor} ${hoverBorder} font-medium transition-all duration-300 text-xl px-4 py-2 border border-transparent rounded-xl`}
        >
          Заказать
        </button>
      </nav>

      {/* Номера телефонов - видимы на всех устройствах */}
      <div className="flex flex-col items-end space-y-3">
        <a href="tel:+79612888144" className="flex items-center space-x-2 group">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className={`text-xl md:text-2xl font-bold ${textColor} group-hover:text-red-400 transition-colors duration-200`}>
            +7 961 288-81-44
          </div>
        </a>
        <a href="tel:+79185528686" className="flex items-center space-x-2 group">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className={`text-xl md:text-2xl font-bold ${textColor} group-hover:text-red-400 transition-colors duration-200`}>
            +7 918 552-86-86
          </div>
        </a>
      </div>
    </div>
  )
}

export default Navigation
