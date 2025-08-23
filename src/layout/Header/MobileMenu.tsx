import type { MobileMenuProps } from '../../types/types.ts'

function MobileMenu({ isOpen, onClose, scrollToSection }: MobileMenuProps): React.JSX.Element {
  return (
    <div className={`md:hidden fixed top-0 right-0 h-full w-full bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-40 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Меню</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
          >
            <span className="sr-only">Закрыть меню</span>
            <div className="w-6 h-6 relative">
              <span className="block h-0.5 w-6 bg-current transform transition-all duration-300 origin-center rotate-45"></span>
              <span className="block h-0.5 w-6 bg-current transform transition-all duration-300 origin-center -rotate-45 -translate-y-0.5"></span>
            </div>
          </button>
        </div>
        <div className="flex-1 py-6 px-6 space-y-4">
          <button
            onClick={() => scrollToSection('services')}
            className="block text-gray-900 hover:text-pink-500 font-medium transition-colors duration-200 w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 text-base"
          >
            Услуги
          </button>
          <button
            onClick={() => scrollToSection('general-pricing')}
            className="block text-gray-900 hover:text-pink-500 font-medium transition-colors duration-200 w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 text-base"
          >
            Цены
          </button>
        </div>
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 font-medium">Круглосуточно</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            +7 922 700-57-07
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
