import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { RiHeartLine } from 'react-icons/ri';
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
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
        <img src={assets.logo} className='w-40' alt="" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-brand-brown'>
        <NavLink to='/' end className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-bratext-brand-brown hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-bratext-brand-brown hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-bratext-brand-brown hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-bratext-brand-brown hidden' />
        </NavLink>
        <NavLink to='/blog' className='flex flex-col items-center gap-1'>
          <p style={maisonFont}>Blog</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-bratext-brand-brown hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-3 sm:gap-4 md:gap-6'>
        {/* search icon */}
        <FiSearch onClick={() => setShowSearch(true)} className='w-5 h-5 md:w-6 md:h-6  cursor-pointer text-brand-brown' />

        {/* profule icon */}
        <div className='group relative'>
          <FiUser onClick={() => token ? null : navigate('/login')} className='w-5 h-5 md:w-6 md:h-6 cursor-pointer text-brand-brown' />

          {/* dropdwn menu ...  */}
          {
            token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-brand-brown] rounded'>
                <p className='cursor-pointer hover:text-brand-amber font-maison'>My profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-brand-amber font-maison'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-brand-amber font-maison'>Logout</p>
              </div>
            </div>
          }
        </div>
        {/* whislist icon */}
        <Link to='/wishlist' className='relative'>
          <RiHeartLine className='w-5 h-5 md:w-6 md:h-6 text-brand-brown cursor-pointer' />
        </Link>
        {/* cart icon */}
        <Link to='/cart' className='relative'>
          <FiShoppingCart className='w-5 h-5 md:w-6 md:h-6 text-brand-brown' />
          {getCartCount() > 0 && (
            <p style={maisonFont} className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-bratext-brand-brown text-white aspect-square rounded-full text-[8px] font-bold'>
              {getCartCount()}
            </p>
          )}
        </Link>
        {/* <CiUser onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden text-brand-brown' /> */}
        {/* <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" /> */}
      </div>


      {/* sidebar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-brand-brown'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p style={maisonFont}>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/blog'>Blog</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/contact'>Contact</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-gray-300' to='/'>Home</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar