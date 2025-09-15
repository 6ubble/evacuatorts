// Типы для компонента OrderForm

export interface OrderFormData {
  name: string
  phone: string
  vehicleType: string
  location: string
  description?: string
}

export interface VehicleType {
  id: string
  name: string
}

export interface SubmitStatus {
  type: 'success' | 'error' | null
  message: string
}
