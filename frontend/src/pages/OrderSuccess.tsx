import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCheckCircle } from 'react-icons/fi';
import GreyHeaderSection from '@/components/GreyHeaderSection';

const OrderSuccess = () => {
    const { orderId } = useParams(); // Gets the ID from the URL
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [order, setOrder] = useState<any>(null);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/order/userorder', { orderId }, { headers: { token } });
            if (response.data.success) {
                console.log(response.data)
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

            <div className="max-w-5xl mx-auto px-4 mt-16 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-orange-100 p-4 rounded-full">
                        <FiCheckCircle size={40} className="text-orange-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your order is completed!</h1>
                <p className="text-gray-500 mb-10">Thank you. Your Order has been received.</p>

                {/* THE YELLOW INFO BAR (Matches image_10ec1d.png) */}
                <div className="grid grid-cols-1 md:grid-cols-5 bg-[#FDF0D1] rounded-sm mb-12 overflow-hidden border border-orange-100">
                    <div className="p-6 text-left border-r border-orange-200/50">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Order ID</p>
                        <p className="font-semibold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="p-6 text-left border-r border-orange-200/50">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Payment Method</p>
                        <p className="font-semibold text-gray-800 uppercase">{order.paymentMethod}</p>
                    </div>
                    <div className="p-6 text-left border-r border-orange-200/50">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Transaction ID</p>
                        <p className="font-semibold text-gray-800">{order.paymentId || "N/A"}</p>
                    </div>
                    <div className="p-6 text-left border-r border-orange-200/50">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Date</p>
                        <p className="font-semibold text-gray-800">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="p-6 flex items-center justify-center bg-brown-900">
                        <button className="bg-[#462814] text-white px-4 py-2 text-xs font-bold rounded-sm hover:bg-black transition">
                            Download Invoice
                        </button>
                    </div>
                </div>

                {/* ORDER DETAILS TABLE */}
                <div className="text-left">
                    <h3 className="text-xl font-semibold mb-6">Order Details</h3>
                    <div className="border border-gray-100 rounded-sm">
                        <div className="grid grid-cols-2 p-4 bg-gray-50 font-bold text-sm border-b border-gray-100">
                            <span>Products</span>
                            <span className="text-right">Sub Total</span>
                        </div>

                        {order.items.map((item: any, index: number) => (
                            <div key={index} className="grid grid-cols-2 p-4 items-center border-b border-gray-50">
                                <div className="flex gap-4 items-center">
                                    <img src={item.image[0]} className="w-16 h-16 object-cover bg-gray-50" alt="" />
                                    <div>
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-400">Size: {item.size}</p>
                                    </div>
                                </div>
                                <p className="text-right font-medium">{currency}{item.price * item.quantity}</p>
                            </div>
                        ))}

                        {/* Summary Rows */}
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span className='font-medium'>{currency}0.00</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-100">
                                <span>Total</span>
                                <span className="text-gray-900">{currency}{order.amount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;