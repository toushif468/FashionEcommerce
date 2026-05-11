import GreyHeaderSection from '@/components/GreyHeaderSection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import { ShopContext } from '@/context/ShopContext';
import { useContext, useEffect } from 'react';


const WishlistPage = () => {
    const { token, backendUrl, currency, getWishlistData, wishlistData, setWishlistData } = useContext(ShopContext);

    const deleteOneItem = async (wishlistId: string) => {
        try {
            const response = await axios.post(`${backendUrl}/api/wishlist/clear`, { wishlistId }, { headers: { token: token } })
            if (response.data.success) {
                setWishlistData((prev) => prev.filter(item => item._id !== wishlistId))
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getWishlistData();
    }, [token]);

    // 2. Function to clear entire wishlist
    const clearWishlist = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/wishlist/clear`, {}, { headers: { token } });
            if (response.data.success) {
                setWishlistData([]);
                toast.success("Wishlist cleared");
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <div className='w-full border-t font-sans'>
            <div className="flex flex-col ">

                <GreyHeaderSection path={[{ to: '/', text: 'Home' }]} title='Wishlist' />

                <main className="grow bg-white">
                    <div className="max-w-7xl mx-auto  ">

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
                            {
                                wishlistData.map((item) => (
                                    <div key={item._id} className={`grid grid-cols-[auto_2fr_0.8fr_0.7fr] md:grid-cols-[40px_3fr_1fr_1.5fr_1fr_140px] py-6 items-center gap-4 border-b border-gray-200`}>

                                        {/* 1. Delete Icon */}
                                        <button onClick={() => deleteOneItem(item._id)} className="text-gray-500 hover:text-brand-brown transition md:block">
                                            <IoCloseOutline size={22} />
                                        </button>

                                        {/* 2. Product Info */}
                                        <div className='flex items-center gap-4'>

                                            <img
                                                className="w-20 sm:w-24 object-cover"
                                                src={item.productId.image[0]}
                                                alt="Light Brown Sweater"
                                            />

                                            <div className="flex flex-col">

                                                <p className="text-base font-bold text-primary">
                                                    {item.productId.name}
                                                </p>

                                                {/* Desktop Version */}
                                                <p className="hidden md:block text-sm text-muted-foreground mt-0.5 font-bold">
                                                    Color:
                                                    <span className="text-sm text-muted-foreground font-base ml-1 font-normal">
                                                        {item.color ? item.color : "N/A"}
                                                    </span>

                                                    {" | "}

                                                    Size:
                                                    <span className="text-muted-foreground ml-1 font-normal">
                                                        {item.size ? item.size : "N/A"}
                                                    </span>
                                                </p>

                                                {/* Mobile Version */}
                                                <div className="flex flex-col md:hidden text-sm text-muted-foreground mt-1">

                                                    <p className='font-bold'>
                                                        Color:
                                                        <span className="text-muted-foreground font-normal ml-1">
                                                            {item.size ? item.size : "N/A"}
                                                        </span>
                                                    </p>

                                                    <p className='font-bold'>
                                                        Size:
                                                        <span className="ml-1">
                                                            {item.size}
                                                        </span>
                                                    </p>

                                                    {/* Mobile Only Stock */}
                                                    <div className='flex items-center gap-2'>
                                                        <p className="text-sm font-medium text-emerald-500 ">
                                                            Instock
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {currency}{item.productId.price}
                                                        </p>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        {/* 3. Price */}
                                        <p className="hidden md:block text-sm mt-2 font-semibold text-gray-800">
                                            {currency}{item.productId.price}
                                        </p>

                                        {/* 4. Date Added */}
                                        <p className="text-sm text-gray-600">
                                            {new Date(item.date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
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


                                ))
                            }
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
                                    onClick={() => { toast.success("Wishlist link copied to clipboard!"); }}
                                    className="bg-brand-brown text-white h-[44px] px-8 text-sm font-medium hover:bg-black transition ">
                                    Copy
                                </button>
                            </div>

                            {/* Right Part: Action Section */}
                            <div className="flex items-center gap-6 shrink-0">
                                <button onClick={clearWishlist} className="text-sm font-semibold text-brand-brown underline underline-offset-4 decoration-gray-300 hover:text-black transition">
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

