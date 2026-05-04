import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Blog1 from '../assets/Blog1.jpg';
import Blog2 from '../assets/Blog2.jpg';
import Blog3 from '../assets/Blog3.jpg';

const NewsBlogSection: React.FC = () => {
    const navigate = useNavigate();
    const [expandedPost, setExpandedPost] = useState<number | null>(null);

    const blogPosts = [
        {
            id: 1,
            image: Blog1,
            date: "22 March 2024",
            title: "10 Fashion Trends for the Modern Woman",
            desc: "Summer layering is all about choosing the right materials. Opt for linen blends, open-knit crochet, and light cotton. Start with a basic silk camisole and add an unbuttoned oversized shirt for that effortless chic look that protects you from the sun while keeping you ventilated."
        },
        {
            id: 2,
            image: Blog2,
            date: "21 March 2024",
            title: "Fashion Forward: Tips, Trends, and Inspiration",
            desc: "A capsule wardrobe consists of a tailored blazer, a classic white tee, high-waisted denim, a versatile slip dress, and a pair of neutral loafers. By focusing on these five pillars, you can create over 30 unique outfits that transition perfectly from office to weekend."
        },
        {
            id: 3,
            image: Blog3,
            date: "20 March 2024",
            title: "Fall Fashion Frenzy: The Ultimate Style Guide",
            desc: "Sustainability isn't just a trend; it's a commitment. We source organic cotton and use recycled water systems in our manufacturing. By choosing better fabrics, we ensure your clothes last years, not weeks, reducing the impact on global landfills."
        }
    ];

    // --- NEW HELPER: LIMIT TO 10 WORDS ---
    const getShortDesc = (text: string) => {
        const words = text.split(' ');
        if (words.length <= 10) return text;
        return words.slice(0, 10).join(' ') + '...';
    };

    return (
        <div className="max-w-7xl mx-auto py-20 px-4">
            <div className="text-center mb-16">
                <p className="text-primary text-sm tracking-widest uppercase mb-2">News & Blog</p>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Our Latest News & Blogs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map((post) => {
                    const isExpanded = expandedPost === post.id;
                    
                    return (
                        <div key={post.id} className="group flex flex-col">
                            {/* Image with Date Badge */}
                            <div 
                                className="relative overflow-hidden aspect-square mb-6 cursor-pointer"
                                onClick={() => navigate('/blog')}
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 right-0 bg-brand-amber px-4 py-2 text-sm font-bold text-[#1a1a1a] border-t-4 border-l-4 border-white">
                                    {post.date}
                                </div>
                            </div>

                            <div className='font-maison'>
                                <h3 
                                    className="text-2xl font-bold text-[#1a1a1a] mb-3 leading-tight group-hover:text-brand-brown transition-colors cursor-pointer"
                                    onClick={() => navigate('/blog')}
                                >
                                    {post.title}
                                </h3>
                                
                                {/* --- 10 WORD LIMIT LOGIC --- */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 transition-all duration-300">
                                    {isExpanded ? post.desc : getShortDesc(post.desc)}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedPost(isExpanded ? null : post.id);
                                    }}
                                    className='mt-2 text-sm font-bold border-b-2 border-brand-brown w-fit pb-1 hover:text-brand-amber hover:border-brand-amber transition-all uppercase tracking-tighter'
                                >
                                    {isExpanded ? "Show Less" : "Read More"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NewsBlogSection;