import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCheckCircle } from 'react-icons/fi';
import GreyHeaderSection from '@/components/GreyHeaderSection';
import OurPolicy from '@/components/OurPolicy';

const OrderSuccess = () => {
    const { orderId } = useParams(); // Gets the ID from the URL
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [order, setOrder] = useState<any>(null);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/order/userorder', { orderId }, { headers: { token } });
            if (response.data.success) {
                console.log("Order success page: ", response.data)
                setOrder(response.data.order);
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not load order details");
        }
    };

    useEffect(() => {
        if (token && orderId) {
            fetchOrderDetails();
        }
    }, [token, orderId]);

    if (!order) return <div className="h-[60vh] flex items-center justify-center">Loading your receipt...</div>;

    return (
        <div className="pb-20">
            <GreyHeaderSection path={[{ to: '/', text: 'Home' }]} title='Order Completed' />

            <div className="xl:max-w-6xl mx-auto my-16 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-brand-amber p-4 rounded-full">
                        <FiCheckCircle size={40} className="text-primary" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-primary mb-2">Your order is completed!</h1>
                <p className="text-gray-500 mb-10">Thank you. Your Order has been received.</p>

                {/* THE YELLOW INFO BAR (Matches image_10ec1d.png) */}
                <div className="bg-brand-amber mb-12 overflow-hidden p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 ">

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4 flex-1">

                        {/* Order ID */}
                        <div className="flex flex-col gap-1 pl-4 text-start">
                            <span className="text-xs tracking-widest text-primary/60 uppercase font-semibold">
                                Order ID
                            </span>
                            <span className="font-bold text-primary ">
                                #{order._id}
                            </span>
                        </div>

                        {/* Payment Method */}
                        <div className="flex flex-col gap-1 border-l border-primary/10 pl-4 text-start">
                            <span className="text-xs tracking-widest text-primary/60 uppercase font-semibold">
                                Payment
                            </span>
                            <span className="font-bold text-primary">
                                {order.paymentMethod === 'COD' ? "Cash on delivery" : order.paymentMethod}
                            </span>
                        </div>

                        {/* Transaction ID */}
                        <div className="flex flex-col gap-1 md:border-l border-primary/10 pl-4 text-start">
                            <span className="text-xs tracking-widest text-primary/60 uppercase font-semibold">
                                Transaction ID
                            </span>
                            <span className="font-bold text-primary truncate">
                                {order.paymentId || "N/A"}
                            </span>
                        </div>

                        {/* Date */}
                        <div className="flex flex-col gap-1 border-l border-primary/10 pl-4 text-start">
                            <span className="text-xs tracking-widest text-primary/60 uppercase font-semibold">
                                Estimated Delivery Date
                            </span>
                            <span className="font-bold text-primary">
                                {new Date(order.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center shrink-0">
                        <button className="w-full lg:w-auto bg-brand-brown text-white px-8 py-4 text-xs uppercase tracking-tighter font-bold hover:bg-primary transition-all duration-300 active:scale-95">
                            Download Invoice
                        </button>
                    </div>
                </div>

                {/* ORDER DETAILS TABLE */}
                <div className="text-left">
                    <div className="border border-gray-200 p-5">
                        <div className="pb-4 font-bold text-lg border-b border-gray-200">
                            <span>Order Details</span>
                        </div>
                        <div className="grid grid-cols-2 pt-4 font-semibold text-sm text-primary">
                            <span>Products</span>
                            <span className="text-right">Sub Total</span>
                        </div>

                        {order.items.map((item: any, index: number) => (
                            <div key={index} className="grid grid-cols-3 py-4 items-center ">

                                <div className="col-span-2 flex gap-4 items-center">
                                    <img src={item.image[0]} className="w-16 h-auto object-cover bg-gray-50" alt="" />
                                    <div>
                                        <p className="font-semibold text-primary">{item.name}</p>
                                        <p className="text-xs sm:text-sm text-muted-foreground font-bold mt-1 sm:mt-2">
                                            Color: <span className="text-muted-foreground font-normal">{item.color}</span> | Size: <span className="text-muted-foreground font-normal">{item.size}</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-right font-medium">{currency}{item.price * item.quantity}</p>
                            </div>
                        ))}

                        {/* Summary Rows */}
                        <div className="">
                            <div className='border-t border-gray-200'>
                                <div className=" flex justify-between text-sm py-3">
                                    <span className="text-primary font-semibold">Shipping</span>
                                    <span className='font-medium'>{currency}0.00</span>
                                </div>
                                <div className=" flex justify-between text-sm py-3">
                                    <span className="text-primary font-semibold">Taxes</span>
                                    <span className='font-medium'>0.00</span>
                                </div>
                                <div className=" flex justify-between text-sm py-3">
                                    <span className="text-primary font-semibold">Coupon Discount</span>
                                    <span className='font-medium'>0.00</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-lg font-bold py-3 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-gray-900">{currency}{order.amount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OurPolicy />
        </div>
    );
};

export default OrderSuccess;