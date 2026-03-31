import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { RiHeartLine } from 'react-icons/ri';
import { FiShoppingCart, FiSearch, FiUser } from "react-icons/fi";

const Navbar = () => {

  const [visible, setVisible] = useState<boolean>(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setToken('');
    setCartItems({});
  }


  // Helper component to avoid repeating the NavLink logic
  const NavItem = ({ to, label, end = false }: { to: string, label: string, end?: boolean }) => (
    <NavLink to={to} end={end} className='flex flex-col items-center gap-1 group'>
      {({ isActive }) => (
        <>
          {/* text-base increases size to 16px, tracking-widest adds premium spacing */}
          <p 
            
            className={`transition-colors duration-300 text-base lg:text-lg tracking-widest uppercase ${isActive ? 'text-black font-bold' : 'text-brand-brown font-maison hover:text-brand-amber'}`}
          >
            {label}
          </p>
          <hr className={`w-3/4 border-none h-[2px] bg-brand-amber transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        </>
      )}
    </NavLink>
  );

  return (
    <div className='flex items-center justify-between py-6 font-medium px-4 sm:px-[5vw]'>
      <Link to={'/'}>
        {/* Slightly increased logo size to match larger text */}
        <img src={assets.logo} className='w-36 md:w-48' alt="Logo" />
      </Link>

      
      <ul className='hidden sm:flex gap-8 text-base'>
        <NavItem to='/' label='Home' end />
        <NavItem to='/collection' label='Collection' />
        <NavItem to='/about' label='About' />
        <NavItem to='/contact' label='Contact' />
        <NavItem to='/blog' label='Blog' />
      </ul>

      <div className='flex items-center gap-4 sm:gap-5 md:gap-8'>
        {/* Icons slightly enlarged for balance */}
        <FiSearch 
          onClick={() => setShowSearch(true)} 
          className='w-6 h-6 cursor-pointer text-brand-brown hover:text-brand-amber transition-colors' 
        />

        <div className='group relative'>
          <FiUser 
            onClick={() => token ? null : navigate('/login')} 
            className='w-6 h-6 cursor-pointer text-brand-brown hover:text-brand-amber transition-colors' 
          />
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
              <div className='flex flex-col gap-3 w-40 py-4 px-6 bg-white shadow-xl border border-gray-100 text-brand-brown rounded'>
                <p className='cursor-pointer hover:text-brand-amber font-maison text-sm'>My profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-brand-amber font-maison text-sm'>Orders</p>
                <hr className='border-gray-100' />
                <p onClick={logout} className='cursor-pointer hover:text-brand-amber font-maison text-sm'>Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to='/wishlist' className='relative'>
          <RiHeartLine className='w-6 h-6 text-brand-brown cursor-pointer hover:text-brand-amber transition-colors' />
        </Link>

        <Link to='/cart' className='relative'>
          <FiShoppingCart className='w-6 h-6 text-brand-brown hover:text-brand-amber transition-colors' />
          {getCartCount() > 0 && (
            <p  className='absolute -right-2 -bottom-2 w-5 h-5 text-center leading-5 bg-brand-brown text-white rounded-full text-[10px] font-bold font-maison'>
              {getCartCount()}
            </p>
          )}
        </Link>

        <img 
          onClick={() => setVisible(true)} 
          src={assets.menu_icon} 
          className='w-6 cursor-pointer sm:hidden' 
          alt="Menu" 
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white z-[100] transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-brand-brown h-full'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-6 cursor-pointer border-b border-gray-100'>
            <img src={assets.dropdown_icon} className='h-5 rotate-180' alt="" />
            <p  className='font-bold text-xl font-maison'>Back</p>
          </div>

          <div className='flex flex-col text-2xl tracking-widest font-light'>
            <NavLink onClick={() => setVisible(false)} className='py-5 pl-12 border-b border-gray-50 hover:bg-gray-50 text-sm' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-5 pl-12 border-b border-gray-50 hover:bg-gray-50 text-sm' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-5 pl-12 border-b border-gray-50 hover:bg-gray-50 text-sm' to='/about'>ABOUT US</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-5 pl-12 border-b border-gray-50 hover:bg-gray-50 text-sm' to='/blog'>BLOG</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-5 pl-12 border-b border-gray-50 hover:bg-gray-50 text-sm' to='/contact'>CONTACT</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;