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
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text={'Our Top Seller Product'} />

      </div>
      {/* Left Button */}
      <button
        onClick={() => scroll('left')}
        className='absolute left-2 top-[185%] -translate-y-1/2 z-10 bg-gray-600 p-2 rounded-full shadow-lg '
      >
        <RiArrowLeftSLine size={30} />
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll('right')}
        className='absolute right-2 top-[185%] -translate-y-1/2 z-10 bg-gray-600 p-2 rounded-full shadow-lg'
      >
        <RiArrowRightSLine size={30} />
      </button>
      {/* Rendering product */}
      {/* Adding the scroll fuction  */}
      <div ref={scrollRef} className='grid grid-flow-col auto-cols-[85%] sm:auto-cols-[45%] md:auto-cols-[30%] lg:auto-cols-[22%] gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>

    </div>
  )
}

export default LatestCollection