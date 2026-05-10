import GreyHeaderSection from "@/components/GreyHeaderSection"
import Logout from "@/components/MyAccount/Logout";
import ManageAddress from "@/components/MyAccount/ManageAddress";
import MyOrders from "@/components/MyAccount/MyOrders";
import PasswordManager from "@/components/MyAccount/PasswordManager";
import PaymentMethod from "@/components/MyAccount/PaymentMethod";
import PersonalInformation from "@/components/MyAccount/PersonalInformation";
import OurPolicy from "@/components/OurPolicy";
import { useState } from "react";

const MyAccount = () => {

    const [activeTab, setActiveTab] = useState<string>('Personal Information');

    const menuItems = [
        'Personal Information',
        'My Orders',
        'Manage Address',
        'Payment Method',
        'Password Manager',
        'Logout'
    ];

    const renderComponent = () => {
        switch (activeTab) {
            case 'Personal Information':
                return <PersonalInformation />
            case 'My Orders':
                return <MyOrders />
            case 'Manage Address':
                return <ManageAddress />
            case 'Payment Method':
                return <PaymentMethod />
            case 'Password Manager':
                return <PasswordManager />
            case 'Logout':
                return <Logout />
            default:
                return <PersonalInformation />
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <GreyHeaderSection path={[
                { to: '/', text: 'Home' },
            ]} title='My Account' />

            <div className="flex flex-col md:flex-row gap-10 mb-3">

                {/* left side */}
                <div className="w-full md:w-1/4 flex flex-col gap-2">
                    {
                        menuItems.map((item) => (
                            <button onClick={() => setActiveTab(item)} key={item} className={`w-full text-left px-6 py-4 text-base font-medium transition-all border border-gray-100 ${activeTab === item ? 'bg-brand-amber text-primary font-semibold' : 'bg-white text-muted-foreground hover:bg-muted/30'}`}>
                                {item}
                            </button>
                        ))
                    }
                </div>


                {/* right side */}
                <div className="w-full md:3/4">
                    {renderComponent()}
                </div>
            </div>

            <OurPolicy />
        </div>
    )
}

export default MyAccount