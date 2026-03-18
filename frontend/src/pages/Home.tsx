import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import ClothingCollage from '../components/ClothingCollage'


const Home = () => {
  return (
    <div>
      <Hero />
      <OurPolicy />
      <ClothingCollage />
      <LatestCollection />
      <BestSeller />
      <NewsletterBox />
    </div>
  )
}

export default Home