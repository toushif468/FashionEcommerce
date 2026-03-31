import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import type { ProductType, Size } from '../types/assets';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiPlus, FiMinus } from 'react-icons/fi'; // Ensure react-icons is installed

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [image, setImage] = useState<string>('');
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Quantity state for counter

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const colors = ['Black', 'Grey', 'Green', 'Red', 'Orange', 'Blue', 'Pink', 'White'];

  return productData ? (
    <div className='pt-0 transition-opacity ease-in duration-500 opacity-100'>

      {/* Gray Header Section */}
      <div className='bg-[#f3f3f3] py-12 mb-10 flex flex-col items-center justify-center border-b border-gray-200'>
        <h1 className='text-3xl sm:text-4xl font-maison font-bold mb-3 tracking-tight'>Product Details</h1>
        <div className='flex items-center gap-2 text-sm font-maison text-gray-600'>
          <Link to='/' className='hover:text-black transition-colors'>Home</Link>
          <span>/</span>
          <Link to='/collection' className='hover:text-black transition-colors'>Collection</Link>
          <span>/</span>
          <span className='text-gray-600 cursor-default'>Product Details</span>
        </div>
      </div>

      <div className='px-4 sm:px-[5vw]'>
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/* Product Images */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border border-gray-100' src={item} key={index} alt="" />
              ))}
            </div>
            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
            </div>
          </div>

          {/* Product Information */}
          <div className='flex-1'>
            {/* Added category title "Coats" */}
            <p className='text-gray-400 text-sm font-maison mb-1'>Coats</p>
            
            <h1 className='font-bold text-3xl font-maison'>{productData.name}</h1>
            
            <div className='flex items-center gap-1 mt-2'>
              <div className='flex items-center gap-1'>
                {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="" className="w-3" />)}
                <img src={assets.star_dull_icon} alt="" className="w-3" />
              </div>
              <p className='pl-2 text-sm text-gray-500'>4.8 (245 Review)</p>
            </div>

            {/* Added Color Section */}
            <div className='mt-6'>
              <p className='text-sm font-bold font-maison mb-3'>Color : <span className='font-normal text-gray-500'>Brown</span></p>
              <div className='flex gap-2'>
                {colors.map((color) => (
                  <div 
                    key={color} 
                    className='w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform' 
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></div>
                ))}
              </div>
            </div>

            <p className='mt-6 text-3xl font-bold text-[#3f1700]'>{currency}{productData.price} <span className='text-gray-300 line-through text-xl ml-2'>$150.00</span></p>
            <p className='mt-5 text-gray-500 md:w-4/5 leading-relaxed'>{productData.description}</p>

            <div className='flex flex-col gap-4 my-8'>
              <p className='text-sm font-bold font-maison'>Size : <span className='font-normal text-gray-500'>{size || 'Select'}</span></p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border py-2 px-4 text-sm transition-all ${item === size ? 'bg-[#f0c070] border-[#f0c070] text-black font-bold' : 'bg-white border-gray-200'}`} key={index}>{item}</button>
                ))}
              </div>
            </div>

            {/* Quantity, Add to Cart, Buy Now, and Wishlist Row */}
            <div className='flex items-center gap-4 flex-wrap'>
              {/* Counter UI */}
              <div className='flex items-center border border-gray-300'>
                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className='px-3 py-3 hover:bg-gray-100 transition-colors'><FiMinus /></button>
                <span className='px-4 font-bold'>{quantity}</span>
                <button onClick={() => setQuantity(prev => prev + 1)} className='px-3 py-3 hover:bg-gray-100 transition-colors'><FiPlus /></button>
              </div>

              <button onClick={() => addToCart(productData._id, size)} className='bg-[#3f1700] text-white px-8 py-3.5 text-sm font-bold hover:bg-black transition-colors'>ADD TO CART</button>
              
              <button className='bg-[#f0c070] text-black px-8 py-3.5 text-sm font-bold hover:bg-[#e0b060] transition-colors'>BUY NOW</button>

              <button className='p-3 border border-gray-300 hover:text-red-500 transition-colors'>
                <FiHeart size={20} />
              </button>
            </div>

            <hr className='text-gray-200 mt-8' />
            <div className='text-xs text-gray-500 mt-5 flex flex-col gap-2'>
              <p>• 100% Original product.</p>
              <p>• Cash on delivery is available on this product.</p>
              <p>• Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className='mt-20'>
          <div className='flex'>
            <b className='border border-gray-300 px-8 py-4 text-sm'>Description</b>
            <p className='border border-gray-300 px-8 py-4 text-sm text-gray-400'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border border-gray-300 px-8 py-8 text-sm text-gray-500 leading-relaxed'>
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet...</p>
            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and variations...</p>
          </div>
        </div>

        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;