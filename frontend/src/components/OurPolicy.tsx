import { RiBox3Line, RiWalletLine, RiCustomerService2Line } from "react-icons/ri";

const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 py-20 text-xs sm:text-sm md:text-base text-gray-700'>

            {/* Free Shipping Policy */}
            <div className='flex items-center gap-4'>
                <div className='relative shrink-0'>
                    {/* Offset Amber Background */}
                    <div className='absolute -bottom-1 -right-1 bg-[#f4bd62] w-10 h-10 rounded-full -z-10 opacity-70'></div>
                    <RiBox3Line className='w-10 h-10 lg:w-12 lg:h-12 text-[#3e1800] opacity-90' />
                </div>
                <div>
                    <p className='font-bold text-gray-800 text-sm md:text-base'>Free Shipping</p>
                    <p className='text-gray-400'>Free shipping for order above $180</p>
                </div>
            </div>

            {/* Flexible Payment Policy */}
            <div className='flex items-center gap-4'>
                <div className='relative shrink-0'>
                    <div className='absolute -bottom-1 -right-1 bg-[#f4bd62] w-10 h-10 rounded-full -z-10 opacity-70'></div>
                    <RiWalletLine className='w-10 h-10 lg:w-12 lg:h-12 text-[#3e1800] opacity-90' />
                </div>
                <div>
                    <p className='font-bold text-gray-800 text-sm md:text-base'>Flexible Payment</p>
                    <p className='text-gray-400'>Multiple secure payment options</p>
                </div>
            </div>

            {/* Support Policy */}
            <div className='flex items-center gap-4'>
                <div className='relative shrink-0'>
                    <div className='absolute -bottom-1 -right-1 bg-[#f4bd62] w-10 h-10 rounded-full -z-10 opacity-70'></div>
                    <RiCustomerService2Line className='w-10 h-10 lg:w-12 lg:h-12 text-[#3e1800] opacity-90' />
                </div>
                <div>
                    <p className='font-bold text-gray-800 text-sm md:text-base'>24x7 Support</p>
                    <p className='text-gray-400'>We support online all days.</p>
                </div>
            </div>

        </div>
    );
};

export default OurPolicy;