// Общие типы для всего проекта

// ===== VITE ENV TYPES =====
// Типы для переменных окружения Vite

// ===== HERO TYPES =====
export interface HeroSlide {
  id: number
  image: string
  title: string
  subtitle: string
  description: string
}

export interface ButtonLabels {
  ORDER: string
  PRICES: string
}

export interface UseHeroSliderReturn {
  currentSlide: number
  slides: HeroSlide[]
  nextSlide: () => void
  prevSlide: () => void
  goToSlide: (index: number) => void
}

// ===== HEADER TYPES =====
export type ScrollToSectionFunction = (sectionId: string) => void

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  scrollToSection: ScrollToSectionFunction
}

export interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export interface NavigationProps {
  scrollToSection: ScrollToSectionFunction
}

// ===== SERVICES TYPES =====
export interface ServiceItem {
  id: string
  title: string
  subtitle: string
  image: string
}

// ===== PRICING TYPES =====
export interface PricingItem {
  id: string
  title: string
  subtitle: string
  price: string
  description: string
}

// ===== ORDER FORM TYPES =====
export interface OrderFormData {
  name: string
  phone: string
  vehicleType: string
  location: string
  description: string
}

export interface VehicleType {
  id: string
  name: string
  price: string
}

export interface SubmitStatus {
  type: 'success' | 'error' | null
  message: string
}

export interface OrderFormProps {
  formData: OrderFormData
  isSubmitting: boolean
  submitStatus: SubmitStatus
  onInputChange: (field: keyof OrderFormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onCloseSuccess: () => void
}
