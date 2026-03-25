import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import ClothingCollage from '../components/ClothingCollage'
import PromoBanner from '../components/PromoBanner'
import DiscountAdvertisement from '../components/DiscountAdvertisement'
import InstagramFollow from '@/components/InstagramFollow'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import Blog from './Blog'


const Home = () => {
  return (
    <div>
      <Hero />
      <OurPolicy />
      <ClothingCollage />
      <LatestCollection />
      <PromoBanner />
      <BestSeller />
      <DiscountAdvertisement />
      <InstagramFollow />
      <TestimonialCarousel />
      <Blog/>
      <NewsletterBox />

    </div>
  )
}

export default Home