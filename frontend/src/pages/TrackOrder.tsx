import { useContext, useState, type ChangeEvent } from 'react'
import GreyHeaderSection from '@/components/GreyHeaderSection'
import OurPolicy from '@/components/OurPolicy'
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LuPackageCheck, LuPackageSearch, LuTruck, LuHouse, LuClipboardCheck } from "react-icons/lu";

interface InfoType {
    orderId: string;
    billingEmail: string;
}

const TrackOrder = () => {
    const [orderSearchInfo, setOrderSearchInfo] = useState<InfoType>({
        orderId: '',
        billingEmail: '',
    });
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);
    const { backendUrl, token } = useContext(ShopContext);

    const handleTrackOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/api/order/track`, orderSearchInfo, { headers: { token } });

            if (response.data.success) {
                setOrderData(response.data.order);
                toast.success("Order status retrieved");
                console.log("Track Order Page:", response.data.order);

            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const handleTrackOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderSearchInfo(prev => ({ ...prev, [name]: value }));
    }


    // Status mapping for the progress bar
    const statusSteps = [
        { label: 'Order Placed', icon: <LuClipboardCheck size={40} /> },
        { label: 'Accepted', icon: <LuPackageSearch size={40} /> },
        { label: 'In Progress', icon: <LuPackageCheck size={40} /> },
        { label: 'On the Way', icon: <LuTruck size={40} /> },
        { label: 'Delivered', icon: <LuHouse size={40} /> },
    ];

    const currentStatusIndex = statusSteps.findIndex(s => s.label === orderData?.status);
    console.log("index")
    console.log(currentStatusIndex)

    return (
        <div className="w-full">
            <GreyHeaderSection path={[{ to: '/', text: 'Home' }]} title="Track Your Order" />

            <main className="max-w-7xl mx-auto px-6 py-14">
                {!orderData ? (
                    /* --- SEARCH FORM --- */
                    <div className="max-w-4xl">
                        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                            To track your order please enter your Order ID in the box below and press the "Track Order" button.
                        </p>
                        <form onSubmit={handleTrackOrder} className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-primary mb-2">Order ID *</label>
                                <input type="text" name='orderId' required placeholder="Enter Your Order ID" value={orderSearchInfo.orderId} onChange={handleTrackOrderChange} className="w-full border border-gray-200 py-4 px-6 text-sm focus:outline-none focus:border-brand-brown" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-primary mb-2">Billing Email *</label>
                                <input type="email" name='billingEmail' required placeholder="Enter Email Address" value={orderSearchInfo.billingEmail} onChange={handleTrackOrderChange} className="w-full border border-gray-200 py-4 px-6 text-sm focus:outline-none focus:border-brand-brown" />
                            </div>
                            <button type="submit" disabled={loading} className="bg-brand-brown text-white px-8 py-4 text-sm font-semibold uppercase hover:bg-primary transition-colors disabled:opacity-50">
                                {loading ? "Searching..." : "Track Order"}
                            </button>
                        </form>
                    </div>
                ) : (
                    /* --- ORDER DETAILS VIEW --- */
                    <div className="space-y-12">
                        {/* Order ID Header */}
                        <div>
                            <h2 className="text-2xl font-bold text-primary">Order Status</h2>
                            <p className="text-muted-foreground mt-2">Order ID : <span className="font-semibold text-black">#{orderData._id}</span></p>
                        </div>

                        {/* Status Timeline - Matching image_760819.png */}
                        <div className="border border-gray-200 px-6 py-6 ">
                            <div className="relative flex justify-between">

                                {/* Background Grey Line */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-[10%] right-[10%] h-[6px] bg-[#f0f0f0] rounded-full -z-0" />

                                {/* Active Dark Line */}
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 left-[10%] h-[6px] bg-[#222] rounded-full transition-all duration-500 -z-0"
                                    style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 80}%` }}
                                />

                                {statusSteps.map((step, index) => {
                                    const isCompleted = index <= currentStatusIndex;

                                    return (
                                        // 1. Changed to a CSS Grid with 3 equal rows
                                        <div key={index} className="grid grid-rows-3 gap-2 items-center z-10 w-full min-h-[160px]">

                                            {/* --- TOP ROW (Icon & Label) --- */}
                                            {/* items-end pushes the content to the bottom of this grid cell */}
                                            <div className="flex flex-col items-center justify-end h-full">
                                                <div className="relative mb-2">
                                                    {isCompleted && (
                                                        <div className="absolute -right-1 bottom-0 w-[60%] h-[60%] bg-[#fdbd5d] rounded-full -z-10 opacity-70" />
                                                    )}
                                                    <span className={`${isCompleted ? 'text-[#222]' : 'text-[#999]'}`}>
                                                        {step.icon}
                                                    </span>
                                                </div>
                                                <p className={`text-base font-medium ${isCompleted ? 'text-[#222]' : 'text-[#999]'}`}>
                                                    {step.label}
                                                </p>
                                            </div>

                                            {/* --- MIDDLE ROW (Checkbox) --- */}
                                            {/* Naturally centered in the middle grid cell */}
                                            <div className="flex items-center justify-center h-full">
                                                <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${isCompleted ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`}>
                                                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 5.5L5 9.5L13 1.5" stroke={isCompleted ? "white" : "white"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* --- BOTTOM ROW (Date & Time) --- */}
                                            {/* items-start pushes the content to the top of this grid cell */}
                                            <div className="flex flex-col items-center justify-start text-center space-y-1 ">
                                                <p className={`text-base ${isCompleted ? 'text-primary font-semibold' : 'text-[#999]'}`}>
                                                    {index === 0 ? "20 Feb 2024" : isCompleted ? "20 Feb 2024" : `Expected`}
                                                </p>
                                                <p className={`text-base ${isCompleted ? 'text-primary/90 font-normal' : 'text-[#999]'}`}>
                                                    {index === 0 ? "11:00 AM" : isCompleted ? "11:15 AM" : "30 Feb 2024"}
                                                </p>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Product List */}
                        <div className="border pt-6 px-6 overflow-hidden">
                            <div className="bg-white pb-5 border-b font-bold text-lg">Products</div>
                            <div className="divide-y">
                                {orderData.items.map((item: any, index: number) => (
                                    <div key={index} className="py-6 flex items-center gap-6">
                                        <img src={item.image[0]} alt={item.name} className="w-20 h-24 object-cover" />
                                        <div className="flex-grow">
                                            <h4 className="font-semibold text-lg text-primary">{item.name}</h4>
                                            <p className="text-muted-foreground text-base mt-1">
                                                Color : <span className="font-medium text-primary">{item.color || 'N/A'}</span> |
                                                Size : <span className="font-medium text-primary">{item.size}</span> |
                                                <span className="font-medium text-primary"> {item.quantity}</span> Qty.
                                            </p>
                                        </div>
                                        {/* <div className="text-xl font-bold">{currency}{item.price}</div> */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => setOrderData(null)} className="text-brand-brown text-lg font-semibold cursor-pointer underline">Track another order</button>
                    </div>
                )}
            </main>
            <OurPolicy />
        </div>
    )
}

export default TrackOrder;