import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import type { ProductType } from '../types/assets';

const BestSeller = () => {

  const { products } = useContext(ShopContext);

  const [bestSellers, setBestSellers] = useState<ProductType[]>([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => (item.bestseller));
    setBestSellers(bestProducts.slice(0, 5));
  }, [products])



  return (
    <div className='my-10 px-4 sm:px-0'>
      <div className='flex flex-col sm:flex-row justify-between items-end py-8 gap-4'>
        <div className='text-3xl shrink-0'>
          <Title text={'Deals of the Day'} />
        </div>
        <p className='max-w-md text-right text-xs sm:text-sm md:text-base text-gray-600' 
          style={{ fontFamily: 'Maison Neue, sans-serif' }}>
          sit amet consectetur adipisicing elit. Quos eaque architecto sed nulla? Expedita, distinctio?
        </p>
      </div>

      <div className='flex gap-5 overflow-x-auto pb-10 pt-2 scrollbar-hide touch-pan-x items-start'>
        {
          bestSellers.map((item, index) => (
            <div key={index} className='shrink-0 transition-all duration-500'>
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} category={item.category} description={item.description} rating={'4.8'} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller