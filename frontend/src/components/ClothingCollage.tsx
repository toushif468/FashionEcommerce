import React from 'react';
import WomenImg from '../assets/Womenimg.png';
import MenImg from '../assets/MEN_Img.png';
import KidImg from '../assets/KID_Img.png';

const ClothingCollage: React.FC = () => {
    const maisonFont = { fontFamily: "'Maison Neue', sans-serif" };

    // Common style for the list items to keep code clean
    const listItemStyle = "hover:pl-3 hover:text-[#f4bd62] transition-all duration-300 cursor-pointer flex items-center gap-2 group/item";

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6">

                {/* --- WOMEN'S (Left Large Column) --- */}
                <div className="md:col-span-1 lg:col-span-4 relative group overflow-hidden bg-[#F6F6F6] rounded-sm min-h-[600px] " >
                    <img
                        src={WomenImg}
                        alt="Women's Collection"
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000"
                    />

                    {/* Darker overlay on hover to make text readable */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                    <div className="relative z-10 p-8 lg:p-12 flex flex-col h-full justify-start" style={maisonFont}>
                        <span className="bg-white px-3 py-1 text-[10px] font-bold w-fit mb-4 rounded-full shadow-sm">2500+ Items</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#3e1800] mb-4 hover:pl-3 hover:text-[#f4bd62] transition-all duration-300 cursor-pointer flex items-center gap-2 group/item">For WOMEN's</h2>
                        <p className="text-gray-700 text-sm max-w-xs leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        </p>

                        <ul className="space-y-3 text-sm text-[#1a1a1a] font-semibold">
                            <li className={listItemStyle}> Blazers</li>
                            <li className={listItemStyle}> T-Shirts and Blouses</li>
                            <li className={listItemStyle}> Dresses</li>
                            <li className={listItemStyle}> Jackets & Coats</li>
                            <li className={listItemStyle}> Knit</li>
                            <li className={listItemStyle}> Sarees</li>
                        </ul>
                    </div>
                </div>

                {/* --- RIGHT SIDE COLUMN (Men & Kids) --- */}
                <div className="flex flex-col gap-6 lg:col-span-4">

                    {/* MEN'S */}
                    <div className="relative group overflow-hidden bg-[#F6F6F6] rounded-sm h-[380px]">
                        <img
                            src={MenImg}
                            alt="Men's Collection"
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                        <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full" style={maisonFont}>
                            <span className="bg-white px-3 py-1 text-[10px] font-bold w-fit mb-4 rounded-full shadow-sm">2500+ Items</span>
                            <h2 className="text-4xl font-bold text-[#3e1800] mb-2 hover:pl-3 hover:text-[#f4bd62] transition-all duration-300 cursor-pointer flex items-center gap-2 group/item">For MEN's</h2>
                            <p className="text-gray-700 text-sm max-w-xs leading-relaxed mb-4">
                                High quality essentials for everyday wear.
                            </p>

                            <ul className="space-y-2 text-sm text-[#3e1800] font-semibold">
                                <li className={listItemStyle}>Blazers</li>
                                <li className={listItemStyle}>T-Shirts and shirts</li>
                                <li className={listItemStyle}>Jackets & Coats</li>
                                <li className={listItemStyle}>Jeans</li>
                            </ul>
                        </div>
                    </div>

                    {/* KIDS */}
                    <div className="relative group overflow-hidden bg-[#F6F6F6] rounded-sm h-[340px]">
                        <img
                            src={KidImg}
                            alt="Kids Collection"
                            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                        <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full" style={maisonFont}>
                            <span className="bg-white px-3 py-1 text-[10px] font-bold w-fit mb-4 rounded-full shadow-sm">2500+ Items</span>
                            <h2 className="text-4xl font-bold text-[#3e1800] mb-2 hover:pl-3 hover:text-[#f4bd62] transition-all duration-300 cursor-pointer flex items-center gap-2 group/item">For KID's</h2>
                            <p className="text-gray-700 text-sm max-w-xs leading-relaxed mb-4">
                                Comfy and stylish clothes for the little ones.
                            </p>

                            <ul className="space-y-2 text-sm text-[#1a1a1a] font-semibold">
                                <li className={listItemStyle}>T-Shirts and shirts</li>
                                <li className={listItemStyle}>Dresses</li>
                                <li className={listItemStyle}>Jackets & Coats</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClothingCollage;