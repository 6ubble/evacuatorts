function Footer(): React.JSX.Element {
  // Получаем текущий год
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center">
          <div className="text-gray-300 text-base md:text-lg">
            Эвакуатор по всей России - Все права защищены © {currentYear}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
