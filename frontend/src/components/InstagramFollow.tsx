import React, { useRef, useEffect } from 'react';
// Import your Instagram images here
import Insta1 from '../assets/insta1.jpg'
// import Insta1 from '../assets/insta1.jpg';
import Insta2 from '../assets/insta2.jpg';
import Insta3 from '../assets/insta3.jpg';
import Insta4 from '../assets/insta4.jpg';
import Insta5 from '../assets/insta5.jpg';
import { RiInstagramLine } from "react-icons/ri";

const InstagramFollow: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    // const maisonFont = { fontFamily: "'Maison Neue', sans-serif" };

    // Enable horizontal scroll with mouse wheel
    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 3,
                    behavior: 'smooth'
                });
            };
            el.addEventListener("wheel", onWheel, { passive: false });
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);

    const instaImages = [Insta1, Insta2, Insta3, Insta4, Insta5, Insta1, Insta2]; // Added extras for scroll depth

    return (
        <div className="py-16 bg-gray-100">
            {/* --- HEADER SECTION --- */}
            <div className="text-center mb-10 font-maison">
                <p className="text-gray-800 text-sm tracking-widest uppercase mb-2 font-maison">Follow Us</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-maison">Follow Us On Instagram</h2>
            </div>

            {/* --- HORIZONTAL SCROLL CONTAINER --- */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-10 px-4 scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x"
            >
                {instaImages.map((img, index) => (
                    <div
                        key={index}
                        className="relative shrink-0 w-[250px] h-[300px] md:w-[320px] md:h-[380px] group overflow-hidden rounded-sm"
                    >
                        {/* Image */}
                        <img
                            src={img}
                            alt={`Instagram post ${index}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Hover Overlay with Instagram Icon */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/30">
                                <RiInstagramLine className="text-white text-3xl" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstagramFollow;