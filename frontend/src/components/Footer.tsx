import { assets } from '../assets/assets';
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiBlogger } from "react-icons/si";
import { RiArrowDropDownLine } from "react-icons/ri";

const Footer = () => {

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Career", href: "#" },
      ],
    },
    {
      title: "Customer Services",
      links: [
        { name: "My Account", href: "#" },
        { name: "Track Your Order", href: "#" },
        { name: "Return", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      title: "Our Information",
      links: [
        { name: "Privacy", href: "#" },
        { name: "User Terms & Condition", href: "#" },
        { name: "Return Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-brand-brown text-white pt-16 pb-6 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Changed to grid-cols-2 for mobile and grid-cols-5 for desktop/tablet */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 items-start">

        {/* --- COLUMN 1: LOGO & INFO --- */}
        {/* Removed col-span-2 to ensure it fits side-by-side with the other 4 columns */}
        <div className="flex flex-col col-span-2 sm:col-span-3  md:col-span-4 lg:col-span-1">
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
                className="bg-[#522900] hover:bg-brand-amber hover:text-brand-brown rounded-full w-8 h-8 flex items-center justify-center transition-all text-gray-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {
          footerLinks.map((item) => (
            <div key={item.title}>
              <h5 className="text-base font-bold mb-6 tracking-wide">{item.title}</h5>
              <ul className="space-y-3 text-sm text-muted">
                {
                  item.links.map((link) => (
                    <li key={link.name} >
                      <a href={link.href} className="hover:text-white transition-all">{link.name}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }

        {/* --- COLUMN 5: CONTACT INFO --- */}
        <div>
          <h5 className="text-base font-bold mb-6 tracking-wide">Contact Info</h5>
          <ul className="space-y-4 text-xs text-muted">
            <li>01301729107</li>
            <li className="break-all">thasan202081@bscse.uiu.ac.bd</li>
            <li>283, elephantroad, Dhaka 1205.</li>
          </ul>
        </div>
      </div>

      {/* --- BOTTOM SECTION --- */}
      <div className="border-t border-white pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-muted">
        <p>Copyright © 2024 Clothing Website Design. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center cursor-pointer hover:text-white">
            English <RiArrowDropDownLine size={24} />
          </div>
          <span className="text-muted">|</span>
          <div className="flex items-center cursor-pointer hover:text-white">
            USD <RiArrowDropDownLine size={24} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;