import { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import type { ProductType } from '../types/assets';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import BestProductItem from './BestProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bestSellers, setBestSellers] = useState<ProductType[]>([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSellers(bestProduct.slice(0, 10));
  }, [products])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='my-10 px-4 sm:px-0 relative group'>
      <div className='flex flex-col sm:flex-row justify-between items-end py-8 gap-4'>
        <div className='text-3xl shrink-0'>
          <Title text={'Top Seller Products'} />
        </div>
        {/* Removed inline style - Global CSS now handles Maison Neue */}
        <p className='max-w-md text-right text-xs sm:text-sm md:text-base text-gray-600'>
          Explore our most-loved pieces, curated just for you. Exclusive deals on premium fashion favorites.
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className='absolute left-2 top-[60%] -translate-y-1/2 z-20 bg-white/90 text-brand-brown p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-brown hover:text-white'>
        <RiArrowLeftSLine size={24} />
      </button>

      <button
        onClick={() => scroll('right')}
        className='absolute right-2 top-[60%] -translate-y-1/2 z-20 bg-white/90 text-brand-brown p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-brown hover:text-white'>
        <RiArrowRightSLine size={24} />
      </button>

      {/* --- SCROLLBAR HIDDEN HERE --- */}
      <div
        ref={scrollRef}
        className='flex gap-6 overflow-x-auto pb-12 pt-4 no-scrollbar touch-pan-x items-start'
      >
        {
          bestSellers.map((item, index) => (
            <div key={index} className='shrink-0 transition-all duration-500'>
              <BestProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                category={item.category}
                description={item.description}
                rating={'4.8'}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller;