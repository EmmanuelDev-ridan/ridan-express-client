import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaLinkedin } from 'react-icons/fa'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {


    return (
        <footer className='bg-[#f8f9fa] border-t border-gray-100'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
                {/* Company Info */}
                <div className='space-y-4'>
                    <img 
                        className='w-40 h-auto mb-4' 
                        src="/images/logo.png" 
                        alt="Company Logo" 
                    />
                    <div className='space-y-2 text-gray-600'>
                        <p className='flex items-center gap-2'>
                            <svg className='w-5 h-5 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Rangpur, Kuigram
                        </p>
                        <p className='flex items-center gap-2'>
                            <svg className='w-5 h-5 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +880 5873-458345
                        </p>
                        <p className='flex items-center gap-2'>
                            <svg className='w-5 h-5 text-green-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            farid@gmail.com
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className='grid grid-cols-2 gap-8'>
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>Useful Links</h3>
                        <ul className='space-y-2 text-gray-600'>
                            {['About Us', 'Our Shop', 'Delivery Info', 'Privacy Policy', 'Blogs'].map((link) => (
                                <li key={link}>
                                    <Link 
                                        to="#" 
                                        className='hover:text-green-600 transition-colors duration-200'
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>Customer Service</h3>
                        <ul className='space-y-2 text-gray-600'>
                            {['Contact Us', 'Payment Methods', 'Returns', 'Shipping', 'FAQ'].map((link) => (
                                <li key={link}>
                                    <Link 
                                        to="#" 
                                        className='hover:text-green-600 transition-colors duration-200'
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter & Social */}
                <div className='space-y-6'>
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900'>Join Our Newsletter</h3>
                        <p className='text-gray-600'>Get updates about our latest products and special offers</p>
                        <div className='flex gap-2'>
                            <input 
                                type="email" 
                                placeholder='Enter your email'
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                            />
                            <button className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 whitespace-nowrap'>
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900'>Follow Us</h3>
                        <div className='flex gap-4'>
                            {[
                                { icon: <FaFacebookF />, label: 'Facebook' },
                                { icon: <AiOutlineTwitter />, label: 'Twitter' },
                                { icon: <FaLinkedin />, label: 'LinkedIn' },
                                { icon: <AiFillGithub />, label: 'GitHub' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className='p-2 bg-gray-100 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-200'
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className='border-t border-gray-100 mt-8'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600'>
                    <p>
                        © {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </p>
                    <p className='mt-2 md:mt-0'>
                        Made by <a 
                            href="#" 
                            className='text-green-600 hover:text-green-700 font-medium'
                        >
                            Learn with Project
                        </a>
                    </p>
                </div>
            </div>

        </footer>
    )
}

export default Footer