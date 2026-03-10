import React from 'react'
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
          <div className='absolute -top-10 left-0 w-full flex justify-center sm:justify-start'>
            <div className='flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 shadow-sm'>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-3 h-3 text-brown-700"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className='text-brown-600 text-[20px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap'>
                <span className='font-black'>50% OFF</span> Summer Super Sale
              </span>
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