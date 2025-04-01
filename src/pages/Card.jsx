import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Headers from '../components/Headers';
import toast from 'react-hot-toast';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_card_products, delete_card_product, messageClear, quantity_inc, quantity_dec } from '../store/reducers/cardReducer';
import BottomNav from '../components/BottomNav';
import Footer from '../components/Footer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Card = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { card_products, successMessage, price, buy_product_item, shipping_fee, outofstock_products } = useSelector((state) => state.card);

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

    // Safeguarding stock value
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

    // http://localhost:3000/product/details/Samsung-U32r590-32-4k

    return (
        <div className="min-h-screen bg-gray-50">
            <div className='hidden lg:block'>
                <Headers />
            </div>
            <section className="mt-0 lg:mt-[8rem]">
                <div className="max-w-7xl mx-auto py-7">
                    {card_products.length > 0 || outofstock_products.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Cart Items Section */}
                            <div className="flex-1">
                                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                                    <div className='flex block lg:hidden justify-between mb-5 fixed h-14 px-5 -top-1 left-0 mb-3 bg-white shadow w-[100%] items-center'>
                                        <Link to="/">
                                            <ArrowBackIosIcon className='text-orange-500' />
                                        </Link>
                                        <h2 className="text-lg font-base lg:font-semibold text-gray-700">
                                            Cart Summary ({buy_product_item})
                                        </h2>
                                    </div>

                                    <h2 className="text-lg hidden lg:block mb-4 font-base lg:font-semibold text-gray-700">
                                        Cart Summary ({buy_product_item})
                                    </h2>

                                    {card_products.map((p, i) => (
                                        <div key={i} className="bg-gray-50 p-4 mb-4 rounded-lg border border-gray-100">
                                            <h3 className="text-sm font-semibold text-gray-600 mb-3">{p.shopName}</h3>
                                            {p.products.map((pt, index) => (
                                                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b last:border-0">
                                                    {/* Product Info */}
                                                    <div className="flex-1 flex items-start gap-4">
                                                        <img
                                                            src={pt?.productInfo?.images?.[0] || "/placeholder-product.jpg"}
                                                            alt="product"
                                                            className="w-18 h-[6rem] sm:w-20 sm:h-20 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="text-base font-medium text-gray-900 mb-1">
                                                                {pt?.productInfo?.name || 'Unknown Product'}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 mb-2">
                                                                Brand: {pt?.productInfo?.brand || 'Unknown'}
                                                            </p>
                                                            <div className="md:hidden mb-2">
                                                                <p className="text-sm font-semibold text-gray-900">
                                                                    NGN {(pt?.productInfo?.price - Math.floor((pt?.productInfo?.price * pt?.productInfo?.discount) / 100)).toLocaleString()}
                                                                </p>
                                                                <p className="text-xs text-gray-500 line-through">
                                                                    NGN {pt?.productInfo?.price?.toLocaleString()}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <button
                                                                    onClick={() => dispatch(delete_card_product(pt._id))}
                                                                    className="flex items-center text-red-500 hover:text-red-600 text-sm transition-colors"
                                                                >
                                                                    <DeleteOutlineOutlinedIcon className="mr-1 text-lg" />
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Price and Quantity Controls */}
                                                    <div className="w-full sm:w-auto flex items-center justify-between mt-3 sm:mt-0">
                                                        <div className="hidden md:block text-right mr-6">
                                                            <p className="text-base font-semibold text-gray-900">
                                                                NGN {(pt?.productInfo?.price - Math.floor((pt?.productInfo?.price * pt?.productInfo?.discount) / 100)).toLocaleString()}
                                                            </p>
                                                            <p className="text-xs text-gray-500 line-through">
                                                                NGN {pt?.productInfo?.price?.toLocaleString()}
                                                            </p>
                                                            {pt?.productInfo?.discount > 0 && (
                                                                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                                                    -{pt?.productInfo?.discount}%
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => dec(pt.quantity, pt._id)}
                                                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                                            >
                                                                <RemoveOutlinedIcon className="text-gray-600" />
                                                            </button>
                                                            <span className="w-8 text-center font-medium">
                                                                {pt.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => inc(pt.quantity, pt?.productInfo?.stock || 0, pt._id)}
                                                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                                            >
                                                                <AddOutlinedIcon className="text-gray-600" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                    {/* Out of Stock Section */}
                                    {outofstock_products.length > 0 && (
                                        <div className="bg-red-50 p-4 sm:p-6 rounded-lg mt-6 border border-red-100">
                                            <h2 className="text-lg font-semibold text-red-600 mb-4">
                                                Out of Stock ({outofstock_products.length})
                                            </h2>
                                            {outofstock_products.map((p, i) => (
                                                <div key={i} className="flex items-center justify-between py-3 border-b border-red-100 last:border-0">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={p?.products?.[0]?.images?.[0] || "/placeholder-product.jpg"}
                                                            alt="product"
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700">
                                                                {p?.products?.[0]?.name || 'Unknown Product'}
                                                            </h4>
                                                            <p className="text-xs text-gray-500">
                                                                Brand: {p?.products?.[0]?.brand || 'Unknown'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            NGN {p?.products?.[0]?.price - Math.floor((p?.products?.[0]?.price * p?.products?.[0]?.discount) / 100)}
                                                        </p>
                                                        <p className="text-xs text-gray-500 line-through">
                                                            NGN {p?.products?.[0]?.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Summary Section */}
                            <div className="lg:w-96 w-full">
                                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm sticky top-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                                        Order Summary
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Items ({buy_product_item})</span>
                                            <span className="font-base text-gray-900">NGN {price?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-base text-gray-900">NGN {shipping_fee?.toLocaleString()}</span>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="font-bold text-gray-800 text-lg">Total</span>
                                                <p className="text-xs text-gray-500">Excluding delivery fee</p>
                                            </div>
                                            <span className="font-bold text-lg text-gray-900">
                                                NGN {(price + shipping_fee)?.toLocaleString()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={redirect}
                                            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
                            <div className="mb-6">
                                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                            <p className="text-gray-600 mb-6">Browse our catalog and find something special!</p>
                            <Link
                                to="/"
                                className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <div className='block lg:hidden'>
                <BottomNav />
            </div>
            <div className='hidden lg:block'>
                <Footer />
            </div>
        </div>
    );
};

export default Card;
