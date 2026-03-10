import { assets } from '../assets/assets'

const Features = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-between gap-10 lg:gap-4 py-12 border-t border-b border-gray-200 bg-white'>

            {/* Free Shipping */}
            <div className='flex items-center gap-4 flex-1 justify-center lg:justify-start'>
                <img src={assets.exchange_icon} className='w-10 lg:w-12' alt="Package Icon" />
                <div>
                    <p className='text-sm sm:text-base font-bold text-gray-800 uppercase'>Free shipping</p>
                    <p className='text-xs sm:text-sm text-gray-500'>Free shipping for orders above 180$</p>
                </div>
            </div>

            {/* Flexible Payment */}
            <div className='flex items-center gap-4 flex-1 justify-center'>
                <img src={assets.quality_icon} className='w-10 lg:w-12' alt="Wallet Icon" />
                <div>
                    <p className='text-sm sm:text-base font-bold text-gray-800 uppercase'>Flexible Payment</p>
                    <p className='text-xs sm:text-sm text-gray-500'>Multiple secure payment options</p>
                </div>
            </div>

            {/* 24x7 Support */}
            <div className='flex items-center gap-4 flex-1 justify-center lg:justify-end'>
                <img src={assets.support_img} className='w-10 lg:w-12' alt="Support Icon" />
                <div>
                    <p className='text-sm sm:text-base font-bold text-gray-800 uppercase'>24x7 support</p>
                    <p className='text-xs sm:text-sm text-gray-500'>We support online all day</p>
                </div>
            </div>

        </div>
    )
}

export default Features