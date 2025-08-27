// src/components/Hero/constants.ts
import photo1 from '../../shared/assets/Hero/photo1.webp'
import photo2 from '../../shared/assets/Hero/photo2.webp'
import photo3 from '../../shared/assets/Hero/photo3.webp'
import type { HeroSlide, ButtonLabels } from './types'

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: photo1,
    title: "Эвакуатор по всей России",
    subtitle: "Круглосуточная эвакуационная служба",
    description: "Быстрая и надежная эвакуация автомобилей в любое время суток"
  },
  {
    id: 2,
    image: photo2,
    title: "Профессиональная команда",
    subtitle: "Опытные водители-эвакуаторщики",
    description: "Более 10 лет опыта в сфере эвакуации и грузоперевозок"
  },
  {
    id: 3,
    image: photo3,
    title: "Современная техника",
    subtitle: "Специализированные эвакуаторы",
    description: "Эвакуация любых типов автомобилей и грузов"
  }
]

export const SLIDE_INTERVAL: number = 5000 // 5 секунд

export const BUTTON_LABELS: ButtonLabels = {
  ORDER: "Заказать эвакуатор",
  PRICES: "Узнать цены"
}