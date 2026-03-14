import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const TopBar = () => {
    const navigate = useNavigate();
    const { token } = useContext(ShopContext);
    const [isVisible, setIsVisible] = useState(true);


    if (token || !isVisible) {
        return null;
    }

    return (
        <div className='bg-[#3e1800] text-white text-[10px] sm:text-xs py-2 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-all duration-500'>
            <div className='flex justify-between items-center w-full relative'>

                {/* Left Side: Support */}
                <p className='flex-1 font-serif mr-2'  style={{ fontFamily: 'Maison Neue, sans-serif' }}>
                    SUPPORT : <span className='font-medium'  style={{ fontFamily: 'Maison Neue, sans-serif' }}>01301729107</span>
                </p>

                {/* Middle: Promo (Desktop) */}
                <p className='hidden sm:block flex-[2] text-center'  style={{ fontFamily: 'Maison Neue, sans-serif' }}>
                    Sign up and get 25% off.
                    <span
                        onClick={() => navigate('/login', { state: { signUp: true } })}
                        className='underline cursor-pointer ml-1 font-semibold hover:text-[#f4bd62] transition'
                    >
                        SIGNUP NOW
                    </span>
                </p>

                {/* Mobile View: Promo */}
                <p className='sm:hidden font-medium flex-1 text-center'  style={{ fontFamily: 'Maison Neue, sans-serif' }}>
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