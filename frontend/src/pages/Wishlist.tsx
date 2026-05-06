import GreyHeaderSection from '@/components/GreyHeaderSection'
import React, { useContext, useEffect, useState } from 'react'
import { FiShoppingCart, FiSearch, FiX } from 'react-icons/fi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import productImg from '../assets/p_img2_2.png';
import { IoCloseOutline } from 'react-icons/io5'

// ---------------------------------------------------------
// 2. MAIN WISHLIST PAGE IMPLEMENTATION
// ---------------------------------------------------------



// --- WishlistPage Main Component ---
const WishlistPage = () => {

    // const { token, backendUrl, currency, navigate } = useContext(ShopContext);
    // const [wishlistData, setWishlistData] = useState<any[]>([]);





    // useEffect(() => {
    //     // Treat dummy data as if it came from the backend
    //     setWishlistData(dummyWishlistItems);
    // }, []);

    const handleCopyLink = () => {
        toast.success("Wishlist link copied to clipboard!")
    }

    return (
        <div className='w-full border-t'>
            <div className="flex flex-col min-h-screen">

                {/* REUSABLE GREY HEADER SECTION */}
                <GreyHeaderSection path={[{ to: '/', text: 'Home' }]} title='Wishlist' />

                {/* MAIN WISHLIST CONTENT */}
                <main className="flex-grow bg-white">
                    <div className="max-w-7xl mx-auto py-16">

                        {/* AMBER COLUMN HEADER */}
                        <div className="hidden sm:grid grid-cols-[40px_3fr_1fr_1fr_1fr_140px] bg-brand-amber gap-4 px-4 py-5 items-center">

                            {/* 1. Empty or Icon Column (40px) */}
                            <div></div>

                            {/* 2. Product (3fr) */}
                            <div className=" text-start">
                                <span className="font-bold text-primary truncate">Product</span>
                            </div>

                            {/* 3. Price (2fr) */}
                            <div className=" text-start">
                                <span className="font-bold text-primary">Price</span>
                            </div>

                            {/* 4. Date Added (120px) */}
                            <div className=" text-start">
                                <span className="font-bold text-primary truncate">Date Added</span>
                            </div>

                            {/* 5. Stock Status (1fr) */}
                            <div className=" text-start">
                                <span className="font-bold text-primary">Stock Status</span>
                            </div>

                        </div>


                        {/* WISHLIST ITEMS LIST */}
                        <div className='hidden sm:grid grid-cols-[40px_3fr_1fr_1fr_1fr_auto] py-5 px-4 text-sm font-semibold text-gray-800 items-center gap-4 border-b border-gray-200'>
                            {/* 1. Delete Icon (40px) */}
                            <button className="text-primary hover:text-brand-amber transition self-center ">
                                <IoCloseOutline size={24} />
                            </button>

                            {/* 2. Product Info (3fr) */}
                            <div className='flex items-center gap-4 '>
                                <img className="w-20 sm:w-24 object-cover" src={productImg} alt="product" />
                                <div className="flex flex-col">
                                    <p className="text-sm sm:text-base font-semibold text-primary leading-tight">
                                        Product Name
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground font-bold mt-1">
                                        Color: <span className="font-normal">Pink</span> | Size: <span className="font-normal">XL</span>
                                    </p>
                                </div>
                            </div>

                            {/* 3. Price (1fr) */}
                            <p className="text-sm font-medium text-gray-700">
                                $287.99
                            </p>

                            {/* 4. Date Added (120px) */}
                            <p className="text-sm font-medium text-gray-700">
                                17 Feb 2024
                            </p>

                            {/* 5. Stock Status (1fr) */}
                            <p className="text-sm font-medium text-gray-700">
                                Instock
                            </p>

                            {/* 6. Add to Cart (auto) */}
                            <button className="bg-brand-brown text-white h-[48px] px-6 text-xs font-bold uppercase hover:bg-black transition active:scale-95 shadow-md whitespace-nowrap">
                                Add to Cart
                            </button>
                        </div>

                        {/* <div className="border  rounded-sm mb-12">
                            {wishlistData.map((item) => (
                                <WishlistItem key={item._id} item={item} />
                            ))}
                        </div> */}

                        {/* BOTTOM ACTIONS BAR */}
                        <div className="flex items-center justify-between py-6 px-1.5 gap-10">

                            {/* Left Part: Link Section */}
                            <div className="flex flex-1 items-center gap-4">
                                <span className="text-lg font-semibold text-primary">Wishlist link:</span>
                                <input
                                    type="text"
                                    readOnly
                                    value="https://www.example.com"
                                    className="flex-1 border border-gray-200 bg-white h-[58px] px-6 text-sm text-gray-700 outline-none rounded-sm shadow-inner"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="bg-brand-brown text-white h-[58px] px-10 text-xs font-bold uppercase hover:bg-black transition active:scale-95 shadow-md">
                                    Copy
                                </button>
                            </div>

                            {/* Right Part: Action Section */}
                            <div className="flex items-center gap-4 shrink-0">
                                <span className="text-lg font-semibold text-primary cursor-pointer hover:text-brand-brown underline underline-offset-4">Clear Wishlist</span>
                                <button className="bg-brand-brown text-white h-[58px] px-10 text-xs font-bold uppercase hover:bg-black transition active:scale-95 shadow-md">
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