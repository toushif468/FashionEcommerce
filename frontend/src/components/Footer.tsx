import React from 'react';
import { assets } from '../assets/assets';
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiBlogger } from "react-icons/si";
import { RiArrowDropDownLine } from "react-icons/ri";

const Footer: React.FC = () => {
  const maisonFont = { fontFamily: "'Maison Neue', sans-serif" };

  return (
    <footer className="w-full bg-[#3f1700] text-white pt-16 pb-6 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]" style={maisonFont}>
      {/* Changed to grid-cols-2 for mobile and grid-cols-5 for desktop/tablet */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 items-start">

        {/* --- COLUMN 1: LOGO & INFO --- */}
        {/* Removed col-span-2 to ensure it fits side-by-side with the other 4 columns */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <img className='w-32 h-auto object-contain' src={assets.logo} alt="Logo" />
          </div>
          <p className="text-gray-300 text-xs leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {[FaFacebookF, SiBlogger, FaYoutube, FaTwitter, FaInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-[#522900] hover:bg-[#fedb9b] hover:text-[#3f1700] rounded-full w-8 h-8 flex items-center justify-center transition-all text-gray-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* --- COLUMN 2: COMPANY --- */}
        <div>
          <h5 className="text-base font-bold mb-6 tracking-wide">Company</h5>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-all">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-all">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-all">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-all">Career</a></li>
          </ul>
        </div>

        {/* --- COLUMN 3: CUSTOMER SERVICES --- */}
        <div>
          <h5 className="text-base font-bold mb-6 tracking-wide">Customer Services</h5>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-all">My Account</a></li>
            <li><a href="#" className="hover:text-white transition-all">Track Your Order</a></li>
            <li><a href="#" className="hover:text-white transition-all">Return</a></li>
            <li><a href="#" className="hover:text-white transition-all">FAQ</a></li>
          </ul>
        </div>

        {/* --- COLUMN 4: OUR INFORMATION --- */}
        <div>
          <h5 className="text-base font-bold mb-6 tracking-wide">Our Information</h5>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-all">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-all">User Terms & Condition</a></li>
            <li><a href="#" className="hover:text-white transition-all">Return Policy</a></li>
          </ul>
        </div>

        {/* --- COLUMN 5: CONTACT INFO --- */}
        <div>
          <h5 className="text-base font-bold mb-6 tracking-wide">Contact Info</h5>
          <ul className="space-y-4 text-xs text-gray-400">
            <li>01301729107</li>
            <li className="break-all">thasan202081@bscse.uiu.ac.bd</li>
            <li>283, elephantroad, Dhaka 1205.</li>
          </ul>
        </div>
      </div>

      {/* --- BOTTOM SECTION --- */}
      <div className="border-t border-white pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-400">
        <p>Copyright © 2024 Clothing Website Design. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center cursor-pointer hover:text-white">
            English <RiArrowDropDownLine size={24} />
          </div>
          <span className="text-gray-700">|</span>
          <div className="flex items-center cursor-pointer hover:text-white">
            USD <RiArrowDropDownLine size={24} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;