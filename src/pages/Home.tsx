import Hero from '../components/Hero/Hero.tsx'
import Services from '../components/Services/Services.tsx'
import GeneralPricing from '../components/GeneralPricing/GeneralPricing.tsx'
import OrderFormContainer from '../components/OrderForm/OrderFormContainer.tsx'

function Home(): React.JSX.Element {
  return (
    <main>
      <Hero />
      <Services />
      <GeneralPricing />
      <OrderFormContainer />
    </main>
  )
}

export default Home
