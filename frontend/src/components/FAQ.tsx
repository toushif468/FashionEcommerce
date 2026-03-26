import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ: React.FC = () => {
    // State to track the currently open question ID
    const [openId, setOpenId] = useState<number | null>(null);

    // List of 5 predetermined questions and answers
    const faqData = [
        {
            id: 1,
            question: "How can I place an order?",
            answer: "To place an order, simply browse our collection, select your desired items, and click the 'Add to Cart' button. Follow the checkout process to enter your shipping details and payment information."
        },
        {
            id: 2,
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods, including credit/debit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are securely processed for your safety."
        },
        {
            id: 3,
            question: "Can I track my order after it's been placed?",
            answer: "Yes, once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number on our website or the carrier's site to monitor your package's progress."
        },
        {
            id: 4,
            question: "Do you offer customer support?",
            answer: "Absolutely! Our customer support team is available via email or live chat from Monday to Friday, 9 AM to 6 PM. We are here to help with any questions or concerns you may have."
        },
        {
            id: 5,
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for most items. If you are not completely satisfied with your purchase, you can return it in its original condition for a full refund or exchange."
        }
    ];

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="py-20 bg-gray-50 font-maison px-4">
            <div className="max-w-4xl mx-auto">
                {/* --- HEADER SECTION --- */}
                <div className="text-center mb-12">
                    <p className="text-gray-800 text-sm tracking-widest uppercase mb-2">FAQ</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Questions? Look here.</h2>
                </div>

                {/* --- FAQ LIST --- */}
                <div className="space-y-4">
                    {faqData.map((item) => {
                        const isOpen = openId === item.id;
                        
                        return (
                            <div 
                                key={item.id} 
                                className={`border border-gray-100 shadow-sm transition-all duration-300 ${
                                    isOpen ? 'bg-brand-brown text-white' : 'bg-white text-[#1a1a1a]'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFaq(item.id)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className="text-lg font-bold">{item.question}</span>
                                    <span className="ml-4">
                                        {isOpen ? <FaMinus size={14} className="text-brand-amber" /> : <FaPlus size={14} className="text-gray-400" />}
                                    </span>
                                </button>

                                {/* --- SLIDING ANSWER DIV --- */}
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pb-6 text-sm leading-relaxed text-gray-300">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;