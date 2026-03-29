import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { RiHeartLine, RiShoppingBagLine, RiExpandDiagonalLine, RiStarFill } from "react-icons/ri";
interface BestProductItemProps {
    id: string;
    image: string[];
    name: string;
    price: number;
    category?: string;
    description?: string;
    rating?: string
}
const BestProductItem = ({ id, image, name, price, category, description, rating }: BestProductItemProps) => {
    const { currency } = useContext(ShopContext);

    return (
        /* The container starts at a fixed width and expands on hover */
        <div className='group flex flex-row bg-white border border-gray-100 overflow-hidden transition-all duration-500 ease-in-out w-[300px] hover:w-[550px] h-[348px] cursor-pointer shadow-sm'>

            {/* LEFT SIDE: Image Container (Fixed Width) */}
            <div className='relative min-w-[300px] h-full overflow-hidden'>
                <Link to={`/product/${id}`}>
                    <img className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-500' src={image[0]} alt={name} />
                </Link>

                {/* 50% Off Badge */}
                <div className='absolute top-3 left-3 bg-white px-2 py-1 text-[10px] text-green-600 font-bold shadow-sm font-maison'>
                    50% off
                </div>

                {/* Vertical Icons (Visible on hover) */}
                <div className='absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300'>
                    <div className='bg-white p-1.5 rounded-full shadow-md hover:bg-brand-brown hover:text-white transition-colors'><RiHeartLine size={16} /></div>
                    <div className='bg-white p-1.5 rounded-full shadow-md hover:bg-brand-brown hover:text-white transition-colors'><RiExpandDiagonalLine size={16} /></div>
                    <div className='bg-white p-1.5 rounded-full shadow-md hover:bg-brand-brown hover:text-white transition-colors'><RiShoppingBagLine size={16} /></div>
                </div>
            </div>

            {/* RIGHT SIDE: Description (Slides out) */}
            <div className='flex flex-col p-5 min-w-[250px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 border-l border-gray-50'>
                <p className='text-gray-400 text-[10px] uppercase tracking-widest font-maison'>{category || 'Dress'}</p>

                <h2 className='text-lg font-bold text-brabg-brand-brown truncate w-full font-maison'>{name}</h2>

                <div className='flex items-center gap-2 mt-1'>
                    <p className='text-xl font-bold text-brabg-brand-brown font-maison' >{currency}{price}</p>
                    <p className='text-sm text-gray-400 line-through font-maison'>{currency}{price * 2}</p>
                </div>

                <div className='flex items-center gap-1 mt-2 mb-4'>
                    <RiStarFill className='text-brand-amber' />
                    <span className='text-sm font-medium font-maison'>{rating}</span>
                </div>

                <p className='text-[11px] leading-relaxed text-gray-500 line-clamp-4 font-light font-maison'>
                    {description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>

                <div className='mt-auto flex items-center gap-2 text-sm font-bold text-brabg-brand-brown hover:gap-4 transition-all font-maison'>
                    Shop Now <span className='text-lg'>→</span>
                </div>
            </div>
        </div>
    )
}

export default BestProductItem