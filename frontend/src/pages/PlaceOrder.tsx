import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import type { ProductType } from '../types/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import GreyHeaderSection from '@/components/GreyHeaderSection'
import OrderSummary from '@/components/OrderSummary'
import { FiChevronDown } from 'react-icons/fi' // Make sure to install/import this icon
import { handleRazorpayPayment, handleStripePayment } from '@/utils/payment'
import { BsCashStack } from "react-icons/bs";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import React, { useContext, useState, useEffect, useMemo } from 'react'
import { Country, State, City, type IState, type ICountry, type ICity } from "country-state-city"

interface OrderItemType extends ProductType {
  size: string;
  color: string;
  quantity: number;
}

interface FormDataTypes {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  email: string;
}



export const PlaceOrder = () => {

  // In checkout page we added two conditions address or payment and kept address as default
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'payment'>('address');

  const [method, setMethod] = useState('cod');
  const [deliveryOption, setDeliveryOption] = useState('same');

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")


  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState<FormDataTypes>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const countryData = useMemo(() => {
    const activeCountryObj = countries.find(c => c.isoCode === selectedCountry);

    return {
      code: activeCountryObj ? `+${activeCountryObj.phonecode}` : "",
      flag: activeCountryObj && selectedCountry ? (
        <img
          src={`https://flagcdn.com/w40/${selectedCountry.toLowerCase()}.png`}
          className="w-6 h-auto object-contain rounded-sm"
          alt="flag"
        />
      ) : (
        <span className="text-xl">🌐</span>
      )
    };
  }, [selectedCountry, countries])




  // useEffect(() => {
  //   console.log("cartItems")
  //   console.log(cartItems)
  // }, [])





  // Added state for the radio toggle at the bottom

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const handleAddressSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckoutStep('payment');
    window.scrollTo(0, 0);
  }

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let orderItems: OrderItemType[] = []

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          for (const color in cartItems[itemId][size]) {
            if (cartItems[itemId][size][color] > 0) {
              const foundProduct = products.find(product => product._id === itemId);
              if (foundProduct) {
                const itemInfo = structuredClone(foundProduct)
                orderItems.push({
                  ...itemInfo,
                  size: size,
                  color: color,
                  quantity: cartItems[itemId][size][color],
                });
              } else {
                console.warn(`Product with ID ${itemId} not found in product list.`);
              }
            }
          }
        }
      }

      const fullPhoneNumber = `${countryData.code}${formData.phone}`
      let orderData = {
        address: { ...formData, phone: fullPhoneNumber },
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate(`/order-success/${response.data.orderId}`)
          } else {
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            handleStripePayment(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message)
          }
          break;
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            handleRazorpayPayment(responseRazorpay.data.order, backendUrl, token, navigate, setCartItems);
          }
          break
        default:
          break;
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Something went wrong')
      }
    }

  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryIsoCode = e.target.value;
    setSelectedCountry(countryIsoCode)

    setSelectedState("")
    setSelectedCity("")
    setStates([])
    setCities([])
    setFormData(prev => ({ ...prev, state: "", city: "" }))

    if (countryIsoCode) {
      setStates(State.getStatesOfCountry(countryIsoCode));
      const countryName = countries.find(c => c.isoCode === countryIsoCode)?.name || "";
      setFormData(prev => ({ ...prev, country: countryName }))
    }
    else {
      setStates([])
    }
  }


  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateIsoCode = e.target.value;
    setSelectedState(stateIsoCode);
    setSelectedCity("")
    setCities([])
    setFormData(prev => ({ ...prev, city: "" }));

    if (selectedCountry && stateIsoCode) {
      setCities(City.getCitiesOfState(selectedCountry, stateIsoCode));

      const stateName = states.find(s => s.isoCode === stateIsoCode)?.name || "";
      setFormData(prev => ({ ...prev, state: stateName }))

    } else {
      setCities([])
    }
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);

    if (selectedCountry && selectedState && cityName) {
      setFormData(prev => ({ ...prev, city: cityName }))

    }

  }

  useEffect(() => {
    setCountries(Country.getAllCountries())
  }, [])





  // Common input classes based on your design
  const labelClass = "text-sm font-semibold text-gray-800 mb-2 block";
  const inputClass = "border border-gray-200 py-4 px-4 w-full text-sm outline-none focus:border-brand-brown placeholder:text-muted-foreground/50";

  return (
    <form id='checkout-form' onSubmit={checkoutStep === 'address' ? handleAddressSubmit : handlePaymentSubmit} className='border-t border-gray-300'>
      <GreyHeaderSection path={[
        { to: '/', text: 'Home' },
        { to: '/cart', text: 'Shopping Cart' },
      ]} title='Checkout' />

      <div className='flex flex-col lg:flex-row gap-10 mb-20 mt-10 lg:mt-14'>

        {/* ---------- LEFT SIDE: Billing Details -------- */}
        <div className='flex flex-col gap-6 w-full lg:w-[65%] xl:w-[70%]'>
          {
            checkoutStep === 'address' &&
            <>
              <h2 className='text-2xl font-semibold text-gray-900 mb-2'>Billing Details</h2>
              {/* First & Last Name */}
              <div className='flex flex-col sm:flex-row gap-6'>
                <div className='flex-1'>
                  <label className={labelClass}>First Name *</label>
                  <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className={inputClass} type="text" placeholder='Ex. John' />
                </div>
                <div className='flex-1'>
                  <label className={labelClass}>Last Name *</label>
                  <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className={inputClass} type="text" placeholder='Ex. Doe' />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className={labelClass}>Company Name (Optional)</label>
                <input onChange={onChangeHandler} name='companyName' value={formData.companyName} className={inputClass} type="text" placeholder='Enter Company Name' />
              </div>

              {/* Country */}
              <div>
                <label className={labelClass}>Country *</label>
                <div className="relative">
                  <select required value={selectedCountry} onChange={handleCountryChange} name='country' className={`${inputClass} appearance-none bg-white text-gray-500`}>
                    <option>Select Country</option>
                    {countries.map((country: any) => (
                      <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>

              {/* State */}
              <div>
                <label className={labelClass}>State / Equivalents *</label>
                <div className="relative">
                  <select required onChange={handleStateChange} name='state' value={selectedState} className={`${inputClass} appearance-none bg-white text-gray-500`} disabled={!selectedCountry} >
                    <option value="">Select State</option>
                    {
                      states.map((state: any) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))
                    }
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>City / Equivalents *</label>
                <div className="relative">
                  <select required onChange={handleCityChange} name='city' value={selectedCity} className={`${inputClass} appearance-none bg-white text-gray-500`} disabled={!selectedState}>
                    <option value="">Select City</option>
                    {cities.map((city: any) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className={labelClass}>Street Address *</label>
                <input required onChange={onChangeHandler} name='street' value={formData.street} className={inputClass} type="text" placeholder='Enter Street Address' />
              </div>

              {/* Zip Code */}
              <div>
                <label className={labelClass}>Zip Code *</label>
                <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className={inputClass} type="text" placeholder='Enter Zip Code' inputMode='numeric' pattern='[0-9]+' />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone *</label>
                <div className='flex border border-gray-200 focus-within:border-brand-brown bg-white transition-all'>

                  {/* prefix Blocks: FLag & Code */}
                  <div className='flex items-center gap-3 bg-gray-50 px-4 border-r border-gray-200 text-gray-200 select-none min-w-25'>
                    {countryData.flag}
                    <span className='text-sm font-medium text-primary'>{countryData.code}</span>
                  </div>

                  <input
                    required
                    onChange={onChangeHandler}
                    name='phone'
                    value={formData.phone}
                    className="flex-1 px-4 py-4 text-sm outline-none placeholder:text-muted-foreground/50 bg-transparent"
                    type="text"
                    placeholder='Enter Phone Number'
                    inputMode='numeric'
                    pattern='[0-9]+'
                    disabled={!selectedCountry}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email *</label>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className={inputClass} type="email" placeholder='Enter Email Address' />
              </div>

              {/* Delivery Address Toggles */}
              <div className="mt-2">
                <label className={labelClass}>Delivery Address *</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className={`flex-1 flex items-center gap-3 border ${deliveryOption === 'same' ? 'border-gray-400' : 'border-gray-200'}  p-4 cursor-pointer transition`}>
                    <input
                      type="radio"
                      name="deliveryAddress"
                      value="same"
                      checked={deliveryOption === 'same'}
                      onChange={() => setDeliveryOption('same')}
                      className="w-4 h-4 accent-[#462814]"
                    />
                    <span className="text-sm font-medium text-gray-700">Same as shipping address</span>
                  </label>

                  <label className={`flex-1 flex items-center gap-3 border ${deliveryOption === 'different' ? 'border-gray-400' : 'border-gray-200'} p-4 cursor-pointer transition`}>
                    <input
                      type="radio"
                      name="deliveryAddress"
                      value="different"
                      checked={deliveryOption === 'different'}
                      onChange={() => setDeliveryOption('different')}
                      className="w-4 h-4 accent-[#462814]"
                    />
                    <span className="text-sm font-medium text-gray-700">Use a different billing address</span>
                  </label>
                </div>
              </div>

            </>
          }


          {
            checkoutStep === 'payment' &&
            <>
              <div className='flex flex-col mt-4 gap-4'>
                <h2 className='text-2xl font-semibold text-gray-900 mb-4'>Select Payment Method</h2>

                {/* Stripe */}
                <label className={`flex items-center gap-4 border ${method === 'stripe' ? 'border-brand-brown' : 'border-gray-200'} p-4 cursor-pointer transition`}>
                  <input type="radio" name="paymentMethod" value="stripe" checked={method === 'stripe'} onChange={() => setMethod('stripe')} className="w-4 h-4 accent-[#462814]" />
                  <img className='h-6' src={assets.stripe} alt="Stripe" />
                  <span className="text-sm font-medium text-gray-700">Stripe</span>
                </label>

                {/* Razorpay */}
                <label className={`flex items-center gap-4 border ${method === 'razorpay' ? 'border-brand-brown' : 'border-gray-200'} p-4 cursor-pointer transition`}>
                  <input type="radio" name="paymentMethod" value="razorpay" checked={method === 'razorpay'} onChange={() => setMethod('razorpay')} className="w-4 h-4 accent-[#462814]" />
                  <img className='h-6' src={assets.razorpay} alt="Razorpay" />
                  <span className="text-sm font-medium text-gray-700">Razorpay</span>
                </label>

                {/* Master Card */}
                <label className={`flex items-center gap-4 border ${method === 'masterCard' ? 'border-brand-brown' : 'border-gray-200'} p-4 cursor-pointer transition`}>
                  <input type="radio" name="paymentMethod" value="masterCard" checked={method === 'masterCard'} onChange={() => setMethod('masterCard')} className="w-4 h-4 accent-[#462814]" disabled />
                  <img className='h-6' src={assets.masterCard} alt="masterCard" />
                  <span className="text-sm font-medium text-gray-700">MasterCard</span>
                </label>

                {/* Google Pay*/}
                <label className={`flex items-center gap-4 border ${method === 'gPay' ? 'border-brand-brown' : 'border-gray-200'} p-4 cursor-pointer transition`}>
                  <input type="radio" name="paymentMethod" value="gPay" checked={method === 'gPay'} onChange={() => setMethod('gPay')} className="w-4 h-4 accent-[#462814]" disabled />
                  <img className='h-6' src={assets.gPay} alt="Google Pay" />
                  <span className="text-sm font-medium text-gray-700">Google Pay</span>
                </label>

                {/* Visa*/}
                <label className={`flex items-center gap-4 border ${method === 'visa' ? 'border-brand-brown' : 'border-gray-200'} p-4 cursor-pointer transition`}>
                  <input type="radio" name="paymentMethod" value="visa" checked={method === 'visa'} onChange={() => setMethod('visa')} className="w-4 h-4 accent-[#462814]" disabled />
                  <img className='h-6' src={assets.visa} alt="visa" />
                  <span className="text-sm font-medium text-gray-700">Visa</span>
                </label>

                {/* COD */}
                <label className={`flex items-center gap-4 border ${method === 'cod' ? 'border-brand-brown' : 'border-gray-200'} p-4 cursor-pointer transition`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={method === 'cod'} onChange={() => setMethod('cod')} className="w-4 h-4 accent-[#462814]" />
                  <div className='flex gap-3 items-center'>
                    {/* Fixed the icon color issue by using Tailwind text color */}
                    <BsCashStack size={20} className="text-brand-brown" />
                    <span className="text-sm font-medium text-gray-700">Cash On Delivery</span>
                  </div>
                </label>

                {/* ADD NEW CARD (Dynamic Expanding Container) */}
                <div className={`border ${method === 'newCard' ? 'border-brand-brown' : 'border-gray-200'} transition`}>

                  {/* Clickable Header for Radio */}
                  <label className="flex items-center gap-4 p-4 cursor-pointer">
                    <input type="radio" name="paymentMethod" value="newCard" checked={method === 'newCard'} onChange={() => setMethod('newCard')} className="w-4 h-4 accent-brand-brown" />
                    <div className='flex gap-3 items-center'>
                      <BsFillCreditCard2FrontFill size={20} className="text-brand-brown" />
                      <span className="text-sm font-medium text-gray-700">Add New Credit/Debit Card</span>
                    </div>
                  </label>

                  {/* Expanded Form Area (Only shows when selected) */}
                  {method === 'newCard' && (
                    <div className="p-6 pt-2 flex flex-col gap-5">

                      {/* Card Holder Name */}
                      <div>
                        <label className={labelClass}>Card Holder Name *</label>
                        <input className={inputClass} type="text" placeholder="Ex. John Doe" />
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className={labelClass}>Card Number *</label>
                        <input className={inputClass} type="text" placeholder="4716 9627 1635 8047" inputMode="numeric" />
                      </div>

                      {/* Expiry & CVV */}
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                          <label className={labelClass}>Expiry Date *</label>
                          <input className={inputClass} type="text" placeholder="02/30" />
                        </div>
                        <div className="flex-1">
                          <label className={labelClass}>CVV *</label>
                          <input className={inputClass} type="password" placeholder="000" maxLength={4} inputMode="numeric" />
                        </div>
                      </div>

                      {/* Save Card Checkbox */}
                      <label className="flex items-center gap-3 cursor-pointer mt-2">
                        <input type="checkbox" className="w-4 h-4 accent-[#462814] rounded cursor-pointer" defaultChecked />
                        <span className="text-sm text-primary">Save card for future payments</span>
                      </label>

                      {/* Add Card Button */}
                      <div>
                        <button type="button" className="bg-[#462814] hover:bg-[#3d2415] text-white px-8 py-3 text-sm font-medium mt-2 transition">
                          Add Card
                        </button>
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </>
          }

        </div>

        {/* ---------- RIGHT SIDE: Order Summary & Payment -------- */}
        <div className='w-full lg:w-[35%] xl:w-[30%]'>
          <OrderSummary formId='checkout-form' isSubmitType={true} buttonText={checkoutStep === 'address' ? "Continue to Payment" : "Confirm Payment"} />
        </div>
      </div >
    </form >
  )
}