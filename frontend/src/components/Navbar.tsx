import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { RiHeartLine } from 'react-icons/ri';
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
const Navbar = () => {

  const [visible, setVisible] = useState<boolean>(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setToken('');
    setCartItems({});
  }
  const maisonFont = { fontFamily: 'Maison Neue, sans-serif' };
  return (
    <div className='flex items-center justify-between py-5 font-medium '>
      <Link to={'/'}>
        <img src={assets.logo} className='w-36' alt="" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-[#3e1800]'>
        <NavLink to='/' end className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#3e1800] hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#3e1800] hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#3e1800] hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#3e1800] hidden' />
        </NavLink>
        <NavLink to='/blog' className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>Blog</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-[#3e1800] hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <CiSearch onClick={() => setShowSearch(true)} className='w-8 h-7 cursor-pointer text-[#3e1800]' />
        {/* <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" /> */}

        <div className='group relative'>
          <CiUser onClick={() => token ? null : navigate('/login')} className='w-8 h-7 cursor-pointer text-[#3e1800]' />
          {/* <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" /> */}

          {/* dropdwn menu ...  */}
          {
            token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-[#3e1800]] rounded'>
                <p className='cursor-pointer hover:text-[#f4bd62]'>My profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-[#f4bd62]'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-[#f4bd62]'>Logout</p>
              </div>
            </div>
          }
        </div>
        {/* whislist  */}
        <Link to='/wishlist' className='relative'>
          <RiHeartLine className='w-6 h-6 text-[#3e1800] cursor-pointer' />
        </Link>
        {/* cart */}
        <Link to='/cart' className='relative'>
          <FiShoppingCart className='w-8 h-6 min-w-8 text-[#3e1800]' />
          {/* <img src={assets.cart_icon} className='w-5 min-w-5' alt="" /> */}
          {getCartCount() > 0 && (
            <p style={maisonFont} className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#3e1800] text-white aspect-square rounded-full text-[8px] font-bold'>
              {getCartCount()}
            </p>
          )}
        </Link>
        <CiUser onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden text-[#3e1800]' />
        {/* <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" /> */}
      </div>


      {/* sidebar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-[#3e1800]'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p style={maisonFont}>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/blog'>BLOG</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/contact'>CONTACT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/'>HOME</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar