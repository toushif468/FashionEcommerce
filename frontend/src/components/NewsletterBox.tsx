import { IoMail } from "react-icons/io5";

const NewsletterBox = () => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="text-center py-16 px-4">
      <p className="text-gray-800 text-base tracking-wide mb-3">Our Newsletter</p>

      <h2 className="text-xl md:text-4xl text-gray-800 font-bold leading-tight">
        Subscribe to Our Newsletter to Get <br className="hidden md:block" />
        Updates to Our Latest Collection
      </h2>

      <p className="text-gray-500 mt-5 text-sm md:text-base">
        Get 20% off on your first order just by subscribing to our newsletter
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="max-w-2xl w-full mx-auto mt-10 flex items-center border border-gray-200 shadow-sm bg-white"
      >
        <div className="p-2 shrink-0">
          <div className="bg-brand-amber flex items-center justify-center w-10 h-10 md:w-14 md:h-14">
            <IoMail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
        </div>

        <input
          className="flex-1 min-w-0 outline-none px-2 md:px-4 text-primary placeholder:text-gray-400 text-sm md:text-base"
          type="email"
          placeholder="Enter Email..."
          required
        />

        <button
          className="bg-brand-brown text-white px-4 md:px-12 self-stretch font-bold text-xs md:text-sm tracking-wider whitespace-nowrap shrink-0 transition-colors hover:bg-opacity-95"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;