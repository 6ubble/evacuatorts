// src/components/Services/constants.ts
import motorcycleImg from '../../shared/assets/Services/motocikl-foto-mini.webp'
import carImg from '../../shared/assets/Services/legkovoy-avtomobil-foto-mini.webp'
import suvImg from '../../shared/assets/Services/vnedorozhnik-foto-mini.webp'
import minibusImg from '../../shared/assets/Services/mikroavtobus-foto-mini.webp'
import specialImg from '../../shared/assets/Services/spectehnika-foto-mini.webp'
import gazelImg from '../../shared/assets/Services/gazel-foto-mini.webp'

import type { ServiceItem } from './types'

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'motorcycle',
    title: 'ЭВАКУАЦИЯ МОТОТЕХНИКИ',
    image: motorcycleImg
  },
  {
    id: 'car',
    title: 'ЭВАКУАЦИЯ ЛЕГКОВОГО АВТОМОБИЛЯ',
    image: carImg
  },
  {
    id: 'suv',
    title: 'ЭВАКУАЦИЯ ВНЕДОРОЖНИКА',
    image: suvImg
  },
  {
    id: 'minibus',
    title: 'ЭВАКУАЦИЯ МИКРОАВТОБУСА',
    image: minibusImg
  },
  {
    id: 'special',
    title: 'ПЕРЕВОЗКА СПЕЦТЕХНИКИ',
    image: specialImg
  },
  {
    id: 'gazel',
    title: 'ЭВАКУАЦИЯ ГАЗЕЛИ',
    image: gazelImg
  }
]