import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>

      {/* Hero Left */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>

        {/* We make this container relative so the tag can be absolute inside it */}
        <div className='text-[#3d2b1f] relative'>

          {/* --- ABSOLUTE SUMMER TAG --- */}
          {/* -top-8: moves it exactly above the "Best Seller" line */}
          <div className='absolute -top-15 left-0 w-full flex justify-center sm:justify-start'>
            <div className='flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 shadow-sm transition-transform hover:scale-105'>

              {/* Check Badge Icon from your Assets */}
              <img
                src={assets.quality_icon}
                className='w-6 h-6 object-contain brightness-110'
                alt="quality-badge"
              />

              <p className='text-[#3d2b1f] text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap'>
                <span className='font-black text-[#3d2b1f]'>50% OFF</span> Summer Super Sale
              </p>
            </div>
          </div>

          {/* This is the "Anchor" line */}
          <div className='flex items-center gap-2'>
            <p className='w-10 md:w-14 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-base md:text-lg tracking-widest'>OUR BEST SELLER</p>
          </div>

          <h1 className='prata-regular text-4xl sm:py-4 lg:text-7xl leading-relaxed'>Latest Arrivals</h1>

          <div className='flex items-center gap-2'>
            <p className='font-semibold text-lg md:text-xl cursor-pointer hover:text-black transition'>SHOP NOW</p>
            <p className='w-10 md:w-14 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <img className='w-full sm:w-1/2' src={assets.hero_img1} alt="Summer Collection" />

    </div>
  )
}

export default Hero