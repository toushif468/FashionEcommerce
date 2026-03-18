import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { RiHeartLine, RiShoppingBagLine, RiExpandDiagonalLine } from "react-icons/ri";
interface ProductItemProps {
  id: string;
  image: string[];
  name: string;
  price: number;
}
const ProductItem = ({ id, image, name, price }: ProductItemProps) => {
    const { currency } = useContext(ShopContext);

    return (
        <div className='text-gray-700 cursor-pointer'>
            {/* Image Container with "group" for hover detection */}
            <div className='relative overflow-hidden group'>
                
                {/* Product Image */}
                <Link to={`/product/${id}`}>
                    <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
                </Link>

                {/* --- VERTICAL ICON BAR --- */}
                <div className='absolute top-3 -right-12 group-hover:right-3 transition-all duration-300 flex flex-col gap-2'>
                    
                    {/* Wishlist Icon */}
                    <div className='bg-white p-2 rounded-full shadow-md hover:bg-[#3e1800] hover:text-white transition-colors'>
                        <RiHeartLine size={18} />
                    </div>

                    {/* Expand/Quick View Icon */}
                    <div className='bg-white p-2 rounded-full shadow-md hover:bg-[#3e1800] hover:text-white transition-colors'>
                        <RiExpandDiagonalLine size={18} />
                    </div>

                    {/* Add to Bag Icon */}
                    <div className='bg-white p-2 rounded-full shadow-md hover:bg-[#3e1800] hover:text-white transition-colors'>
                        <RiShoppingBagLine size={18} />
                    </div>

                </div>
            </div>

            {/* Product Info */}
            <p className='pt-3 pb-1 text-sm' style={{ fontFamily: 'Maison Neue, sans-serif' }}>{name}</p>
            <p className='text-sm font-bold' style={{ fontFamily: 'Maison Neue, sans-serif' }}>{currency}{price}</p>
        </div>
    )
}

export default ProductItem