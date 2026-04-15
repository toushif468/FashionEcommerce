import { useRef, useState } from 'react';
import LeslieAlexander from '../assets/leslie.jpg';
import MichaelJordan from '../assets/MichaelJordan.jpg';
import { RiDoubleQuotesR, RiStarFill, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const testimonialData = [
    {
        id: 1,
        image: LeslieAlexander,
        name: 'Leslie Alexander',
        title: 'Fashion Enthusiast',
        rating: 5.0,
        quote: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.'
    },
    {
        id: 2,
        image: MichaelJordan,
        name: 'Michael Jordan',
        title: 'Sneaker Collector',
        rating: 5.0,
        quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    }
];

const TestimonialCarousel = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            const maxScroll = scrollWidth - clientWidth;
            setCanScrollRight(scrollLeft < maxScroll - 1); // -1 for sub-pixel rounding
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-16 px-4">
            {/* --- HEADER & NAVIGATION --- */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <p className="text-gray-800 text-sm tracking-widest uppercase mb-2">Testimonial</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">What Our Clients Say</h2>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`p-3.5 rounded-sm transition-colors ${canScrollLeft ? 'bg-brand-amber text-black hover:brightness-90' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                        <RiArrowLeftSLine size={24} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`p-3.5 rounded-sm transition-colors ${canScrollRight ? 'bg-brand-brown text-white hover:brightness-125' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                        <RiArrowRightSLine size={24} />
                    </button>
                </div>
            </div>

            {/* --- TESTIMONIAL CAROUSEL CONTAINER (Scrollbar Hidden) --- */}
            <div
                ref={scrollRef}
                onScroll={updateScrollButtons}
                className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x items-stretch pb-6 pt-2 px-1"
            >
                {testimonialData.map((item) => (
                    <div
                        key={item.id}
                        className="flex-none w-full flex flex-col md:flex-row bg-[#F9F9F9] border border-gray-100 rounded-sm overflow-hidden"
                    >
                        {/* LEFT SIDE: Image Container */}
                        <div className="relative w-full md:w-2/5 h-[300px] md:h-full group overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-0 right-0 bg-brand-amber text-brand-brown p-4 group-hover:scale-110 transition-transform">
                                <RiDoubleQuotesR size={28} />
                            </div>
                        </div>

                        {/* RIGHT SIDE: Content Container */}
                        <div className="w-full md:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex gap-0.5 text-brand-amber">
                                    {[...Array(5)].map((_, i) => (
                                        <RiStarFill key={i} size={20} />
                                    ))}
                                </div>
                                <span className="text-xl font-bold text-[#1a1a1a]">
                                    {item.rating.toFixed(1)}
                                </span>
                            </div>

                            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl italic">
                                “{item.quote}”
                            </p>

                            <div>
                                <h4 className="text-xl font-bold text-[#1a1a1a]">{item.name}</h4>
                                <p className="text-gray-500 text-sm font-medium">{item.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarousel;