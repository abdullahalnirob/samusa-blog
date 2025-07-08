import React, { useState } from 'react';

const Faq = () => {
    const [isOpen, setIsOpen] = useState(null);

    const dataArr = [
        {
            title: 'How do I create an account?',
            description:
                'To create an account, click on the "Sign Up" button and fill out the required information. Once done, you can enjoy the benefits of being a registered member.'
        },
        {
            title: 'What is your return policy?',
            description:
                'Our return policy allows you to return items within 30 days of purchase. Please visit our returns page for detailed instructions and to initiate a return.'
        },
        {
            title: 'What can I do on the blog website?',
            description:
                'On our blog website, you can read articles, leave comments, bookmark your favorite posts, and even contribute your own blogs if you are a registered author. Stay informed and inspired!'
        },
        {
            title: 'How can I become a registered author on the blog?',
            description:
                'To become a registered author, please contact our support team or visit the "Write for Us" section on the blog. We welcome contributions from passionate writers!'
        },
        {
            title: 'Can I subscribe to blog updates?',
            description:
                'Yes, you can subscribe to our blog updates by entering your email address in the newsletter signup form located in the blog sidebar. You\'ll receive notifications about new posts and exclusive content.'
        }
    ];

    const toggle = (idx) => {
        setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
    };

    return (
        <div className="w-full px-6 md:px-12 py-10">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-10 text-4xl text-center font-bold text-[#10B981]">Frequently Asked Questions</h2>
                {dataArr.map((item, idx) => (
                    <div
                        key={idx}
                        className="border-b border-gray-300/60 py-5 last-of-type:border-b-0"
                    >
                        <button
                            onClick={() => toggle(idx)}
                            className="flex w-full items-center justify-between text-left font-medium text-black dark:text-white"
                        >
                            <span className="text-lg cursor-pointer text-gray-800">{item.title}</span>
                            <span className="ml-4 text-[#10B981]">
                                <svg
                                    className={`transition-transform duration-200 ${isOpen === idx ? 'rotate-45' : ''
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19 13H5v-2h14v2z" />
                                    <path d="M12 5v14" />
                                </svg>
                            </span>
                        </button>
                        <div
                            className={`grid overflow-hidden text-gray-600 transition-all duration-300 ease-in-out ${isOpen === idx ? 'grid-rows-[1fr] pt-3 opacity-100' : 'grid-rows-[0fr] opacity-0'
                                }`}
                        >
                            <div className="overflow-hidden text-sm md:text-base">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;