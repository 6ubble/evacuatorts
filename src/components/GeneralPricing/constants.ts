import type { PricingItem } from '../../types/types.ts'

export const PRICING_DATA: PricingItem[] = [
  {
    id: 'motorcycle',
    title: 'МОТОТЕХНИКА',
    subtitle: 'Motorcycle',
    price: 'от 2000 руб.',
    description: 'Эвакуация мотоциклов, скутеров, квадроциклов'
  },
  {
    id: 'car',
    title: 'ЛЕГКОВОЙ АВТОМОБИЛЬ',
    subtitle: 'Passenger Car',
    price: 'от 2500 руб.',
    description: 'Эвакуация легковых автомобилей до 2 тонн'
  },
  {
    id: 'suv',
    title: 'ВНЕДОРОЖНИК',
    subtitle: 'SUV',
    price: 'от 3000 руб.',
    description: 'Эвакуация внедорожников и кроссоверов'
  },
  {
    id: 'minibus',
    title: 'МИКРОАВТОБУС',
    subtitle: 'Minibus',
    price: 'от 4000 руб.',
    description: 'Эвакуация микроавтобусов'
  },
  {
    id: 'truck',
    title: 'ГРУЗОВОЙ ТРАНСПОРТ',
    subtitle: 'Truck',
    price: 'от 5000 руб.',
    description: 'Эвакуация грузовиков и спецтехники'
  },
  {
    id: 'distance',
    title: 'ПО КИЛОМЕТРАЖУ',
    subtitle: 'Per Kilometer',
    price: '50 руб./км',
    description: 'Дополнительная плата за каждый километр по России'
  }
]
