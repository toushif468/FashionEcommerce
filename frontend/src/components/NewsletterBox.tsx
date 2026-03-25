
import { IoMail } from "react-icons/io5";

const NewsletterBox = () => {

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <div className='text-center py-16 px-4'>
      {/* Small Header */}
      <p className="text-gray-800 text-base tracking-wide mb-3 font-maison">
        Our Newsletter
      </p>

      {/* Main Heading - Split into two lines for desktop */}
      <h2 className='text-xl md:text-4xl text-gray-800 font-maison font-bold leading-tight'>
        Subscribe to Our Newsletter to Get <br className="hidden md:block" />
        Updates to Our Latest Collection
      </h2>

      {/* Subtext */}
      <p className='text-gray-500 mt-5 font-maison text-sm md:text-base'>
        Get 20% off on your first order just by subscribing to our newsletter
      </p>

      {/* Subscription Form */}
      <form
        onSubmit={onSubmitHandler}
        className='max-w-2xl mx-auto mt-10 flex items-stretch gap-0 border border-gray-200 shadow-sm'
      >
        {/* Decorative Icon Box */}
        <div className='bg-brand-amber flex items-center justify-center px-4 py-4 border-7 border-white'>
          <IoMail className="w-8 h-8 text-black" />
        </div>

        {/* Input Field */}
        <input
          className='flex-1 outline-none  text-gray-700 placeholder:text-gray-400 font-maison'
          type="email"
          placeholder='Enter Email Address'
          required
        />

        {/* Subscribe Button */}
        <button
          className='bg-brand-brown text-white px-8 md:px-12 py-4 font-maison font-bold text-sm tracking-wider hover:bg-[#2a1000] transition-colors'
          type='submit'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox;