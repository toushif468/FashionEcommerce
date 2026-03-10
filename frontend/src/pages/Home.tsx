import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
// import Features from '../components/Features'

const Home = () => {
  return (
    <div>
      <Hero />
      <OurPolicy />
      {/* <Features /> */}
      <LatestCollection />
      <BestSeller />
      <NewsletterBox />
    </div>
  )
}

export default Home