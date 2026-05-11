import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { RiHeartLine, RiShoppingBagLine, RiExpandDiagonalLine, RiStarFill } from "react-icons/ri";

interface ProductItemProps {
    id: string;
    image: string[];
    name: string;
    price: number;
    subCategory: string;
    // description?: string;
    // rating?: string;
    // category?: string;
}

const ProductItem = ({ id, image, name, price, subCategory }: ProductItemProps) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer group'>
            {/* Image Container */}
            <div className='relative overflow-hidden bg-[#f5f5f5] rounded-sm'>

                {/* Product Image */}
                <div>

                    <img
                        className='hover:scale-110 transition duration-500 ease-in-out w-full h-full object-cover'
                        src={image[0]}
                        alt={name}
                    />
                </div>
                {/* 50% Off Badge */}
                <div className='absolute top-3 left-3 bg-white px-2 py-1 text-[10px] text-green-600 font-semibold shadow-sm'>
                    50% off
                </div>

                {/* --- VERTICAL ICON BAR --- 
                    Changed: Initial opacity-0 and right-[-50px]. 
                    On group-hover: opacity-100 and right-3.
                */}
                <div className='absolute top-3 -right-12 opacity-0 group-hover:right-3 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2 z-10'>

                    <div className='bg-white p-2 rounded-full shadow-md hover:bg-brand-brown hover:text-white transition-all duration-200'>
                        <RiHeartLine size={18} />
                    </div>

                    <div className='bg-white p-2 rounded-full shadow-md hover:bg-brand-brown hover:text-white transition-all duration-200'>
                        <RiExpandDiagonalLine size={18} />
                    </div>

                    <div className='bg-white p-2 rounded-full shadow-md hover:bg-brand-brown hover:text-white transition-all duration-200'>
                        <RiShoppingBagLine size={18} />
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className='pt-3'>
                <div className='flex justify-between items-center'>
                    <p className='text-xs text-gray-500 uppercase tracking-wider'>{subCategory}</p>

                    {/* --- STATIC RATING --- */}
                    <div className='flex items-center justify-between gap-1'>
                        <RiStarFill className='text-brand-amber' size={18} />
                        <span className='text-base font-semibold text-secondary-foreground'>4.8</span>
                    </div>
                </div>

                <p className='text-lg font-bold text-brand-brown line-clamp-1'>{name}</p>

                <div className='flex items-center gap-2 mt-4'>
                    <p className='text-lg font-bold text-brand-brown'>
                        {currency}{price}
                    </p>
                    {/* Optional: Add a crossed out original price if you want it to look like the image */}
                    <p className='text-base text-gray-400 line-through'>
                        {currency}{price * 2}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem