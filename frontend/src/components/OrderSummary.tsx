import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";

interface OrderSummaryProps {
    buttonText?: string;
    onButtonClick?: () => void;
    isSubmitType?: boolean;
    formId?: string;
}

const OrderSummary = ({
    buttonText = "Proceed to Checkout",
    onButtonClick,
    isSubmitType = false,
    formId
}: OrderSummaryProps) => {
    const { currency, getCartAmount, getCartCount, delivery_fee, navigate } = useContext(ShopContext);

    // Static/Context data for the summary
    const subTotal = getCartAmount ? getCartAmount() : 0;
    const itemsCount = getCartCount();
    const shipping = subTotal > 0 && delivery_fee ? delivery_fee : 0;
    const taxes = 0; // Static data for now
    const couponDiscount = 100; // Static data matching the image
    const total = subTotal + shipping + taxes - couponDiscount;


    const handleAction = () => {
        if (onButtonClick) {
            // console.log("On Button Click!!")
            onButtonClick();
        } else if (!isSubmitType) {
            navigate('/place-order');
        }
    }
    return (
        <div className="border border-gray-200 p-6 bg-white">
            <h3 className="text-lg font-semibold border-b border-gray-200 pb-4 mb-6">Order Summary</h3>

            <div className="flex flex-col gap-4 text-sm text-primary mb-6">
                <div className="flex justify-between">
                    <p>Items</p>
                    <p className="font-medium text-muted-foreground">{itemsCount}</p>
                </div>
                <div className="flex justify-between">
                    <p>Sub Total</p>
                    <p className="font-medium text-muted-foreground">{currency}{subTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="font-medium text-muted-foreground">{currency}{shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Taxes</p>
                    <p className="font-medium text-muted-foreground">{currency}{taxes.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Coupon Discount</p>
                    <p className="font-medium text-muted-foreground">-{currency}{couponDiscount.toFixed(2)}</p>
                </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-8">
                <p className="font-semibold text-primary">Total</p>
                <p className="font-bold text-lg text-muted-foreground">{currency}{Math.max(0, total).toFixed(2)}</p>
            </div>

            <button
                type={isSubmitType ? "submit" : "button"}
                form={formId}
                onClick={handleAction}
                className="w-full bg-brand-brown text-white py-3.5 text-sm font-medium hover:bg-brand-amber hover:text-primary transition cursor-pointer"
            >
                {buttonText}
            </button>
        </div>
    )
}

export default OrderSummary