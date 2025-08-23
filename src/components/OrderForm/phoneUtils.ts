// Простые утилиты для работы с телефонными номерами

// Функция для форматирования номера телефона
export const formatPhoneNumber = (value: string): string => {
  // Убираем все нецифровые символы, кроме +
  const cleaned = value.replace(/[^\d+]/g, '')
  
  // Если поле пустое или содержит только +, возвращаем +7
  if (!cleaned || cleaned === '+') {
    return '+7'
  }
  
  // Если номер начинается с +7, оставляем как есть
  if (cleaned.startsWith('+7')) {
    // Ограничиваем длину до 12 символов (+7 + 10 цифр)
    if (cleaned.length > 12) {
      return cleaned.slice(0, 12)
    }
    return cleaned
  }
  
  // Если номер начинается с 7, добавляем +
  if (cleaned.startsWith('7')) {
    const result = '+' + cleaned
    return result.length > 12 ? result.slice(0, 12) : result
  }
  
  // Если номер начинается с 8, заменяем на +7
  if (cleaned.startsWith('8')) {
    const result = '+7' + cleaned.slice(1)
    return result.length > 12 ? result.slice(0, 12) : result
  }
  
  // Если номер начинается с 9 и имеет 10 цифр, добавляем +7
  if (cleaned.startsWith('9') && cleaned.length === 10) {
    const result = '+7' + cleaned
    return result.length > 12 ? result.slice(0, 12) : result
  }
  
  // Для всех остальных случаев добавляем +7
  const result = '+7' + cleaned
  return result.length > 12 ? result.slice(0, 12) : result
}

// Функция для проверки валидности номера телефона
export const isValidPhoneNumber = (value: string): boolean => {
  const cleaned = value.replace(/\D/g, '')
  // Проверяем, что номер содержит ровно 11 цифр
  return cleaned.length === 11
}

// Функция для получения подсказки о номере
export const getPhoneHint = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  
  if (cleaned.length === 0) {
    return 'Введите номер телефона'
  } else if (cleaned.length < 11) {
    return 'Неполный номер телефона'
  }
  
  return ''
}
