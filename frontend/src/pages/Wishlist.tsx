// import React, from 'react';
import GreyHeaderSection from '@/components/GreyHeaderSection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productImg from '../assets/p_img2_2.png';
import { IoCloseOutline } from 'react-icons/io5';


// ---------------------------------------------------------
// 2. MAIN WISHLIST PAGE IMPLEMENTATION
// ---------------------------------------------------------

const WishlistPage = () => {
    // const { token, backendUrl, currency, navigate } = useContext(ShopContext);
    // const [wishlistData, setWishlistData] = useState<any[]>([]);

    const handleCopyLink = () => {
        toast.success("Wishlist link copied to clipboard!");
    }

    // Shared grid layout for perfect alignment between header and rows
    // const gridLayout = "grid grid-cols-[40px_3fr_1fr_1.5fr_1fr_140px]";

    return (
        <div className='w-full border-t font-sans'>
            <div className="flex flex-col ">

                {/* REUSABLE GREY HEADER SECTION */}
                <GreyHeaderSection path={[{ to: '/', text: 'Home' }]} title='Wishlist' />

                {/* MAIN WISHLIST CONTENT */}
                <main className="grow bg-white">
                    <div className="max-w-7xl mx-auto  ">

                        {/* AMBER COLUMN HEADER */}
                        <div className={`hidden md:grid grid-cols-[40px_3fr_1fr_1.5fr_1fr_140px] bg-brand-amber/80 gap-4 py-4 items-center `}>
                            <div></div> {/* Empty for X icon */}
                            <div className="text-start">
                                <span className="font-semibold text-brand-brown">Product</span>
                            </div>
                            <div className="text-start">
                                <span className="font-semibold text-brand-brown">Price</span>
                            </div>
                            <div className="text-start">
                                <span className="font-semibold text-brand-brown">Date Added</span>
                            </div>
                            <div className="text-start">
                                <span className="font-semibold text-brand-brown">Stock Status</span>
                            </div>
                            <div></div> {/* Empty for Add to Cart button */}
                        </div>

                        {/* WISHLIST ITEMS LIST */}
                        <div className="flex flex-col w-full mb-12">
                            {/* Static Example Row (Map your wishlistData here) */}
                            <div className={`grid grid-cols-[auto_2fr_0.8fr_0.7fr] md:grid-cols-[40px_3fr_1fr_1.5fr_1fr_140px] py-6 items-center gap-4 border-b border-gray-200`}>

                                {/* 1. Delete Icon */}
                                <button className="text-gray-500 hover:text-brand-brown transition md:block">
                                    <IoCloseOutline size={22} />
                                </button>

                                {/* 2. Product Info */}
                                <div className='flex items-center gap-4'>

                                    <img
                                        className="w-20 sm:w-24 object-cover"
                                        src={productImg}
                                        alt="Light Brown Sweater"
                                    />

                                    <div className="flex flex-col">

                                        <p className="text-base font-bold text-brand-brown">
                                            Light Brown Sweater
                                        </p>

                                        {/* Desktop Version */}
                                        <p className="hidden md:block text-sm text-gray-500 mt-0.5">
                                            Color:
                                            <span className="text-sm text-muted-foreground font-bold ml-1">
                                                Red
                                            </span>

                                            {" | "}

                                            Size:
                                            <span className="text-gray-700 ml-1">
                                                XXL
                                            </span>
                                        </p>

                                        {/* Mobile Version */}
                                        <div className="flex flex-col md:hidden text-sm text-gray-500 mt-1">

                                            <p>
                                                Color:
                                                <span className="text-muted-foreground font-bold ml-1">
                                                    Red
                                                </span>
                                            </p>

                                            <p>
                                                Size:
                                                <span className="text-gray-700 ml-1">
                                                    XXL
                                                </span>
                                            </p>

                                            {/* Mobile Only Stock */}
                                            <div className='flex items-center gap-2'>
                                                <p className="text-sm font-medium text-emerald-500 ">
                                                    Instock
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    $64.00
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* 3. Price */}
                                <p className="hidden md:block text-sm mt-2 font-semibold text-gray-800">
                                    $64.00
                                </p>

                                {/* 4. Date Added */}
                                <p className=" text-sm text-gray-600">
                                    18 February 2024
                                </p>

                                {/* 5. Stock Status */}
                                <p className="hidden md:block text-sm font-medium text-emerald-500">
                                    Instock
                                </p>

                                {/* 6. Add to Cart */}
                                <button className="bg-brand-brown text-white py-4 w-full text-sm font-medium hover:bg-black transition ">
                                    Add to Cart
                                </button>
                            </div>
                            {/* End Example Row */}
                        </div>

                        {/* BOTTOM ACTIONS BAR */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-20">

                            {/* Left Part: Link Section */}
                            <div className="flex w-full md:w-auto items-center gap-4">
                                <span className="text-sm font-semibold text-brand-brown underline underline-offset-4 decoration-gray-300">Wishlist link:</span>
                                <input
                                    type="text"
                                    readOnly
                                    value="https://www.example.com"
                                    className="w-full md:w-64 border border-gray-200 bg-white h-[44px] px-4 text-sm text-gray-600 outline-none "
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="bg-brand-brown text-white h-[44px] px-8 text-sm font-medium hover:bg-black transition ">
                                    Copy
                                </button>
                            </div>

                            {/* Right Part: Action Section */}
                            <div className="flex items-center gap-6 shrink-0">
                                <button className="text-sm font-semibold text-brand-brown underline underline-offset-4 decoration-gray-300 hover:text-black transition">
                                    Clear Wishlist
                                </button>
                                <button className="bg-brand-brown text-white h-[44px] px-8 text-sm font-medium hover:bg-black transition ">
                                    Add All to Cart
                                </button>
                            </div>
                        </div>


                    </div>
                </main>
            </div>
        </div>
    )
}

export default WishlistPage;