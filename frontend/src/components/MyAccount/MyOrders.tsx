import OrderCard from "./OrderCard"

export interface OrderItem {
    name: string;
    color: string;
    size: string;
    qty: number;
    image: string;
    price: number;
}

export interface OrderType {
    _id: string;
    totalAmount: number;
    paymentMethod: string;
    date: string;
    status: 'Accepted' | 'Delivered' | 'Shipped' | 'Cancelled';
    statusMessage: string;
    items: OrderItem[];
}

const MyOrders = () => {

    const staticOrders: OrderType[] = [
        {
            _id: "SDGT1254FD",
            totalAmount: 633.00,
            paymentMethod: "Paypal",
            date: "24 February 2024",
            status: "Accepted",
            statusMessage: "Your Order has been Accepted",
            items: [
                { name: "Trendy Brown Coat", color: "Brown", size: "XXL", qty: 4, image: "https://via.placeholder.com/100x120", price: 150 },
                { name: "Classy Light Coat", color: "Cream", size: "XXL", qty: 1, image: "https://via.placeholder.com/100x120", price: 100 },
                { name: "Light Brown Sweater", color: "Light Brown", size: "S", qty: 1, image: "https://via.placeholder.com/100x120", price: 80 }
            ]
        },
        {
            _id: "SDGT7412DF",
            totalAmount: 60.00,
            paymentMethod: "Cash",
            date: "12 February 2024",
            status: "Delivered",
            statusMessage: "Your Order has been Delivered",
            items: [
                { name: "Brown Winter Coat", color: "Brown", size: "XXL", qty: 1, image: "https://via.placeholder.com/100x120", price: 60 }
            ]
        }
    ];
    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Orders (2)</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select className="border rounded px-2 py-1 text-sm outline-none">
                        <option>All</option>
                    </select>
                </div>
            </div>

            {/* Order Card List */}
            <div className="space-y-8">
                {/* Mapping your orders here */}
                {
                    staticOrders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))
                }
            </div>
        </div>
    )
}

export default MyOrders