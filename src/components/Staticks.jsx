import React from 'react';
import { FiEdit, FiUsers, FiFileText, FiGlobe } from 'react-icons/fi';

const Staticks = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-4xl text-center font-bold text-[#10B981] mb-5">
                        Samusa Blog by the Numbers
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Explore insights into our community of readers, writers, and content shared on Samusa Blog. We're proud to support passionate voices around the world.
                    </p>
                </div>
                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full bg-white">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <FiEdit className="text-[#10B981] w-12 h-12 mb-3 mx-auto" />
                            <h2 className="title-font font-medium text-3xl text-gray-900">3.4K</h2>
                            <p className="leading-relaxed">Blog Posts</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full bg-white">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <FiUsers className="text-[#10B981] w-12 h-12 mb-3 mx-auto" />
                            <h2 className="title-font font-medium text-3xl text-gray-900">1.9K</h2>
                            <p className="leading-relaxed">Active Users</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full bg-white">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <FiFileText className="text-[#10B981] w-12 h-12 mb-3 mx-auto" />
                            <h2 className="title-font font-medium text-3xl text-gray-900">220</h2>
                            <p className="leading-relaxed">Published Authors</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full bg-white">
                        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                            <FiGlobe className="text-[#10B981] w-12 h-12 mb-3 mx-auto" />
                            <h2 className="title-font font-medium text-3xl text-gray-900">37</h2>
                            <p className="leading-relaxed">Countries Reached</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Staticks;
