// import React from 'react';
import TwinImg from '../assets/Twin.png';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PromoBanner = () => {
    // const maisonFont = { fontFamily: "'Maison Neue', sans-serif" };
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto my-5">
            {/* Main Container */}
            <div className="flex flex-col md:flex-row items-stretch bg-[#F9F9F9] overflow-hidden rounded-sm h-auto md:h-[350px]">

                {/* LEFT SIDE: Image Container (Height locked to 350px on desktop) */}
                <div className="w-full md:w-1/2 overflow-hidden">
                    <img
                        src={TwinImg}
                        alt="Fashion Favorites"
                        /* Using object-top to keep faces visible in the shorter height */
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* RIGHT SIDE: Text Content (Reduced Padding and Margins) */}
                <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center font-maison">

                    <span className="text-gray-800 text-[10px] uppercase tracking-[0.2em] mb-2 font-maison">
                        Limited Time Offers
                    </span>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight mb-3 font-maison">
                        25% Off All Fashion Favorites - Limited Time!
                    </h2>

                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 max-w-md font-maison">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <Button
                        className='mt-10 bg-brand-brown hover:bg-brand-amber hover:text-brbg-brand-brown text-white px-10 py-8 text-lg rounded-none group w-fit'
                        onClick={() => navigate('/collection')}
                    >
                        Shop Now <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-2" />
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default PromoBanner;