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

  return (
    <div className='my-10 relative group'>
      <div className='text-center py-8 text-3xl'>
        <Title text={'Our Top Seller Product'} />

      </div>
      {/* Left Button */}
      <button
        onClick={() => scroll('left')}
        className='absolute left-2 top-[60%] -translate-y-1/2 z-20 bg-white/90 text-[#3e1800] p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 lg:block hover:bg-[#3e1800] hover:text-white'
      >
        <RiArrowLeftSLine size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll('right')}
        className='absolute right-2 top-[60%] -translate-y-1/2 z-20 bg-white/90 text-[#3e1800] p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300  lg:block hover:bg-[#3e1800] hover:text-white '
      >
        <RiArrowRightSLine size={24} />
      </button>
      {/* Rendering product */}
      {/* Adding the scroll fuction  */}
      <div ref={scrollRef} className='grid grid-flow-col auto-cols-[50%] sm:auto-cols-[33%] md:auto-cols-[25%] lg:auto-cols-[20%] gap-3  sm:gap-4 overflow-x-auto pb-8 scroll-smooth scrollbar-hide touch-pan-x'>
        {
          latestProducts.map((item, index) => (
            <div key={index} className='shrink-0'>
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default LatestCollection