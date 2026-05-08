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
                            <button type="submit" disabled={loading} className="bg-brand-brown text-white px-8 py-4 text-sm font-semibold uppercase hover:bg-primary transition-colors disabled:opacity-100">
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

                        {/* Status Timeline Container */}
                        <div className="border border-gray-200 px-6 py-10 md:py-6">
                            <div className="relative flex flex-col md:flex-row justify-between gap-10 md:gap-0">

                                {/* --- DESKTOP HORIZONTAL LINES (Hidden on Mobile) --- */}
                                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[10%] right-[10%] h-[2.5px] bg-[#f0f0f0] -z-0" />
                                <div
                                    className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[10%] h-[2.5px] bg-[#222] transition-all duration-500 -z-0"
                                    style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 80}%` }}
                                />

                                {statusSteps.map((step, index) => {
                                    const isCompleted = index <= currentStatusIndex;
                                    const isLast = index === statusSteps.length - 1;

                                    return (
                                        <div
                                            key={index}
                                            className="relative grid grid-cols-[40px_1fr_auto] md:grid-cols-1 md:grid-rows-3 items-center z-10 w-full md:min-h-[160px] gap-4 md:gap-2"
                                        >
                                            {/* --- MOBILE VERTICAL LINE --- */}
                                            {/* This line connects the checkboxes vertically on small screens */}
                                            {!isLast && (
                                                <div className="md:hidden absolute left-[19px] top-10 w-[2.5px] h-full bg-[#f0f0f0] -z-10">
                                                    {isCompleted && index < currentStatusIndex && (
                                                        <div className="absolute top-0 w-full h-full bg-[#222]" />
                                                    )}
                                                </div>
                                            )}

                                            {/* --- 1. THE CHECKBOX (Column 1 on Mobile / Row 2 on Desktop) --- */}
                                            {/* On Desktop, we use order classes to move it to the middle row */}
                                            <div className="flex items-center justify-center h-full md:order-2 ">
                                                <div className='bg-white md:p-3'>
                                                    <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${isCompleted ? 'bg-[#222]' : 'bg-[#f0f0f0]'}`}>
                                                        <svg width="12" height="10" viewBox="0 0 14 11" fill="none">
                                                            <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* --- 2. STATUS DETAILS (Column 2 on Mobile / Row 1 on Desktop) --- */}
                                            <div className="flex flex-row md:flex-col items-center md:justify-end md:pb-4 h-full md:order-1 gap-3 md:gap-0">
                                                {/* Icon - Hidden or minimized on mobile if preferred, or kept next to text */}
                                                <div className="relative md:mb-2">
                                                    {isCompleted && (
                                                        <div className="absolute -right-1 bottom-0 w-[60%] h-[60%] bg-[#fdbd5d] rounded-full -z-10 opacity-70" />
                                                    )}
                                                    <span className={`${isCompleted ? 'text-[#222]' : 'text-[#999]'}`}>
                                                        {step.icon}
                                                    </span>
                                                </div>
                                                <p className={`text-sm md:text-base font-medium ${isCompleted ? 'text-[#222]' : 'text-[#999]'}`}>
                                                    {step.label}
                                                </p>
                                            </div>

                                            {/* --- 3. DATE & TIME (Column 3 on Mobile / Row 3 on Desktop) --- */}
                                            <div className="flex flex-col items-end md:items-center justify-start md:pt-4 text-right md:text-center md:order-3">
                                                <p className={`text-xs md:text-sm ${isCompleted ? 'text-primary font-semibold' : 'text-[#999]'}`}>
                                                    {index === 0 ? "20 Feb 2024" : isCompleted ? "20 Feb 2024" : `Expected`}
                                                </p>
                                                <p className={`text-xs md:text-sm ${isCompleted ? 'text-primary/70' : 'text-[#999]'}`}>
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