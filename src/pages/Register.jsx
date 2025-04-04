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
import validator from 'validator';

const Register = () => {
    const navigate = useNavigate();
    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [validations, setValidations] = useState({
        min: false, upper: false, lower: false,
        number: false, special: false, match: false
    });

    const validate = (pass, confirm) => {
        const newValid = {
            min: pass.length >= 8,
            upper: /[A-Z]/.test(pass),
            lower: /[a-z]/.test(pass),
            number: /\d/.test(pass),
            special: /[\W_]/.test(pass),
            match: pass === confirm
        };
        setValidations(newValid);
        return Object.values(newValid).every(Boolean);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        const newForm = { ...form, [name]: value };

        // Validate using the updated form values
        if (name === 'password' || name === 'confirmPassword') {
            validate(newForm.password, newForm.confirmPassword);
        }

        setForm(newForm);
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validator.isEmail(form.email)) return toast.error('Please enter a valid email address');
        if (!validate(form.password, form.confirmPassword)) return toast.error('Please complete all password requirements');

        dispatch(customer_register({
            name: validator.escape(form.name.trim()),
            email: validator.normalizeEmail(form.email.trim()),
            password: form.password
        }));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate('/');
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage]);

    const CheckItem = ({ valid, text }) => (
        <div className={`flex items-center space-x-2 text-sm ${valid ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${valid ? 'bg-green-100' : 'bg-gray-100'}`}>
                <span className={`text-${valid ? 'green-500' : 'gray-300'} text-xs`}>
                    {valid ? '✓' : '•'}
                </span>
            </div>
            <span>{text}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-white lg:bg-gray-50">
            {/* Enhanced Header */}
            <div className='fixed top-0 left-0 bg-white lg:bg-none shadow-sm right-0 py-3 px-10 flex items-center justify-between'>
                <Link to="/" className="text-gray-700">
                    <IoArrowBack className="text-xl" />
                </Link>
                <img src={ridanLogo} className='h-8 w-fit' alt="logo" />
            </div>

            {/* Loading Overlay */}
            {loader && (
                <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-center">
                    <ClipLoader color="#f97316" size={40} />
                </div>
            )}

            {/* Main Content */}
            <main className="px- py-9">
                <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-none lg:shadow-lg border border-gray-100">
                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Join Ridan
                            <span className="block text-orange-500 text-2xl mt-1">Create Your Account</span>
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Start your premium shopping experience in minutes
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleInput}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 text-gray-800 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 transition-all hover:border-orange-300"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleInput}
                                placeholder="your@email.com"
                                className="w-full px-4 text-gray-800 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 transition-all hover:border-orange-300"
                                required
                            />
                        </div>

                        {/* Password Section */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleInput}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 text-gray-800 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 pr-12 transition-all hover:border-orange-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-3.5 text-gray-400 hover:text-orange-500 transition-colors"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Requirements Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <CheckItem valid={validations.min} text="8+ characters" />
                                <CheckItem valid={validations.upper} text="Uppercase letter" />
                                <CheckItem valid={validations.lower} text="Lowercase letter" />
                                <CheckItem valid={validations.number} text="Number" />
                                <CheckItem valid={validations.special} text="Special character" />
                                <CheckItem valid={validations.match} text="Passwords match" />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleInput}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 text-gray-800 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 transition-all hover:border-orange-300"
                                required
                            />
                        </div>

                        {/* Terms Agreement */}
                        <div className="flex items-start space-x-3 bg-orange-50 p-4 rounded-lg">
                            <input
                                type="checkbox"
                                required
                                className="mt-0.5 h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <label className="text-sm text-gray-600">
                                I agree to Ridan's{' '}
                                <Link to="/terms" className="text-orange-600 hover:underline font-medium">Terms</Link> and{' '}
                                <Link to="/privacy" className="text-orange-600 hover:underline font-medium">Privacy Policy</Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!Object.values(validations).every(Boolean)}
                            className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-orange-200 disabled:opacity-50 disabled:transform-none"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Social Login Section */}
                    <div className="mt-8">
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

                        <div className="flex gap-4 justify-center">
                            <button className="p-3 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-colors flex items-center space-x-2">
                                <FaFacebookF className="text-[#1877F2] text-lg" />
                                <span className="text-sm font-medium text-gray-700">Facebook</span>
                            </button>
                            <button className="p-3 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-colors flex items-center space-x-2">
                                <FaGoogle className="text-[#DB4437] text-lg" />
                                <span className="text-sm font-medium text-gray-700">Google</span>
                            </button>
                        </div>
                    </div>

                    {/* Existing Account Prompt */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        Already part of Ridan?{' '}
                        <Link to="/login" className="text-orange-600 font-base hover:underline">
                            Sign in now
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;