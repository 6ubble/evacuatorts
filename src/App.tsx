import { lazy, Suspense } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'

// Lazy loading компонентов
const Services = lazy(() => import('./components/Services/Services'))
const PriceList = lazy(() => import('./components/PriceList/GeneralPricing'))
const OrderForm = lazy(() => import('./components/OrderForm/OrderFormContainer'))

function App(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
      <Hero />
        <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
          <Services />
          <PriceList />
          <OrderForm />
        </Suspense>
      </main>
    </>
  )
}

export default App