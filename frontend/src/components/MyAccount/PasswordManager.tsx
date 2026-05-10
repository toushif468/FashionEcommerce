import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { toast } from "react-toastify"; 

interface PasswordManagerFormDataTypes {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const PasswordManager = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false)

    const [formData, setFormData] = useState<PasswordManagerFormDataTypes>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("New passwords do not match!");
        }

        console.log("Sending to backend:", formData);
        // Here is where you would call your axios.post(`${backendUrl}/api/user/update-password`, formData, {headers})
    }

    return (
        <div className="w-full">
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 max-w-2xl">

                {/* Password Field */}
                <div className="flex flex-col gap-2 relative">
                    <label className="text-base font-semibold">Current Password *</label>
                    <div className="relative">
                        <input
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={onChangeHandler}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Current Password"
                            className="w-full border border-gray-200 p-3 pr-12 text-sm focus:outline-none focus:border-brand transition"
                            required
                        />
                        <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-brown hover:text-gray-600 cursor-pointer" aria-label="Toggle password visibility">
                            {showPassword ? <RiEyeCloseLine size={20} /> : <RiEyeLine size={20} />}
                        </button>
                    </div>
                </div>

                {/* New Password Field */}
                <div className="flex flex-col gap-2 relative">
                    <label className="text-base font-semibold">New Password *</label>
                    <div className="relative">
                        <input
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={onChangeHandler}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter New Password"
                            className="w-full border border-gray-200 p-3 pr-12 text-sm focus:outline-none focus:border-brand transition"
                            required
                        />
                        <button onClick={() => setShowNewPassword(!showNewPassword)} type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-brown hover:text-gray-600 cursor-pointer">
                            {showNewPassword ? <RiEyeCloseLine size={20} /> : <RiEyeLine size={20} />}
                        </button>
                    </div>
                </div>

                {/* Confirmed Password Field */}
                <div className="flex flex-col gap-2 relative">
                    <label className="text-base font-semibold">Confirm New Password *</label>
                    <div className="relative">
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={onChangeHandler}
                            type={showConfirmedPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            className="w-full border border-gray-200 p-3 pr-12 text-sm focus:outline-none focus:border-brand transition"
                            required
                        />
                        <button onClick={() => setShowConfirmedPassword(!showConfirmedPassword)} type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-brown hover:text-gray-600 cursor-pointer">
                            {showConfirmedPassword ? <RiEyeCloseLine size={20} /> : <RiEyeLine size={20} />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="bg-brand-brown text-white px-8 py-3 text-sm font-semibold w-fit mt-2 hover:bg-black transition-all">
                    Update Password
                </button>

            </form>
        </div>
    )
}

export default PasswordManager;