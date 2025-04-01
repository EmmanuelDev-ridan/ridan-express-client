import React, { useEffect, useState } from 'react'
import { GrMail } from 'react-icons/gr'
import ridanLogo from "../assets/Images/banner/logo.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { FaLinkedinIn, FaFacebookF, FaUser } from 'react-icons/fa'
import { AiOutlineTwitter, AiFillGithub } from 'react-icons/ai'
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoginIcon from '@mui/icons-material/Login';

const Headers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categorys } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { card_product_count, wishlist_count } = useSelector(state => state.card)

    const [showSidebar, setShowSidebar] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
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

    return (
        <div className='w-full bg-white shadow-md fixed w-[100%] top-0 z-50'>
            {/* Top Header */}
            <div className="bg-orange-600 py-2 hidden md:block">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center px-20 text-white text-sm">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                                <GrMail className="mr-1" />
                                Sell on Ridan
                            </span>
                            <span>|</span>
                            <span>Powered by Ridan</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded">
                                <SupportAgentIcon className="mr-2" />
                                Ridan Support
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white lg:bg-slate-100">
                <div className="container mx-auto py-1 px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-evenly md:space-y-0">
                        {/* Left Section */}
                        <div className="flex justify-between items-center p-2 sm:p-3 md:mb-2 md:mt-2">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <button
                                    className="md:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                    onClick={() => setShowSidebar(!showSidebar)}
                                    aria-label="Toggle sidebar"
                                >
                                    <MenuIcon className="w-6 h-6 stroke-2 text-gray-700" />
                                </button>
                                <Link to="/" className="flex items-center">
                                    <img
                                        src={ridanLogo}
                                        className="h-7 sm:h-8 md:h-[40px] transition-all duration-200"
                                        alt="Ridan Logo"
                                    />
                                </Link>
                            </div>

                            {/* Mobile Right Section */}
                            <div className="flex items-center block lg:hidden sm:gap-3">
                                {userInfo ? (
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <FaUser className="text-lg block md:hidden lg:hidden sm:text-xl text-gray-800" />
                                        <span className="sr-only block md:hidden lg:hidden text-gray-800 sm:not-sr-only sm:ml-1 sm:text-sm font-medium">
                                            Hi, {userInfo.name}
                                        </span>
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="flex items-center bg-gray-200 hover:bg-gray-300 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors"
                                    >
                                        <LoginIcon className="text-sm block lg:hidden sm:text-base mr-1 sm:mr-1.5" />
                                        <span className="text-sm block lg:hidden sm:text-base">Login</span>
                                    </Link>
                                )}
                                <button
                                    onClick={redirect_card_page}
                                    className="relative p-1.5 sm:p-2 block md:hidden lg:hidden hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Shopping cart"
                                >
                                    <ShoppingCartOutlinedIcon className="text-2xl  sm:text-2.5xl text-gray-600" />
                                    {card_product_count > 0 && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs transform -translate-y-1/2 translate-x-1/2 shadow-sm">
                                            {card_product_count}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 w-full max-w-2xl pb-2 lg:pb-0 mx-0 md:mx-2">
                            <div className="relative flex items-center mt-1 lg:mt-0">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 pr-[3rem] rounded-xl lg:rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                                    placeholder="Search Products, Brands & Categories"
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <button
                                    onClick={search}
                                    className="hidden lg:block absolute right-0 bg-orange-500 text-white lg:px-6 lg:py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
                                >
                                    <span>Search</span>
                                </button>
                                <button
                                    onClick={search}
                                    className="block lg:hidden absolute right-2 bg-none lg:bg-orange-500 text-white p-2 lg:px-6 lg:py-3 rounded-full lg:rounded-r-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
                                >
                                    <SearchIcon className="block lg:hidden w-6 h-6 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Desktop Right Section */}
                        <div className="flex items-center justify-end space-x-4">
                            {userInfo ? (
                                <Link
                                    to="/dashboard"
                                    className="hidden md:flex items-center bg-green-200 px-3 py-2 rounded-lg hover:bg-gray-300"
                                >
                                    <FaUser className="mr-2 text-green-800" />
                                    <span className='text-green-900'> 
                                        Hi, {userInfo.name}
                                    </span>
                                    <ExpandMoreSharpIcon className="ml-1 text-black" />
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center hidden lg:block bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300"
                                >
                                    <LoginIcon className="mr-2" />
                                    Login
                                </Link>
                            )}

                            <div className='flex justify-between item-center'>
                                <button
                                    onClick={redirect_card_page}
                                    className="relative flex items-center hidden md:inline"
                                >
                                    <ShoppingCartOutlinedIcon className="text-3xl text-gray-900" />
                                    {card_product_count > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white border border-slate-100 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                            {card_product_count}
                                        </span>
                                    )}
                                </button>
                                <span className="hidden md:inline text-sm pt-2 text-gray-900 ml-1">Cart</span>
                            </div>

                            <button className="hidden md:flex items-center border text-gray-900 border-orange-500 px-3 py-2 rounded-lg">
                                <HelpOutlineIcon className="mr-2 text-orange-500" />
                                Help
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                <div
                    onClick={() => setShowSidebar(false)}
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${showSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                ></div>
                <div
                    className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <div className="p-4">
                        <Link to="/" className="block mb-6">
                            <img
                                src={ridanLogo}
                                className="h-8"
                                alt="Ridan Logo"
                            />
                        </Link>

                        <div className="space-y-4">
                            <span className="font-bold text-lg">Popular Categories</span>
                            <ul className="space-y-2">
                                {categorys.map((c, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <img
                                            src={c.image}
                                            className="w-8 h-8 rounded-full"
                                            alt={c.name}
                                        />
                                        <Link
                                            to={`/products?category=${c.name}`}
                                            className="text-sm"
                                            onClick={() => setShowSidebar(false)}
                                        >
                                            {c.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 border-t">
                                {userInfo ? (
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                                        onClick={() => setShowSidebar(false)}
                                    >
                                        <FaUser />
                                        {userInfo.name}
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                                        onClick={() => setShowSidebar(false)}
                                    >
                                        <LoginIcon />
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Headers