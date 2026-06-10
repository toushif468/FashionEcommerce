import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";
import type { OrderType } from "./MyOrders";
// types.ts or inside your component file

interface OrderCardProps {
    order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {

    const { currency } = useContext(ShopContext);
    // Status-based styles for the badge
    const statusStyles = {
        Accepted: "bg-orange-50 text-orange-600 border-orange-200",
        Delivered: "bg-green-50 text-green-600 border-green-200",
        Shipped: "bg-blue-50 text-blue-600 border-blue-200",
        Cancelled: "bg-red-50 text-red-600 border-red-200",
    };
    return (
        <div className="border border-gray-200 overflow-hidden">
            {/* 1. Order Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 bg-brand-amber p-8 text-base gap-4">
                <div>
                    <p className="text-primary/70 mb-1 uppercase font-semibold text-sm">Order ID</p>
                    <p className="text-primary font-semibold">#{order._id}</p>
                </div>
                <div className="">
                    <p className="text-primary/70 mb-1 uppercase font-semibold text-sm">Total Payment</p>
                    <p className="text-primary font-semibold">{currency}{order.totalAmount.toFixed(2)}</p>
                </div>
                <div className="">
                    <p className="text-primary/70 mb-1 uppercase font-semibold text-sm">Payment Method</p>
                    <p className="text-primary font-semibold">{order.paymentMethod}</p>
                </div>
                <div className="">
                    <p className="text-primary/70 mb-1 uppercase font-semibold text-sm">Delivery Date</p>
                    <p className="text-primary font-semibold">{order.date}</p>
                </div>
            </div>

            {/* 2. Product Items List */}
            <div className="p-6 space-y-4">
                {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center pb-4 border-b border-gray-200">
                        <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded bg-gray-50" />
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                                Color: {item.color} | Size: {item.size} | Qty: {item.qty}
                            </p>
                        </div>
                    </div>
                ))}
                {/* 3. Footer Action Area */}
                <div className=" bg-white mt-7 border-t border-gray-50 space-y-6">

                    {/* Status Row: Always on the left */}
                    <div className="flex items-center gap-4">
                        <span className={`${statusStyles[order.status]} text-sm px-6 py-2 border font-normal`}>
                            {order.status}
                        </span>
                        <p className="text-gray-500 font-medium">
                            {order.statusMessage}
                        </p>
                    </div>

                    {/* Action Row: Buttons on left, Cancel on right */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                        {/* Left Side: Main Buttons */}
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="cursor-pointer flex-1 md:flex-none bg-[#3D2616] text-white px-8 py-3 text-base font-normal hover:bg-black transition-colors">
                                {order.status === 'Delivered' ? 'Add Review' : 'Track Order'}
                            </button>
                            <button className="cursor-pointer flex-1 md:flex-none border border-gray-800 text-gray-800 px-8 py-3 text-base font-normal hover:bg-gray-50 transition-colors">
                                Invoice
                            </button>
                        </div>

                        {/* Right Side: Cancel Link */}
                        {order.status !== 'Delivered' && (
                            <button className="text-red-600 text-sm font-normal hover:underline cursor-pointer">
                                Cancel Order
                            </button>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default OrderCard;