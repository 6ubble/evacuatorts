import { useEffect } from 'react'
import type { MobileMenuProps } from './types'

function MobileMenu({ isOpen, onClose, scrollToSection }: MobileMenuProps): React.JSX.Element {
  // Блокируем скролл на body когда меню открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div className={`md:hidden fixed top-0 right-0 h-full w-full bg-white transform transition-transform duration-300 ease-in-out z-[60] ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">Меню</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center transition-colors duration-200"
            aria-label="Закрыть меню"
          >
            <div className="w-5 h-5 relative flex items-center justify-center">
              <span className="block h-0.5 w-5 bg-gray-600 transform rotate-45 absolute"></span>
              <span className="block h-0.5 w-5 bg-gray-600 transform -rotate-45 absolute"></span>
            </div>
          </button>
        </div>
        <div className="flex-1 py-6 px-6 flex flex-col justify-center items-center space-y-8">
          <button
            onClick={() => scrollToSection('services')}
            className="text-gray-900 hover:text-red-600 font-medium transition-colors duration-200 text-2xl"
          >
            Услуги
          </button>
          
          <div className="w-16 h-0.5 bg-red-500"></div>
          
          <button
            onClick={() => scrollToSection('general-pricing')}
            className="text-gray-900 hover:text-red-600 font-medium transition-colors duration-200 text-2xl"
          >
            Цены
          </button>
          
          <div className="w-16 h-0.5 bg-red-500"></div>
          
          <button
            onClick={() => scrollToSection('order')}
            className="text-gray-900 hover:text-red-600 font-medium transition-colors duration-200 text-2xl"
          >
            Заказать
          </button>
        </div>
        <div className="p-6 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium text-lg">Круглосуточно</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            +7 961 288-81-44
          </div>
          <div className="text-base text-gray-500">
            Звоните в любое время
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
