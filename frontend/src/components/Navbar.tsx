import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { RiHeartLine } from 'react-icons/ri';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

const Navbar = () => {

  const [visible, setVisible] = useState<boolean>(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setToken('');
    setCartItems({});
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium '>
      <Link to={'/'}>
        <img src={assets.logo} className='w-36' alt="" />
      </Link>

      <ul className='hidden md:flex items-start md:gap-6 lg:gap-10 text-[15px] font-semibold text-brand-brown'>

        <NavLink to='/' end className='flex flex-col items-center gap-1 group'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-brand-amber hidden group-[.active]:block' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1 group'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-brand-amber hidden group-[.active]:block' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1 group'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-brand-amber hidden group-[.active]:block' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1 group'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-brand-amber hidden group-[.active]:block' />
        </NavLink>

        <NavLink to='/blog' className='flex flex-col items-center gap-1 group'>
          <p>Blog</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-brand-amber hidden group-[.active]:block' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 md:gap-6'>
        <FiSearch onClick={() => setShowSearch(true)} className='w-5 h-5 md:w-6 md:h-6 cursor-pointer text-brand-brown' />

        <div className='group relative'>
          <FiUser onClick={() => token ? null : navigate('/login')} className='w-5 h-5 md:w-6 md:h-6 cursor-pointer text-brand-brown' />
          {
            token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-brand-brown rounded'>
                <p className='cursor-pointer hover:text-brand-amber'>My profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-brand-amber '>Orders</p>
                <p onClick={() => navigate('/track-order')} className='cursor-pointer hover:text-brand-amber '>Track Order</p>
                <p onClick={logout} className='cursor-pointer hover:text-brand-amber font-maison'>Logout</p>
              </div>
            </div>
          }
        </div>

        <Link to='/wishlist' className='relative'>
          <RiHeartLine className='w-5 h-5 md:w-6 md:h-6 text-brand-brown cursor-pointer' />
        </Link>

        <Link to='/cart' className='relative'>
          <FiShoppingCart className='w-5 h-5 md:w-6 md:h-6 text-brand-brown' />
          {getCartCount() > 0 && (

            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-brand-brown text-white aspect-square rounded-full text-[8px] font-bold font-maison'>
              {getCartCount()}
            </p>
          )}
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer md:hidden' alt="" />
      </div>

      {/* sidebar menu for small screen */}
      <div className={`absolute top-0 right-0  bottom-0 overflow-hidden bg-white z-50 transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-brand-brown '>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p className='text-primary'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-brand-brown/30 text-base font-semibold' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-brand-brown/30  text-base font-semibold' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-brand-brown/30  text-base font-semibold' to='/about'>About Us</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-brand-brown/30  text-base font-semibold' to='/contact'>Contact Us</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-4 pl-6 border-b border-brand-brown/30  text-base font-semibold' to='/blog'>Blog</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar