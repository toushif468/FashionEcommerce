import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import type { Color, ProductType, Size } from '../types/assets';
import RelatedProducts from '../components/RelatedProducts';
import { useParams } from 'react-router-dom';
import { FiHeart, FiPlus, FiMinus } from 'react-icons/fi'; // Ensure react-icons is installed
import GreyHeaderSection from '@/components/GreyHeaderSection';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import OurPolicy from '@/components/OurPolicy';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [image, setImage] = useState<string>('');
  const [size, setSize] = useState<Size | null>(null);
  const [color, setColor] = useState<Color | null>(null);
  const [quantity, setQuantity] = useState<number>(1);



  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);


  const handleNextImage = () => {
    if (!productData) return;
    const currIndex = productData.image.indexOf(image);
    const nextIndex = (currIndex + 1 + productData.image.length) % productData.image.length;
    setImage(productData.image[nextIndex]);
  }

  const handlePrevImage = () => {
    if (!productData) return;
    const currIndex = productData.image.indexOf(image);
    const prevIndex = (currIndex - 1 + productData.image.length) % productData.image.length;
    setImage(productData.image[prevIndex]);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);


  return productData ? (
    <div className='pt-0 transition-opacity ease-in duration-500 opacity-100'>

      {/* Gray Header Section */}
      <GreyHeaderSection path={[
        { to: '/', text: 'Home' },
        { to: '/collection', text: 'Collection' }
      ]} title="Products Details" />

      <div className='px-4 sm:px-[5vw]'>
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/* Product Images */}
          <div className='flex-1 flex flex-col gap-3'>
            <div className='relative group overflow-hidden'>
              <button onClick={handlePrevImage} className='absolute left-4 top-1/2 z-20 -translate-y-1/2  bg-white  text-foreground p-4  hover:bg-brand-amber'>
                <FaAngleLeft className='size-5' />
              </button>
              <button onClick={handleNextImage} className='absolute right-5 top-1/2 z-20 -translate-y-1/2  bg-white  text-foreground p-4 hover:bg-brand-amber'>
                <FaAngleRight className='size-5' />
              </button>
              <div className='w-full aspect-4/5 flex items-center justify-center'>
                <img className='w-full h-full object-cover transition-all duration-300' src={image} alt="" />
              </div>
            </div>

            {/* //thumbnail navigation */}
            <div className='grid grid-cols-4 gap-3'>
              {productData.image.map((item, index) => (
                <div key={index} onClick={() => setImage(item)} className={`relative cursor-pointer overflow-hidden border-2 transition-all duration-200 ${item === image ? 'border-2 border-brand-brown' : 'border-transparent hover:bg-muted-foreground/20'}`}>
                  <img src={item} className='w-full h-full object-cover' alt={`Thumbnail ${index}`} />
                  {/* Subtle overlay for inactive thumbnails */}
                  {item !== image && <div className="absolute inset-0 bg-white/20 hover:bg-transparent"></div>}
                </div>
              ))}
            </div>

          </div>

          {/* Product Information */}
          <div className='flex-1'>
            {/* Added category title "Coats" */}
            <p className='text-muted-foreground text-sm font-maison mb-1'>{productData.subCategory}</p>

            <h1 className='font-bold text-3xl font-maison'>{productData.name}</h1>

            <div className='flex items-center gap-1 mt-2'>
              <div className='flex items-center gap-1'>
                {[...Array(4)].map((_, i) => <TiStarFullOutline key={i} size={22} className='text-brand-amber' />)}
                <TiStarOutline size={22} className='text-brand-amber' />
              </div>
              <p className='pl-2 text-base text-muted-foreground'>4.8 (245 Review)</p>
            </div>


            <p className='mt-5 text-3xl font-bold text-[#3f1700]'>{currency}{productData.price} <span className='text-muted-foreground/50 line-through text-xl ml-2'>$150.00</span></p>
            <p className='mt-10 text-muted-foreground md:w-4/5 leading-relaxed'>{productData.description}</p>

            {/* Added Color Section */}
            <div className='mt-6'>
              <p className='text-sm font-bold font-maison mb-3 text-primary'>
                Color : <span className='font-normal text-muted-foreground'>{color}</span>
              </p>
              <div className='flex gap-2'>
                {(['Black', 'Grey', 'Green', 'Red', 'Orange', 'Blue', 'Pink', 'White'] as Color[]).map((c) => {

                  const isSelected = color === c;
                  return (
                    <div
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-7 h-7 rounded-full border cursor-pointer transition-all duration-200 flex items-center justify-center ${isSelected ? 'scale-110' : 'border-transparent hover:border-gray-200'
                        }`}
                      style={{ borderColor: isSelected ? c.toLowerCase() : 'transparent' }}
                    >
                      {/* Inner color circle */}
                      <div
                        className="w-5 h-5 rounded-full border border-black/10"
                        style={{ backgroundColor: c.toLowerCase() }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>


            <div className='flex flex-col gap-4 my-8'>
              <p className='text-sm font-bold font-maison text-primary'>Size : <span className='font-normal text-gray-500'>{size || 'Select'}</span></p>
              <div className='flex gap-3'>
                {productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border py-3 px-7 text-base text-primary transition-all ${item === size ? 'bg-[#f0c070] border-[#f0c070] text-primary font-bold' : 'bg-white border-gray-200 hover:bg-muted'}`} key={index}>{item}</button>
                ))}
              </div>
            </div>

            {/* Quantity, Add to Cart, Buy Now, and Wishlist Row */}
            <div className='flex items-center gap-4 flex-wrap'>
              {/* Counter UI */}
              <div className='flex items-center border border-gray-200'>
                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className='px-4 py-3.5 hover:bg-gray-100 transition-colors border-r '><FiMinus /></button>
                <span className='px-5 font-bold'>{quantity}</span>
                <button onClick={() => setQuantity(prev => prev + 1)} className='px-4 py-3.5 hover:bg-gray-100 transition-colors border-l '><FiPlus /></button>
              </div>

              <button onClick={() => addToCart(productData._id, size, color)} className='bg-[#3f1700] text-white px-8 py-3.5 text-sm font-bold hover:bg-primary transition-colors'>ADD TO CART</button>

              <button className='bg-[#f0c070] text-primary px-8 py-3.5 text-sm font-bold hover:bg-[#e0b060] transition-colors'>BUY NOW</button>

              <button className='p-3.5 border border-gray-200 hover:text-red-500 transition-colors'>
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

        <OurPolicy />
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;