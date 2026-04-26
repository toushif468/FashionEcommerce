import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import type { CartDataItem, Color, Size } from "../types/assets";
import Title from '../components/Title';
// Import required icons
import { FiPlus, FiMinus } from 'react-icons/fi';
import { IoCloseOutline } from "react-icons/io5";
import GreyHeaderSection from '@/components/GreyHeaderSection';

const Cart = () => {
  // Grab necessary data from your context
  const { products, currency, cartItems, updateQuantity, navigate, getCartAmount, getCartCount, delivery_fee, clearCart } = useContext(ShopContext);

  const [cartData, setCartData] = useState<CartDataItem[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData: CartDataItem[] = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          for (const color in cartItems[productId][size]) {
            if (cartItems[productId][size][color] > 0) {
              tempData.push({
                _id: productId,
                size: size as Size,
                color: color as Color,
                quantity: cartItems[productId][size][color]
              });
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Static/Context data for the summary
  const subTotal = getCartAmount ? getCartAmount() : 0;
  const itemsCount = getCartCount ? getCartCount() : cartData.length;
  const shipping = subTotal > 0 && delivery_fee ? delivery_fee : 0;
  const taxes = 0; // Static data for now
  const couponDiscount = 100; // Static data matching the image
  const total = subTotal + shipping + taxes - couponDiscount;

  return (
    <div className='border-t border-gray-300 pt-10 sm:pt-14'>
      <GreyHeaderSection path={[
        { to: '/', text: 'Home' },
      ]} title='Shopping Cart' />

      <div className='text-2xl mb-8 mt-6'>
        <Title text={'YOUR CART'} />
      </div>

      {/* Main Cart Layout: 2 Columns on Desktop */}
      <div className="flex flex-col lg:flex-row gap-10 mb-20">

        {/* LEFT SECTION: Cart Table */}
        <div className="w-full lg:w-[65%] xl:w-[70%]">

          {/* Desktop Table Header (Hidden on Mobile) */}
          <div className="hidden sm:grid grid-cols-[40px_3fr_1fr_120px_1fr] bg-[#F3C46A] py-5 px-4 text-sm font-semibold text-gray-800">
            <p></p> {/* Empty space for the X icon */}
            <p>Product</p>
            <p>Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-right">Subtotal</p>
          </div>

          {/* Cart Items List */}
          <div className="flex flex-col">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[40px_3fr_1fr_120px_1fr] items-center gap-4 py-6 sm:px-4 border-b border-gray-200"
                >
                  {/* 1. Delete Icon */}
                  <button
                    onClick={() => updateQuantity(item._id, item.size, item.color, 0)}
                    className="text-primary hover:text-brand-amber transition self-start sm:self-center pt-2 sm:pt-0"
                  >
                    <IoCloseOutline size={24} />
                  </button>

                  {/* 2. Product Image & Details */}
                  <div className="flex items-start sm:items-center gap-4">
                    <img className="w-20 sm:w-24 object-cover bg-gray-50" src={productData.image[0]} alt={productData.name} />
                    <div className="flex flex-col">
                      <p className="text-sm sm:text-base font-semibold text-primary leading-tight">
                        {productData.name}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground font-bold mt-1 sm:mt-2">
                        Color: <span className="text-muted-foreground font-normal">{item.color}</span> | Size: <span className="text-muted-foreground font-normal">{item.size}</span>
                      </p>
                      {/* Mobile Price Display */}
                      <p className="sm:hidden text-sm font-medium mt-2">
                        {currency}{productData.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* 3. Desktop Price */}
                  <p className="hidden sm:block text-sm font-medium text-gray-700">
                    {currency}{productData.price.toFixed(2)}
                  </p>

                  {/* 4. Responsive Quantity Controls */}
                  <div className="flex justify-center sm:justify-center self-start sm:self-center">
                    <div className="flex flex-col-reverse sm:flex-row items-center border border-gray-300 w-8 sm:w-auto">
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.color, Math.max(1, item.quantity - 1))}
                        className="w-full flex justify-center p-2 sm:px-3 text-gray-600 hover:bg-gray-100 transition border-t sm:border-t-0 sm:border-r border-gray-300"
                      >
                        <FiMinus size={14} />
                      </button>

                      <span className="py-2 px-2 sm:px-4 text-sm font-medium text-center w-full sm:w-auto">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity + 1)}
                        className="w-full flex justify-center p-2 sm:px-3 text-gray-600 hover:bg-gray-100 transition border-b sm:border-b-0 sm:border-l border-gray-300"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* 5. Desktop Subtotal */}
                  <p className="hidden sm:block text-right text-sm font-medium text-muted-foreground">
                    {currency}{(productData.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions (Coupon & Clear Cart) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 gap-6">
            <div className="flex w-full sm:w-auto">
              <input
                type="text"
                placeholder="Coupon Code"
                className="border border-gray-300 px-4 py-3 outline-none w-full sm:w-48 text-sm"
              />
              <button className="bg-brand-brown text-white px-6 py-3 text-sm font-medium whitespace-nowrap hover:bg-brand-amber hover:text-primary transition">
                Apply Coupon
              </button>
            </div>

            <button
              onClick={() => { clearCart() }}
              className="text-sm font-semibold text-gray-800 underline underline-offset-4 hover:text-black transition"
            >
              Clear Shopping Cart
            </button>
          </div>

        </div>

        {/* RIGHT SECTION: Order Summary */}
        <div className="w-full lg:w-[35%] xl:w-[30%]">
          <div className="border border-gray-200 p-6 bg-white">
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-4 mb-6">Order Summary</h3>

            <div className="flex flex-col gap-4 text-sm text-primary mb-6">
              <div className="flex justify-between">
                <p>Items</p>
                <p className="font-medium text-muted-foreground">{itemsCount}</p>
              </div>
              <div className="flex justify-between">
                <p>Sub Total</p>
                <p className="font-medium text-muted-foreground">{currency}{subTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p className="font-medium text-muted-foreground">{currency}{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Taxes</p>
                <p className="font-medium text-muted-foreground">{currency}{taxes.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Coupon Discount</p>
                <p className="font-medium text-muted-foreground">-{currency}{couponDiscount.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-8">
              <p className="font-semibold text-primary">Total</p>
              <p className="font-bold text-lg text-muted-foreground">{currency}{Math.max(0, total).toFixed(2)}</p>
            </div>

            <button
              onClick={() => navigate('/place-order')}
              className="w-full bg-brand-brown text-white py-3.5 text-sm font-medium hover:bg-brand-amber hover:text-primary transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;