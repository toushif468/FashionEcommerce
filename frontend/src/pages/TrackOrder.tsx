import { useContext, useState, type ChangeEvent } from 'react'
import GreyHeaderSection from '@/components/GreyHeaderSection'
import OurPolicy from '@/components/OurPolicy'
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

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

    const { navigate, backendUrl, token } = useContext(ShopContext);

    const handleTrackOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Sending request to backend
            const response = await axios.post(`${backendUrl}/api/order/track`, orderSearchInfo, { headers: { token } });

            if (response.data.success) {
                toast.success("Order Found!");
                // Optionally navigate to a specific order details page 
                // or just log the data for now.
                console.log("Order Details:", response.data.order);

                // If you have an order details page:
                // navigate(`/order/${response.data.order._id}`);
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

    return (
        <div className="w-full">
            <GreyHeaderSection path={[{ to: '/', text: 'Home' }]} title="Track Your Order" />

            <main className="max-w-7xl mx-auto px-6 py-14">
                <div className="max-w-4xl">
                    <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                        To track your order please enter your Order ID in the box below and press the "Track Order" button.
                        This was given to you on your receipt and in the confirmation email you should have received.
                    </p>

                    <form onSubmit={handleTrackOrder} className="space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-primary mb-2">
                                Order ID *
                            </label>
                            <input
                                type="text"
                                name='orderId'
                                required
                                placeholder="Enter Your Order ID"
                                value={orderSearchInfo.orderId}
                                onChange={handleTrackOrderChange}
                                className="w-full border border-gray-200 py-4 px-6 text-sm focus:outline-none focus:border-brand-brown transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-primary mb-2">
                                Billing Email *
                            </label>
                            <input
                                type="email"
                                name='billingEmail'
                                required
                                placeholder="Enter Email Address"
                                value={orderSearchInfo.billingEmail}
                                onChange={handleTrackOrderChange}
                                className="w-full border border-gray-200 py-4 px-6 text-sm focus:outline-none focus:border-brand-brown transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-brand-brown text-white px-8 py-4 text-sm font-semibold uppercase hover:bg-primary transition-colors disabled:opacity-50"
                        >
                            {loading ? "Searching..." : "Track Order"}
                        </button>
                    </form>
                </div>
            </main>

            <OurPolicy />
        </div>
    )
}

export default TrackOrder;