import { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const TopBar = () => {
  const navigate = useNavigate();
  const { token } = useContext(ShopContext); // Get token to check login status
  const [isVisible, setIsVisible] = useState(true);

  // If user is logged in OR manually closed the bar, don't show it
  if (token || !isVisible) {
    return null;
  }

  return (
    <div className='bg-[#3d2b1f] text-white text-[10px] sm:text-xs py-2 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-all duration-500'>
      <div className='flex justify-between items-center w-full relative'>
        
        {/* Left Side: Support */}
        <p className='flex-1 truncate mr-2'>
          SUPPORT: <span className='font-medium'>0301729107</span>
        </p>

        {/* Middle: Promo (Desktop) */}
        <p className='hidden sm:block flex-[2] text-center'>
          Sign up and get 25% off. 
          <span 
            onClick={() => navigate('/login', { state: { signUp: true } })} 
            className='underline cursor-pointer ml-1 font-semibold hover:text-gray-300 transition'
          >
            SIGNUP NOW
          </span>
        </p>

        {/* Mobile View: Promo */}
        <p className='sm:hidden font-medium flex-1 text-center'>
            25% OFF <span onClick={() => navigate('/login', { state: { signUp: true } })} className='underline ml-1'>JOIN</span>
        </p>

        {/* Right Side: Close Button */}
        <div className='flex-1 flex justify-end items-center'>
          <img 
            onClick={() => setIsVisible(false)} 
            src={assets.cross_icon} 
            className='w-2.5 sm:w-3 cursor-pointer hover:rotate-90 transition-all duration-300 brightness-0 invert' 
            alt="close" 
          />
        </div>

      </div>
    </div>
  )
}

export default TopBar