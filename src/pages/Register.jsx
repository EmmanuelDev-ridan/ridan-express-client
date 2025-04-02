import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ridanLogo from '../assets/Images/banner/logo2.png';
import { useSelector, useDispatch } from 'react-redux';
import { customer_register, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
    const navigate = useNavigate();
    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();
        dispatch(customer_register(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (userInfo) {
            navigate('/');
        }
    }, [successMessage, errorMessage, userInfo]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 border right-0 py-3 px-6 bg-white z-10">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors">
                        <IoArrowBack className="text-2xl" />
                    </Link>
                    <img src={ridanLogo} className="h-10 w-auto" alt="Ridan Express Logo" />
                    <div className="w-6"></div> {/* Spacer for alignment */}
                </div>
            </header>

            {/* Loading Overlay */}
            {loader && (
                <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
                    <ClipLoader color="#f97316" size={40} />
                </div>
            )}

            {/* Main Content */}
            <main className="pt-10 px-4 sm:px-6 flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-xl overflow-hidden">
                    <div className="p-8">
                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h1 className="text-xl font-bold text-gray-800 mb-2">
                                <span className="text-orange-500">Sign up</span>
                            </h1>
                            <p className="text-gray-600 text-sm">Create your account to start shopping</p>
                            <p className="text-gray-600 text-sm">Shop like a billionair</p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={register} className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={state.name}
                                        onChange={inputHandle}
                                        className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        onChange={inputHandle}
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={state.password}
                                        onChange={inputHandle}
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 pr-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-orange-600 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-gray-900">
                                    Minimum 8 characters with letters and numbers
                                </p>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start mt-4">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">
                                    I agree to Ridan Express's{' '}
                                    <Link to="/terms" className="text-orange-600 hover:underline">Terms</Link> and{' '}
                                    <Link to="/privacy" className="text-orange-600 hover:underline">Privacy Policy</Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-6 py-3.5 px-4 bg-orange-500 hover:bg-orange-700 text-white font-medium rounded-full hover:shadow-orange-500/30 transition-all duration-300"
                            >
                                Create Account
                            </button>
                        </form>

                        {/* Social Login Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 bg-white text-sm text-gray-500">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FaFacebookF className="text-[#1877F2] mr-2" />
                                <span className="text-sm text-gray-800 font-medium">Facebook</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <FaGoogle className="text-[#DB4437] mr-2" />
                                <span className="text-sm text-gray-800 font-medium">Google</span>
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="mt-8 text-center text-sm text-gray-600">
                            <p>
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;