import { assets } from '../assets/assets'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from "lucide-react"

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>

      {/* Hero Left need to work on padding x*/}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 sm:px-12 md:px-16 lg:px-24'>

        {/* Text Container */}
        <div className='text-[#3e1800] relative px-6 sm:px-0 flex flex-col items-center sm:items-start'>

          {/* --- ABSOLUTE SUMMER TAG --- */}
          <div className='w-full flex justify-center sm:justify-start '>
            <div className='flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-[#f4bd62] shadow-sm transition-transform hover:scale-105'>
              <img
                src={assets.quality_icon}
                className='w-6 h-6 object-contain brightness-110'
                alt="quality-badge"
              />
              <p className='text-[#3e1800] text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap'>
                <span className='font-black text-[#3e1800]'>50% OFF</span> Summer Super Sale
              </p>
            </div>
          </div>

          {/* --- MAIN HEADINGS --- */}
          {/* Note: 'font-sans' is used here; replace with your specific Maison Neue class if defined in tailwind.config */}
          <div className='flex flex-col gap-1 mt-4 text-center sm:text-left'>
            <h1 className='text-lg md:text-2xl lg:text-5xl font-semibold tracking-tight leading-tight ' style={{ fontFamily: 'Maison Neue, sans-serif' }}>
              Step into Style: Your
            </h1>
            <div className='w-full max-w-2xl'>
              <h1 className=' text-lg md:text-2xl lg:text-5xl font-semibold tracking-tight leading-tight ' style={{ fontFamily: 'Maison Neue, sans-serif' }}>
                Ultimate Fashion Destination
              </h1>
            </div>

          </div>
          <div className='w-full max-w-2xl'>
            {/* --- DESCRIPTION --- */}
            <p className='mt-4 text-base md:text-lg text-gray-500  leading-relaxed text-center sm:text-left ' style={{ fontFamily: 'Maison Neue, sans-serif' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore.
            </p>
          </div>


          {/* --- SHOP NOW BUTTON --- */}
          <Button
            className='mt-10 bg-[#3e1800] hover:bg-black text-white px-10 py-8 text-lg rounded-none group w-fit'
            onClick={() => navigate('/collection')}
          >
            Shop Now <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Button>

        </div>
      </div>

      {/* Hero right side */}
      <img className='w-full sm:w-1/2 object-cover' src={assets.HEROV4} alt="Summer Collection" />

    </div>
  )
}

export default Hero