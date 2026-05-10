// import { ShopContext } from "@/context/ShopContext";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

const Logout = () => {

    // const { setToken} = useContext(ShopContext);
    // const navigate = useNavigate();
    const handleLogout = () => {

    }
    return (
        <div className="w-full flex flex-col gap-4 ">
            <h2 className="text-2xl font-semibold text-gray-800">Logout</h2>

            <p className="text-gray-500 text-sm">
                Are you sure you want to log out?
            </p>

            <button
                onClick={handleLogout}
                className="bg-brand-brown text-white px-8 py-3 text-sm font-bold w-fit mt-2 hover:bg-black transition-all cursor-pointer"
            >
                Yes, Logout
            </button>
        </div>
    );
}

export default Logout