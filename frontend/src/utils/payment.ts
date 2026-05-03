import { toast } from 'react-toastify'
import axios from 'axios'


export const handleRazorpayPayment = async (
    order: any,
    backendUrl: string,
    token: string,
    navigate: Function,
    setCartItems: Function
) => {
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Order Payment',
        description: 'Order payment',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response: any) => {
            try {
                const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
                if (data.success) {
                    setCartItems({});
                    navigate('/orders');
                } else {
                    toast.error(data.message);
                }
            } catch (error: any) {
                console.log(error);
                toast.error(error?.message || 'Payment verification failed');
            }
        }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
};


export const handleStripePayment = (session_url: string) => {
    if (session_url) {
        window.location.replace(session_url);
    } else {
        toast.error("Stripe session URL not found.");
    }
};