import { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import type { ProductType } from '../types/assets';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
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
    <div className='my-10 relative group'>
      <div className='text-center py-8 text-3xl'>
        <Title text={'Latest Collection Products'} />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className='absolute left-2 top-[60%] -translate-y-1/2 z-20 bg-white/90 text-brand-brown p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-brown hover:text-white'>
        <RiArrowLeftSLine size={24} />
      </button>

      <button
        onClick={() => scroll('right')}
        className='absolute right-2 top-[60%] -translate-y-1/2 z-20 bg-white/90 text-brand-brown p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-brown hover:text-white '>
        <RiArrowRightSLine size={24} />
      </button>

      {/* --- ADDED NO-SCROLLBAR HERE --- */}
      <div
        ref={scrollRef}
        className='flex gap-4 overflow-x-auto pb-8 no-scrollbar touch-pan-x items-start'
      >
        {
          latestProducts.map((item, index) => (
            <div key={index} className='shrink-0 w-[300px] transition-all duration-500'>
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection;