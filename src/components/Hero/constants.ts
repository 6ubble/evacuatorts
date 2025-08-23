import photo1 from '../../assets/1.jpg'
import photo2 from '../../assets/2.jpg'
import photo3 from '../../assets/3.jpg'
import type { HeroSlide, ButtonLabels } from '../../types/types.ts'

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
