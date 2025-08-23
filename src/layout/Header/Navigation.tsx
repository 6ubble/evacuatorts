import type { NavigationProps } from '../../types/types.ts'

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

      {/* Номер телефона - виден на всех устройствах */}
      <div className="flex items-center space-x-2 group">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <div className={`text-xl md:text-2xl font-bold ${textColor} group-hover:text-red-400 transition-colors duration-200`}>
          +7 922 700-57-07
        </div>
      </div>
    </div>
  )
}

export default Navigation
