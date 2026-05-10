
import { assets } from "@/assets/assets";
import { BiEditAlt } from "react-icons/bi";
const PersonalInformation = () => {
    return (
        <div className="flex flex-col items-center md:items-start">
            <div className="relative mb-8">
                <img src={assets.portfolio} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm" alt="portfolio" />
                <button className="absolute bottom-1 right-1 bg-brand-brown text-white p-2 rounded-full border-2 border-white">
                    <BiEditAlt size={20} className="text-white" />
                </button>
            </div>

            <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-base font-semibold mb-2">First Name *</label>
                    <input type="text" placeholder="Bessie" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-brand-brown" />
                </div>
                <div>
                    <label className="block text-base font-semibold mb-2">Last Name *</label>
                    <input type="text" placeholder="Cooper" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-brand-brown" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-base font-semibold mb-2">Email *</label>
                    <input type="email" placeholder="example@gmail.com" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focusbrand-border-brand-browner-black" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-base font-semibold mb-2">Phone *</label>
                    <input type="text" placeholder="+0123-456-789" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-brand-brown" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-base font-semibold mb-2">Gender *</label>
                    <select className="w-full border border-gray-200 p-3 text-sm bg-white focus:outline-none">
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                    </select>
                </div>
                <button className="bg-brand-brown text-white px-8 py-3 text-sm font-semibold w-fit mt-4 hover:bg-black transition">
                    Update Changes
                </button>
            </form>
        </div>
    )
}

export default PersonalInformation