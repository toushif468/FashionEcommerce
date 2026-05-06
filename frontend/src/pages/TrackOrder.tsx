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
    const { backendUrl, token, currency } = useContext(ShopContext);

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
        { label: 'Order Placed', icon: <LuClipboardCheck size={24} /> },
        { label: 'Accepted', icon: <LuPackageSearch size={24} /> },
        { label: 'In Progress', icon: <LuPackageCheck size={24} /> },
        { label: 'On the Way', icon: <LuTruck size={24} /> },
        { label: 'Delivered', icon: <LuHouse size={24} /> },
    ];

    const currentStatusIndex = statusSteps.findIndex(s => s.label === orderData?.status);

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
                            <p className="text-gray-500 mt-2">Order ID : <span className="font-semibold text-black">#{orderData._id}</span></p>
                        </div>

                        {/* Status Timeline - Matching image_760819.png */}
                        <div className="border border-gray-200 px-8 py-7 ">
                            <div className="relative flex justify-between">

                                {/* Background Grey Line */}
                                <div className="absolute top-[91.5px] left-[10%] right-[10%] h-[6px] bg-[#f0f0f0] rounded-full -z-0" />

                                {/* Active Dark Line */}
                                <div
                                    className="absolute top-[91.5px] left-[10%] h-[6px] bg-[#222] rounded-full transition-all duration-500 -z-0"
                                    style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 80}%` }}
                                />

                                {statusSteps.map((step, index) => {
                                    const isCompleted = index <= currentStatusIndex;

                                    return (
                                        <div key={index} className="flex flex-col items-center z-10 w-full">
                                            {/* 1. Icon with Yellow Accent */}
                                            <div className="relative mb-3">
                                                {/* This mimics the yellow circle behind the icon in your image */}
                                                {isCompleted && index < 2 && (
                                                    <div className="absolute -right-1 bottom-0 w-4 h-4 bg-[#fdbd5d] rounded-full -z-10 opacity-70" />
                                                )}
                                                <span className={`${isCompleted ? 'text-[#222]' : 'text-[#999]'}`}>
                                                    {step.icon}
                                                </span>
                                            </div>

                                            {/* 2. Status Label */}
                                            <p className={`text-[14px] font-medium mb-6 ${isCompleted ? 'text-[#222]' : 'text-[#999]'}`}>
                                                {step.label}
                                            </p>

                                            {/* 3. Checkbox Indicator */}
                                            <div className={`w-7 h-7 rounded-md flex items-center justify-center mb-6 transition-colors ${isCompleted ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`}>
                                                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 5.5L5 9.5L13 1.5" stroke={isCompleted ? "white" : "#d1d1d1"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>

                                            {/* 4. Date and Time */}
                                            <div className="text-center space-y-1">
                                                <p className={`text-[13px] ${isCompleted ? 'text-[#222] font-semibold' : 'text-[#999]'}`}>
                                                    {index === 0 ? "20 Feb 2024" : isCompleted ? "20 Feb 2024" : `Expected`}
                                                </p>
                                                <p className={`text-[13px] ${isCompleted ? 'text-[#222] font-semibold' : 'text-[#999]'}`}>
                                                    {index === 0 ? "11:00 AM" : isCompleted ? "11:15 AM" : step.expectedDate}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Product List */}
                        <div className="border rounded-sm overflow-hidden">
                            <div className="bg-white px-8 py-5 border-b font-bold text-lg">Products</div>
                            <div className="divide-y">
                                {orderData.items.map((item: any, index: number) => (
                                    <div key={index} className="p-8 flex items-center gap-6">
                                        <img src={item.image[0]} alt={item.name} className="w-20 h-24 object-cover" />
                                        <div className="flex-grow">
                                            <h4 className="font-bold text-lg text-primary">{item.name}</h4>
                                            <p className="text-gray-500 text-sm mt-1">
                                                Color: <span className="font-medium text-black">{item.color || 'N/A'}</span> |
                                                Size: <span className="font-medium text-black">{item.size}</span> |
                                                {item.quantity} Qty.
                                            </p>
                                        </div>
                                        {/* <div className="text-xl font-bold">{currency}{item.price}</div> */}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => setOrderData(null)} className="text-brand-brown font-bold underline">Track another order</button>
                    </div>
                )}
            </main>
            <OurPolicy />
        </div>
    )
}

export default TrackOrder;