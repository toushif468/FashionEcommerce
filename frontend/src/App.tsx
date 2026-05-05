// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'

import Cart from './pages/Cart'
import Login from './pages/Login'
import { PlaceOrder } from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Product from './pages/Product'
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify'
import TopBar from './components/TopBar'
import Blog from './pages/Blog'
import OrderSuccess from './pages/OrderSuccess'

const App = () => {

  return (
    <div className='overflow-hidden'> {/* Parent wrapper */}
      <TopBar />
      <div className='px-5 sm:px-[4vw] md:px-[5vw] lg:px-[8.5vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/order-success/:orderId' element={<OrderSuccess />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App