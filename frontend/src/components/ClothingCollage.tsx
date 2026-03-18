import React from 'react';
// Import your images from your assets folder
import WomenImg from '../assets/Womenimg.png';
import MenImg from '../assets/MEN_Img.png';
import KidImg from '../assets/KID_Img.png';

const ClothingCollage: React.FC = () => {
    const maisonFont = { fontFamily: "'Maison Neue', sans-serif" };

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-10">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6">

                {/* --- FOR WOMEN'S (Left Large Column) --- */}
                <div className="md:col-span-1 lg:col-span-4 relative group overflow-hidden bg-[#F6F6F6] rounded-sm min-h-[600px] lg:min-h-full">
                    <img
                        src={WomenImg}
                        alt="Women's Collection"
                        className="absolute inset-0 w-full h-full object-top-right object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Content Overlay */}
                    <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full" style={maisonFont}>
                        <span className="bg-white px-3 py-1 text-[10px] font-bold w-fit mb-4 rounded-full shadow-sm">2500+ Items</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#3e1800] mb-4">For WOMEN's</h2>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        </p>

                        <ul className="space-y-2 text-sm text-[#1a1a1a] font-medium">
                            <li className="hover:pl-2 transition-all cursor-pointer">Blazers</li>
                            <li className="hover:pl-2 transition-all cursor-pointer">T-Shirts and Blouses</li>
                            <li className="hover:pl-2 transition-all cursor-pointer">Dresses</li>
                            <li className="hover:pl-2 transition-all cursor-pointer">Jackets & Coats</li>
                            <li className="hover:pl-2 transition-all cursor-pointer">Knit</li>
                            <li className="hover:pl-2 transition-all cursor-pointer">Sarees</li>
                        </ul>
                    </div>
                </div>

                {/* --- RIGHT SIDE COLUMN (Men & Kids) --- */}
                <div className="flex flex-col gap-6 lg:col-span-4">

                    {/* FOR MEN'S */}
                    <div className="relative group overflow-hidden bg-[#F6F6F6] rounded-sm h-[380px]">
                        <img
                            src={MenImg}
                            alt="Men's Collection"
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full" style={maisonFont}>
                            <span className="bg-white px-3 py-1 text-[10px] font-bold w-fit mb-4 rounded-full shadow-sm">2500+ Items</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#3e1800] mb-4">For MEN's</h2>
                            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-6">
                                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                            </p>

                            <ul className="space-y-2 text-sm text-[#3e1800] font-medium">
                                <li className="hover:pl-2 transition-all cursor-pointer">Blazers</li>
                                <li className="hover:pl-2 transition-all cursor-pointer">T-Shirts and shirts</li>
                                <li className="hover:pl-2 transition-all cursor-pointer">Dresses</li>
                                <li className="hover:pl-2 transition-all cursor-pointer">Jackets & Coats</li>
                                <li className="hover:pl-2 transition-all cursor-pointer">Jeans</li>

                            </ul>
                        </div>
                    </div>

                    {/* FOR KIDS */}
                    <div className="relative group overflow-hidden bg-[#F6F6F6] rounded-sm h-[340px]">
                        <img
                            src={KidImg}
                            alt="Kids Collection"
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full" style={maisonFont}>
                            <span className="bg-white px-3 py-1 text-[10px] font-bold w-fit mb-4 rounded-full shadow-sm">2500+ Items</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#3e1800] mb-4">For KID's</h2>
                            <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-6">
                                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                            </p>

                            <ul className="space-y-2 text-sm text-[#1a1a1a] font-medium">
                                <li className="hover:pl-2 transition-all cursor-pointer">Blazers</li>
                                <li className="hover:pl-2 transition-all cursor-pointer">T-Shirts and shirts</li>
                                <li className="hover:pl-2 transition-all cursor-pointer">Dresses</li>
                                <li className="hover:pl-2 transition-all cursor-pointer">Jackets & Coats</li>
                                <li className="hover:pl-2 transition-all cursor-pointer">Jeans</li>

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClothingCollage;