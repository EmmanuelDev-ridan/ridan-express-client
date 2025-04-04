import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Headers from '../components/Headers';
import toast from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_card_products, delete_card_product, messageClear, quantity_inc, quantity_dec } from '../store/reducers/cardReducer';
import Footer from '../components/Footer';

const Card = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { card_products, successMessage, price, buy_product_item, shipping_fee, outofstock_products } = useSelector((state) => state.card);

    const totalDiscount = card_products.reduce((acc, shop) => {
        return acc + shop.products.reduce((shopAcc, product) => {
            const productPrice = product.productInfo.price;
            const discountPercentage = product.productInfo.discount || 0;
            const quantity = product.quantity;
            return shopAcc + (productPrice * (discountPercentage / 100) * quantity);
        }, 0);
    }, 0);

    const redirect = () => {
        navigate('/shipping', {
            state: {
                products: card_products,
                price,
                shipping_fee,
                items: buy_product_item,
            },
        });
    };

    useEffect(() => {
        if (userInfo?.id) {
            dispatch(get_card_products(userInfo.id));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            if (userInfo?.id) {
                dispatch(get_card_products(userInfo.id));
            }
        }
    }, [successMessage, dispatch, userInfo]);

    const inc = (quantity, stock = 0, card_id) => {
        const newQuantity = quantity + 1;
        if (newQuantity <= stock) {
            dispatch(quantity_inc(card_id));
        }
    };

    const dec = (quantity, card_id) => {
        const newQuantity = quantity - 1;
        if (newQuantity > 0) {
            dispatch(quantity_dec(card_id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className='lg:hidden fixed top-0 left-0 right-0 bg-white z-50 shadow-sm py-4 px-4 flex items-center justify-between'>
                <Link to="/" className="text-gray-700">
                    <IoArrowBack className="text-xl" />
                </Link>
                <h2 className="text-lg font-semibold text-gray-800">
                    My Cart ({buy_product_item})
                </h2>
                <div className="w-6"></div>
            </div>

            <main className="pt-16 lg:pt-0 pb-20 lg:pb-0">
                {/* Desktop View (Original) */}
                <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Link to="/" className="text-orange-600 hover:text-orange-700">Home</Link>
                            <span className="mx-2">/</span>
                            <span>Shopping Cart</span>
                        </div>
                    </div>

                    {card_products.length > 0 || outofstock_products.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items Section */}
                            <div className="flex-1">
                                {/* Cart Header */}
                                <div className="hidden lg:flex bg-white p-4 rounded-t-lg border border-gray-200">
                                    <div className="w-1/2 font-medium text-gray-500">Product</div>
                                    <div className="w-1/4 font-medium text-gray-500 text-center">Quantity</div>
                                    <div className="w-1/4 font-medium text-gray-500 text-right">Subtotal</div>
                                </div>

                                {/* Cart Items */}
                                <div className="space-y-6">
                                    {card_products.map((p, i) => (
                                        <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                                <h3 className="text-lg font-semibold text-gray-800">{p.shopName}</h3>
                                            </div>

                                            {p.products.map((pt, index) => (
                                                <div key={index} className="flex flex-col lg:flex-row lg:items-center gap-6 py-5 border-t border-gray-100 first:border-0">
                                                    {/* Product Info */}
                                                    <div className="flex items-center gap-6 w-full lg:w-1/2">
                                                        <div className="w-24 h-24 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                                            <img
                                                                src={pt?.productInfo?.images?.[0] || "/placeholder-product.jpg"}
                                                                alt="product"
                                                                className="w-full h-full object-contain p-2"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-medium text-gray-900 mb-1">
                                                                {pt?.productInfo?.name || 'Unknown Product'}
                                                            </h4>
                                                            <p className="text-sm text-gray-500 mb-2">
                                                                Brand: {pt?.productInfo?.brand || 'Unknown'}
                                                            </p>
                                                            <button
                                                                onClick={() => dispatch(delete_card_product(pt._id))}
                                                                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                                                            >
                                                                <RiDeleteBin6Line className="text-base text-red-400" />
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="w-full lg:w-1/4 flex justify-center">
                                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                                            <button
                                                                onClick={() => dec(pt.quantity, pt._id)}
                                                                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
                                                            >
                                                                <FiMinus />
                                                            </button>
                                                            <span className="w-12 text-center font-medium text-gray-800">
                                                                {pt.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => inc(pt.quantity, pt?.productInfo?.stock || 0, pt._id)}
                                                                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
                                                            >
                                                                <FiPlus />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="w-full lg:w-1/4 flex flex-col items-end">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-lg font-semibold text-gray-900">
                                                                ₦{(pt?.productInfo?.price - Math.floor((pt?.productInfo?.price * pt?.productInfo?.discount) / 100)).toLocaleString()}
                                                            </p>
                                                            {pt?.productInfo?.discount > 0 && (
                                                                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                                                    {pt?.productInfo?.discount}% OFF
                                                                </span>
                                                            )}
                                                        </div>
                                                        {pt?.productInfo?.discount > 0 && (
                                                            <p className="text-sm text-gray-400 line-through">
                                                                ₦{pt?.productInfo?.price?.toLocaleString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                    {/* Out of Stock Section */}
                                    {outofstock_products.length > 0 && (
                                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                                <h3 className="text-lg font-semibold text-gray-800">Out of Stock ({outofstock_products.length})</h3>
                                            </div>

                                            <div className="space-y-4">
                                                {outofstock_products.map((p, i) => (
                                                    <div key={i} className="flex items-center justify-between py-3 border-t border-gray-100 first:border-0">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-white rounded border border-gray-200 overflow-hidden flex items-center justify-center">
                                                                <img
                                                                    src={p?.products?.[0]?.images?.[0] || "/placeholder-product.jpg"}
                                                                    alt="product"
                                                                    className="w-full h-full object-contain p-1"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-base font-medium text-gray-700">
                                                                    {p?.products?.[0]?.name || 'Unknown Product'}
                                                                </h4>
                                                                <p className="text-sm text-gray-500">
                                                                    Brand: {p?.products?.[0]?.brand || 'Unknown'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-base font-semibold text-gray-800">
                                                                ₦{(p?.products?.[0]?.price - Math.floor((p?.products?.[0]?.price * p?.products?.[0]?.discount) / 100)).toLocaleString()}
                                                            </p>
                                                            <p className="text-sm text-gray-400 line-through">
                                                                ₦{p?.products?.[0]?.price?.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Summary Section */}
                            <div className="lg:w-96">
                                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Subtotal ({buy_product_item} items)</span>
                                            <span className="font-medium text-gray-900">₦{price?.toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Total discount</span>
                                            <span className="font-medium text-green-600">
                                                -₦{Math.round(totalDiscount).toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                                            <span className="text-gray-600">Shipping Fee</span>
                                            <span className="font-medium text-gray-900">₦{shipping_fee?.toLocaleString()}</span>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-gray-800 text-lg">Total</span>
                                                <span className="font-bold text-lg text-gray-900">
                                                    ₦{(price + shipping_fee - totalDiscount)?.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                                        </div>

                                        <button
                                            onClick={redirect}
                                            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg mt-6 flex items-center justify-center gap-2"
                                        >
                                            Proceed to Checkout
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-900 mb-3">We Accept</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200"></div>
                                            <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200"></div>
                                            <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200"></div>
                                            <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Need Help?</h3>
                                    <p className="text-sm text-gray-600 mb-4">Our customer service team is available 24/7 to assist you with any questions.</p>
                                    <button className="w-full py-2 border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition-colors">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto bg-white p-12 rounded-xl shadow-sm text-center">
                            <div className="mb-8 flex justify-center">
                                <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center">
                                    <svg className="h-16 w-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
                            <p className="text-lg text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
                            <Link
                                to="/"
                                className="inline-block px-10 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile View (New) */}
                <div className="lg:hidden px-4 sm:px-6">
                    {card_products.length > 0 || outofstock_products.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {/* Cart Items Section */}
                            <div className="flex-1">
                                {card_products.map((p, i) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <h3 className="text-base font-semibold text-gray-800">{p.shopName}</h3>
                                        </div>
                                        
                                        {p.products.map((pt, index) => (
                                            <div key={index} className="flex gap-3 py-3 border-t border-gray-100 first:border-0">
                                                <div className="w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                                                    <img
                                                        src={pt?.productInfo?.images?.[0] || "/placeholder-product.jpg"}
                                                        alt="product"
                                                        className="w-full h-full object-contain p-1"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                                                            {pt?.productInfo?.name || 'Unknown Product'}
                                                        </h4>
                                                        <button
                                                            onClick={() => dispatch(delete_card_product(pt._id))}
                                                            className="text-gray-400 hover:text-red-500 ml-2"
                                                        >
                                                            <RiDeleteBin6Line className="text-lg text-red-400" />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        Brand: {pt?.productInfo?.brand || 'Unknown'}
                                                    </p>
                                                    
                                                    <div className="flex items-center justify-between mt-1">
                                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                                            <button
                                                                onClick={() => dec(pt.quantity, pt._id)}
                                                                className="px-2 py-1 bg-gray-50 text-gray-600"
                                                            >
                                                                <FiMinus className="text-sm" />
                                                            </button>
                                                            <span className="w-8 text-center font-medium text-gray-800 text-sm">
                                                                {pt.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => inc(pt.quantity, pt?.productInfo?.stock || 0, pt._id)}
                                                                className="px-2 py-1 bg-gray-50 text-gray-600"
                                                            >
                                                                <FiPlus className="text-sm" />
                                                            </button>
                                                        </div>
                                                        
                                                        <div className="text-right">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <p className="text-sm font-semibold text-gray-900">
                                                                    ₦{(pt?.productInfo?.price - Math.floor((pt?.productInfo?.price * pt?.productInfo?.discount) / 100)).toLocaleString()}
                                                                </p>
                                                                
                                                            </div>
                                                            {pt?.productInfo?.discount > 0 && (
                                                                <p className="text-xs text-gray-400 line-through">
                                                                    ₦{pt?.productInfo?.price?.toLocaleString()}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                {/* Out of Stock Section */}
                                {outofstock_products.length > 0 && (
                                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <h3 className="text-base font-semibold text-red-600">
                                                Out of Stock ({outofstock_products.length})
                                            </h3>
                                        </div>
                                        {outofstock_products.map((p, i) => (
                                            <div key={i} className="flex items-center gap-3 py-3 border-t border-red-100 first:border-0">
                                                <div className="w-16 h-16 bg-white rounded border border-gray-200 overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={p?.products?.[0]?.images?.[0] || "/placeholder-product.jpg"}
                                                        alt="product"
                                                        className="w-full h-full object-contain p-1"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-700 line-clamp-1">
                                                        {p?.products?.[0]?.name || 'Unknown Product'}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">
                                                        Brand: {p?.products?.[0]?.brand || 'Unknown'}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        ₦{(p?.products?.[0]?.price - Math.floor((p?.products?.[0]?.price * p?.products?.[0]?.discount) / 100)).toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-gray-400 line-through">
                                                        ₦{p?.products?.[0]?.price?.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Order Summary Section - Mobile */}
                            <div className="bg-white p-4 rounded-lg sticky bottom-5 shadow-sm border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Subtotal ({buy_product_item} items)</span>
                                        <span className="text-sm font-medium text-gray-900">₦{price?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total discount</span>
                                        <span className="text-sm font-medium text-green-600">
                                            -₦{Math.round(totalDiscount).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                                        <span className="text-sm text-gray-600">Shipping Fee</span>
                                        <span className="text-sm font-medium text-gray-900">₦{shipping_fee?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="text-base font-bold text-gray-900">Total</span>
                                        <span className="text-base font-bold text-gray-900">
                                            ₦{(price + shipping_fee - totalDiscount)?.toLocaleString()}
                                        </span>
                                    </div>
                                    <button
                                        onClick={redirect}
                                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow mt-4"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm text-center mt-8">
                            <div className="mb-6 flex justify-center">
                                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
                                    <svg className="h-12 w-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                            <p className="text-gray-600 mb-6">Browse our catalog and find something special!</p>
                            <Link
                                to="/"
                                className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            

            <div className='hidden lg:block'>
                <Footer />
            </div>
        </div>
    );
};

export default Card;