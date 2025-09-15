import type { PricingItem } from './types'

export const PRICING_DATA: PricingItem[] = [
  {
    id: 'motorcycle',
    title: 'МОТОТЕХНИКА',
    price: 'от 3000 руб.',
    description: 'Эвакуация мотоциклов, скутеров, квадроциклов'
  },
  {
    id: 'car',
    title: 'ЛЕГКОВОЙ АВТОМОБИЛЬ',
    price: 'от 3000 руб.',
    description: 'Эвакуация легковых автомобилей до 2 тонн'
  },
  {
    id: 'suv',
    title: 'ВНЕДОРОЖНИК',
    price: 'от 4000 руб.',
    description: 'Эвакуация внедорожников и кроссоверов'
  },
  {
    id: 'minibus',
    title: 'МИКРОАВТОБУС',
    price: 'от 5000 руб.',
    description: 'Эвакуация микроавтобусов'
  },
  {
    id: 'truck',
    title: 'ГРУЗОВОЙ ТРАНСПОРТ',
    price: 'от 5000 руб.',
    description: 'Эвакуация грузовиков и спецтехники'
  },
  {
    id: 'distance',
    title: 'ПО КИЛОМЕТРАЖУ',
    price: '60 руб./км',
    description: 'Дополнительная плата за каждый километр по России'
  }
]
