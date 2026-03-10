// import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>
      {/* Hero Left */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>

        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-10 md:w-14 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-base md:text-lg tracking-widest'>OUR BEST SELLER</p>
          </div>
          <h1 className='prata-regular text-4xl sm:py-4 lg:text-7xl leading-relaxed'>Latest Arivals</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-lg md:text-xl cursor-pointer hover:text-black transition'>SHOP NOW</p>
            <p className='w-10 md:w-14 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>


      {/* Hero right side */}
      <img className='w-full sm:w-1/2 ' src={assets.hero_img1} alt="" />
      
    </div>
  )
}

export default Hero