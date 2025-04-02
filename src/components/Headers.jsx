import React, { useEffect, useState } from 'react'
import { GrMail } from 'react-icons/gr'
import ridanLogo from "../assets/Images/banner/logo.png"
import ridanLogo2 from "../assets/Images/banner/logo2.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { FaLinkedinIn, FaFacebookF, FaUser, FaShoppingCart } from 'react-icons/fa'
import { AiOutlineTwitter, AiFillGithub, AiOutlineSearch } from 'react-icons/ai'
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';

const Headers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categorys } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { card_product_count, wishlist_count } = useSelector(state => state.card)

    const [showSidebar, setShowSidebar] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')
    const [isScrolled, setIsScrolled] = useState(false)

    const search = () => {
        if (searchValue.trim()) {
            navigate(`/products/search?category=${category}&&value=${searchValue}`)
            setSearchValue('')
        }
    }

    const redirect_card_page = () => {
        userInfo ? navigate(`/card`) : navigate(`/login`)
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id))
        }
    }, [userInfo])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`w-full bg-white ${isScrolled ? 'shadow-lg' : 'shadow-sm'} fixed top-0 z-50 transition-shadow duration-300`}>
            {/* Top Announcement Bar */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-2 hidden md:block">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between px-20 items-center text-white text-sm">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center hover:text-orange-100 transition-colors">
                                <GrMail className="mr-2" size={14} />
                                Sell on Ridan
                            </span>
                            <span className="text-orange-200">|</span>
                            <span className="hover:text-orange-100 transition-colors">Powered by Ridan</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full hover:bg-opacity-30 transition-all">
                                <SupportAgentIcon className="mr-2" fontSize="small" />
                                <span>Ridan Support</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between lg:justify-evenly py-3">
                        {/* Logo and Mobile Menu */}
                        <div className="flex items-center ">
                            <button
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                onClick={() => setShowSidebar(!showSidebar)}
                                aria-label="Toggle menu"
                            >
                                {showSidebar ? (
                                    <CloseIcon className="text-gray-700" />
                                ) : (
                                    <MenuIcon className="text-gray-700" />
                                )}
                            </button>
                            
                            <Link to="/" className="flex items-center">
                                {/* <img
                                    src={ridanLogo}
                                    className="h-8"
                                    alt="Ridan Logo"
                                    loading="lazy"
                                /> */}
                                <img
                                    src={ridanLogo2}
                                    className="h-8 lg:h-10 mt-2 lg:mt-0 transition-all duration-200 hover:opacity-90"
                                    alt="Ridan Logo"
                                    loading="lazy"
                                />
                            </Link>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex flex-1 max-w-2xl mx-6">
                            <div className="relative w-full group">
                                <input
                                    type="text"
                                    value={searchValue}
                                    className="w-full px-5 py-2.5 pr-16 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 shadow-sm hover:shadow-md"
                                    placeholder="Search products, brands & categories..."
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && search()}
                                />
                                <button
                                    onClick={search}
                                    className="absolute right-0 top-0 h-full px-5 bg-orange-500 text-white rounded-r-full font-medium hover:bg-orange-600 transition-all duration-200 flex items-center"
                                >
                                    <AiOutlineSearch className="mr-2" />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>

                        {/* Navigation Icons */}
                        <div className="flex items-center space-x-4">
                            {/* User Account */}
                            {userInfo ? (
                                <div className="hidden md:flex items-center group relative">
                                    <button className="flex items-center space-x-1 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                            <FaUser size={14} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">Hi, {userInfo.name.split(' ')[0]}</span>
                                        <ExpandMoreSharpIcon className="text-gray-500" fontSize="small" />
                                    </button>
                                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block z-50">
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                        <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</Link>
                                        <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</Link>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="hidden md:flex items-center space-x-1 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                        <FaUser size={14} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Login</span>
                                </Link>
                            )}

                            {/* Cart */}
                            <button
                                onClick={redirect_card_page}
                                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCartOutlinedIcon className="text-gray-700" />
                                {card_product_count > 0 && (
                                    <span className="absolute border-2 border-white bottom-5 left-6 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                                        {card_product_count}
                                    </span>
                                )}
                            </button>

                            {/* Help - Desktop */}
                            <button className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors">
                                <HelpOutlineIcon className="text-gray-700" fontSize="small" />
                                <span className="text-sm font-medium text-gray-700">Help</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar - Shows only on mobile */}
                    <div className="md:hidden mb-3">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchValue}
                                className="w-full px-4 py-2.5 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-700 shadow-sm"
                                placeholder="Search products..."
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && search()}
                            />
                            <button
                                onClick={search}
                                className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-orange-500 transition-colors"
                            >
                                <AiOutlineSearch size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div className="md:hidden">
                {/* Overlay */}
                <div
                    onClick={() => setShowSidebar(false)}
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${showSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                ></div>
                
                {/* Sidebar Content */}
                <div
                    className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} shadow-xl`}
                >
                    <div className="h-full flex flex-col">
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <Link to="/" onClick={() => setShowSidebar(false)}>
                                <img src={ridanLogo} className="h-8" alt="Ridan Logo" />
                            </Link>
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* User Section */}
                        <div className="p-4 border-b">
                            {userInfo ? (
                                <Link
                                    to="/dashboard"
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                                    onClick={() => setShowSidebar(false)}
                                >
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <FaUser size={16} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{userInfo.name}</div>
                                        <div className="text-xs text-gray-500">View your account</div>
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                                    onClick={() => setShowSidebar(false)}
                                >
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                        <FaUser size={16} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Login / Register</div>
                                        <div className="text-xs text-gray-500">Access account features</div>
                                    </div>
                                </Link>
                            )}
                        </div>

                        {/* Categories Section */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <h3 className="font-bold text-lg mb-3 text-gray-800">Shop Categories</h3>
                            <ul className="space-y-2">
                                {categorys.map((c, i) => (
                                    <li key={i}>
                                        <Link
                                            to={`/products?category=${c.name}`}
                                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => setShowSidebar(false)}
                                        >
                                            <img
                                                src={c.image}
                                                className="w-8 h-8 rounded-full object-cover"
                                                alt={c.name}
                                                loading="lazy"
                                            />
                                            <span className="text-gray-700">{c.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Footer Links */}
                        <div className="p-4 border-t">
                            <div className="grid grid-cols-2 gap-2">
                                <Link to="/help" className="p-2 text-sm text-gray-600 hover:text-orange-500">Help Center</Link>
                                <Link to="/about" className="p-2 text-sm text-gray-600 hover:text-orange-500">About Us</Link>
                                <Link to="/contact" className="p-2 text-sm text-gray-600 hover:text-orange-500">Contact</Link>
                                <Link to="/terms" className="p-2 text-sm text-gray-600 hover:text-orange-500">Terms</Link>
                            </div>
                            <div className="flex justify-center space-x-4 mt-4">
                                <a href="#" className="p-2 text-gray-500 hover:text-orange-500"><FaFacebookF /></a>
                                <a href="#" className="p-2 text-gray-500 hover:text-orange-500"><AiOutlineTwitter /></a>
                                <a href="#" className="p-2 text-gray-500 hover:text-orange-500"><FaLinkedinIn /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Headers