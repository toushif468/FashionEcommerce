import { useState } from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'

const Blog = () => {
    // 2. State to track which post is currently expanded
    const [expandedPost, setExpandedPost] = useState<number | null>(null);

    const blogPosts = [
        {
            id: 1,
            title: "The Ultimate Guide to Summer Layering",
            date: "March 10, 2026",
            category: "Fashion",
            image: assets.hero_img1,
            excerpt: "How to stay cool and stylish even when the temperature rises with our new breathable fabrics.",
            fullContent: "Summer layering is all about choosing the right materials. Opt for linen blends, open-knit crochet, and light cotton. Start with a basic silk camisole and add an unbuttoned oversized shirt for that effortless chic look that protects you from the sun while keeping you ventilated."
        },
        {
            id: 2,
            title: "5 Essential Pieces for a Capsule Wardrobe",
            date: "March 05, 2026",
            category: "Style Guide",
            image: assets.about_img,
            excerpt: "Invest in quality over quantity with these timeless pieces that never go out of style.",
            fullContent: "A capsule wardrobe consists of a tailored blazer, a classic white tee, high-waisted denim, a versatile slip dress, and a pair of neutral loafers. By focusing on these five pillars, you can create over 30 unique outfits that transition perfectly from office to weekend."
        },
        {
            id: 3,
            title: "Sustainable Fashion: Why it Matters",
            date: "February 28, 2026",
            category: "Eco-Conscious",
            image: assets.hero_img1,
            excerpt: "Discover how we are reducing our carbon footprint one garment at a time.",
            fullContent: "Sustainability isn't just a trend; it's a commitment. We source organic cotton and use recycled water systems in our manufacturing. By choosing better fabrics, we ensure your clothes last years, not weeks, reducing the impact on global landfills."
        }
    ];

    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='text-2xl text-center pt-10 border-t border-gray-300'>
                <Title text1={'OUR'} text2={'BLOG'} />
                <p className='mt-3 text-gray-500 text-sm md:text-base max-w-xl mx-auto' style={{ fontFamily: 'Maison Neue, sans-serif' }}>
                    Insights into the latest trends, styling tips, and the stories behind our collections.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-16'>
                {blogPosts.map((post) => (
                    <div key={post.id} className='group flex flex-col'>
                        <div className='overflow-hidden bg-gray-100 mb-4 aspect-[4/5]'>
                            <img
                                src={post.image}
                                alt={post.title}
                                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-3 text-xs uppercase tracking-widest text-[#3e1800] font-bold'>
                                <span>{post.category}</span>
                                <span className='w-8 h-[1px] bg-[#3e1800]'></span>
                                <span className='text-gray-400 font-normal'>{post.date}</span>
                            </div>

                            <h2 className='text-xl md:text-2xl font-semibold text-[#3e1800] leading-tight group-hover:text-[#f4bd62] transition-colors' style={{ fontFamily: 'Maison Neue, sans-serif' }}>
                                {post.title}
                            </h2>

                            {/* 3. Conditional rendering for text content */}
                            <p className={`text-gray-500 text-sm leading-relaxed transition-all duration-300 ${expandedPost === post.id ? '' : 'line-clamp-2'}`}>
                                {expandedPost === post.id ? post.fullContent : post.excerpt}
                            </p>

                            {/* 4. The Button with onClick */}
                            <button
                                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                                className='mt-2 text-sm font-bold border-b-2 border-[#3e1800] w-fit pb-1 hover:text-[#f4bd62] hover:border-[#f4bd62] transition-all uppercase tracking-tighter'
                            >
                                {expandedPost === post.id ? "Show Less" : "Read More"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='bg-[#3e1800] text-white p-10 md:p-20 text-center my-20'>
                <h3 className='text-2xl md:text-4xl font-light italic mb-6'>"Fashion is the armor to survive the reality of everyday life."</h3>
                <p className='uppercase tracking-[0.2em] text-sm text-[#f4bd62]'>— Bill Cunningham</p>
            </div>

            <NewsletterBox />
        </div>
    )
}

export default Blog