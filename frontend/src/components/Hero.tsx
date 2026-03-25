import { assets } from '../assets/assets'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from "lucide-react"

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col sm:flex-row border border-[#f5f5f5] -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>

      {/* Hero Left need to work on padding x*/}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 lg:pl-28 md:pl-17 sm:px-9'>

        {/* Text Container */}
        <div className='text-brand-brown relative px-6 sm:px-0 flex flex-col items-center sm:items-start'>

          {/* --- ABSOLUTE SUMMER TAG --- */}
          <div className='w-full flex justify-center sm:justify-start '>
            <div className='flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-brand-amber shadow-sm transition-transform hover:scale-105'>
              <img
                src={assets.quality_icon}
                className='w-6 h-6 object-contain brightness-110'
                alt="quality-badge"
              />
              <p className='text-brand-brown text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap'>
                <span className='font-black text-brand-brown font-maison'>50% OFF</span> Summer Super Sale
              </p>
            </div>
          </div>

          {/* --- MAIN HEADINGS --- */}

          <div className='flex flex-col gap-1 mt-4 text-center sm:text-left'>
            <div className='w-full max-w-4xl'>
              <h1 className='text-3xl md:text-4xl sm:text-3xl lg:text-5xl font-semibold tracking-tight leading-tight' style={{ fontFamily: 'Maison Neue, sans-serif' }}>
                Step into Style: Your
              </h1>

              <h1 className='text-3xl md:text-4xl sm:text-3xl lg:text-5xl font-semibold tracking-tight leading-tight' style={{ fontFamily: 'Maison Neue, sans-serif' }}>
                Ultimate Fashion Destination
              </h1>
            </div>

          </div>
          <div className='w-full max-w-2=3xl'>
            {/* --- DESCRIPTION --- */}
            <p className='mt-4 text-base md:text-lg sm:text-lg text-gray-500  leading-relaxed text-center sm:text-left ' style={{ fontFamily: 'Maison Neue, sans-serif' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore.
            </p>
          </div>


          {/* --- SHOP NOW BUTTON --- */}
          <Button
            className='mt-10 bg-bratext-brand-brown hover:bg-brand-amber  hover:text-brand-brown text-white px-6 py-6 text-sm lg:text-lg lg:px-7 lg:py-7 rounded-none group w-fit'
            onClick={() => navigate('/collection')}
          >
            Shop Now <ArrowRight className="ml-1 h-4 w-4 lg:ml-2 lg:h-6 lg:w-6 transition-transform group-hover:translate-x-2" />
          </Button>

        </div>
      </div>

      {/* Hero right side */}
      <img className='w-full sm:w-1/2 object-cover' src={assets.HEROV4} alt="Summer Collection" />

    </div>
  )
}

export default Hero