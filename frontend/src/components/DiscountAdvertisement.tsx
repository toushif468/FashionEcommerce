import React from 'react';
// Import your images from your assets folder
import MenImg from '../assets/MenDiscount.png';
import WomenImg from '../assets/WOMEN_DISCOUNT.png';

const DiscountAdvertisement: React.FC = () => {
    // Define the Maison Neue font style
    const maisonFont = { fontFamily: "'Maison Neue', sans-serif" };

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-10">
            {/* Grid Container for two equal columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* --- FIRST DIV: MEN'S COLLECTION --- */}
                <div className="relative group overflow-hidden bg-[#F6F6F6] rounded-sm min-h-[450px]">
                    {/* Background Image */}
                    <img
                        src={MenImg}
                        alt="Men's Latest Collection"
                        className="absolute inset-0 w-full h-full object-cover object-top-right group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Content Overlay */}
                    <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center h-full" style={maisonFont}>
                        <p className="text-gray-600 text-sm font-medium tracking-wide mb-2">Flat 20% Discount</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-4">Men's Latest <br />Collection</h2>
                        <p className="text-gray-500 text-sm md:text-base max-w-sm leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                        {/* Shop Now Button with Arrow */}
                        <button className="bg-[#f4bd62] text-black px-8 py-3.5 w-fit flex items-center gap-2.5 text-sm font-semibold rounded-sm shadow-md hover:bg-[#3e1800] hover:text-white transition-colors">
                            Shop Now
                            <span className="text-lg">→</span>
                        </button>
                    </div>
                </div>

                {/* --- SECOND DIV: WOMEN'S FASHION --- */}
                <div className="relative group overflow-hidden bg-[#FEDB9B] rounded-sm min-h-[450px]">
                    {/* Background Image */}
                    <img
                        src={WomenImg}
                        alt="Women's Latest Fashion"
                        className="absolute inset-0 w-full h-full object-cover object-top-right group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Content Overlay */}
                    <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-center h-full" style={maisonFont}>
                        <p className="text-gray-700 text-sm font-medium tracking-wide mb-2">Flat 25% Discount</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-4">WOMEN's Latest <br />Fashion</h2>
                        <p className="text-gray-600 text-sm md:text-base max-w-sm leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                        {/* Shop Now Button with Arrow */}
                        <button className="bg-[#3e1800] text-white px-8 py-3.5 w-fit flex items-center gap-2.5 text-sm font-semibold rounded-sm shadow-md hover:bg-[#f4bd62] hover:text-[#3e1800] transition-colors">
                            Shop Now
                            <span className="text-lg">→</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DiscountAdvertisement;