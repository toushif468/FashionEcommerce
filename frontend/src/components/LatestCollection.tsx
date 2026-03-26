import { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import type { ProductType } from '../types/assets';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  // scrollRef 
  const scrollRef = useRef<HTMLDivElement>(null);
  const [latestProducts, SetLatestProducts] = useState<ProductType[]>([]);


  useEffect(() => {
    SetLatestProducts(products.slice(0, 10));
  }, [products])

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
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, [latestProducts]);

  // 2. Logic to scroll the container
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // Scrolls 80% of the visible width

      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  /* ... existing imports and logic ... */

  return (
    <div className='my-10 relative group'>
      <div className='text-center py-8 text-3xl'>
        <Title text={'Our Top Seller Product'} />
      </div>

      {/* Buttons left */}
      <button onClick={() => scroll('left')} className='absolute left-2 top-[60%] -translate-y-1/2 z-20 bg-white/90 text-brand-bg-brand-brown p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 lg:block hover:bg-brand-brown hover:text-white'>
        <RiArrowLeftSLine size={24} />
      </button>
      {/* Button right */}
      <button onClick={() => scroll('right')} className='absolute right-2 top-[60%] -translate-y-1/2 z-20 bg-white/90 text-brand-bg-brand-brown p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 lg:block hover:bg-brand-brown hover:text-white '>
        <RiArrowRightSLine size={24} />
      </button>

      {/* --- CHANGED FROM GRID TO FLEX --- */}
      <div
        ref={scrollRef}
        className='flex gap-4 overflow-x-auto pb-8 scroll-smooth scrollbar-hide touch-pan-x items-start'
      >
        {
          latestProducts.map((item, index) => (
            /* We use shrink-0 so flex doesn't squash the cards to fit the screen */
            <div key={index} className='shrink-0 w-[300px] gap-3 transition-all duration-500'>
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                category={item.category}
                rating={item.rating}
                description={item.description} 
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection