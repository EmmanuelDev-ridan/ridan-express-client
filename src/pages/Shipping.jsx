import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { place_order } from '../store/reducers/orderReducer'

const Shipping = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { state: { products, price, shipping_fee, items } } = useLocation()
    const [res, setRes] = useState(false)
    const [state, setState] = useState({
        name: '',
        address: '',
        phone: '',
        post: '',
        province: '',
        city: "",
        area: ""
    })
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const save = (e) => {
        e.preventDefault()
        const { name, address, phone, post, province, city, area } = state;
        if (name && address && phone && post && province && city && area) {
            setRes(true)
        }
    }
    const placeOrder = () => {
        dispatch(place_order({
            price,
            products,
            shipping_fee,
            shippingInfo: state,
            userId: userInfo.id,
            navigate,
            items
        }))
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Headers />
            <div className='bg-gray-50 flex-grow'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8'>
                    <section className='relative h-64 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600'>
                        <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                            <div className='text-center text-white space-y-4'>
                                <h1 className='text-4xl font-bold tracking-tight'>Shop.my</h1>
                                <nav className='flex items-center justify-center gap-2 text-lg font-medium'>
                                    <Link to='/' className='hover:text-blue-200 transition-colors'>Home</Link>
                                    <MdOutlineKeyboardArrowRight className="w-5 h-5" />
                                    <span className='text-gray-200'>Place Order</span>
                                </nav>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <section className='bg-gray-50 flex-grow'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        <div className='lg:col-span-2 space-y-6'>
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                                {
                                    !res ? (
                                        <>
                                            <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Shipping Information</h2>
                                            <form onSubmit={save} className="space-y-6">
                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                    <div className='space-y-2'>
                                                        <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Name</label>
                                                        <input onChange={inputHandle} value={state.name} type="text" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='name' placeholder='John Doe' id='name' />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <label htmlFor="address" className='block text-sm font-medium text-gray-700'>Address</label>
                                                        <input onChange={inputHandle} value={state.address} type="text" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='address' placeholder='House no / building / strreet /area' id='address' />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <label htmlFor="phone" className='block text-sm font-medium text-gray-700'>Phone</label>
                                                        <input onChange={inputHandle} value={state.phone} type="text" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='phone' placeholder='+1 234 567 890' id='phone' />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <label htmlFor="post" className='block text-sm font-medium text-gray-700'>Post</label>
                                                        <input onChange={inputHandle} value={state.post} type="text" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='post' placeholder='Post code' id='post' />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <label htmlFor="province" className='block text-sm font-medium text-gray-700'>Province</label>
                                                        <input onChange={inputHandle} value={state.province} type="text" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='province' placeholder='Province' id='province' />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <label htmlFor="city" className='block text-sm font-medium text-gray-700'>City</label>
                                                        <input onChange={inputHandle} value={state.city} type="text" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='city' placeholder='City' id='city' />
                                                    </div>
                                                    <div className='space-y-2'>
                                                        <label htmlFor="area" className='block text-sm font-medium text-gray-700'>Area</label>
                                                        <input onChange={inputHandle} value={state.area} type="text" className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='area' placeholder='Area' id='province' />
                                                    </div>
                                                </div>
                                                <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'>
                                                    Save Shipping Details
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <h2 className="text-xl font-semibold text-gray-900">Delivery to {state.name}</h2>
                                                <button
                                                    onClick={() => setRes(false)}
                                                    className="text-purple-600 hover:text-purple-700 font-medium"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-700">
                                                    {state.address}<br />
                                                    {state.city}, {state.province}<br />
                                                    {state.area} {state.post}
                                                </p>
                                                <p className="mt-3 text-sm text-gray-500">
                                                    Phone: {state.phone}<br />
                                                    Email: sheikhfarid@gmail.com
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            {products.map((p, i) => (
                                <div key={i} className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4'>
                                    <h3 className='text-lg font-semibold text-gray-900'>{p.shopName}</h3>
                                    {p.products.map((pt, j) => (
                                        <div key={i + 99} className='flex flex-wrap py-4 border-b border-gray-200 last:border-0'>
                                            <div className='flex items-center w-full md:w-7/12 gap-4'>
                                                <img className='w-20 h-20 rounded-lg object-cover' src={pt.productInfo.images[0]} alt="product" />
                                                <div>
                                                    <h4 className='text-gray-900 font-medium'>{pt.productInfo.name}</h4>
                                                    <p className='text-sm text-gray-500'>Brand: {pt.productInfo.brand}</p>
                                                </div>
                                            </div>
                                            <div className='w-full md:w-5/12 mt-4 md:mt-0 md:pl-4'>
                                                <div className='flex flex-col items-end'>
                                                    <div className='text-lg font-semibold text-orange-600'>
                                                        ${pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}
                                                    </div>
                                                    <div className='text-sm text-gray-500 line-through'>${pt.productInfo.price}</div>
                                                    <div className='text-sm text-green-600 font-medium'>Save {pt.productInfo.discount}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className='lg:col-span-1'>
                            <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6'>
                                <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Order Summary</h2>
                                <div className='space-y-4'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-600'>Items ({price})</span>
                                        <span className='font-medium text-gray-900'>${price}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-600'>Delivery Fee</span>
                                        <span className='font-medium text-gray-900'>${shipping_fee}</span>
                                    </div>
                                    <div className='border-t border-gray-200 pt-4'>
                                        <div className='flex justify-between'>
                                            <span className='text-lg font-semibold text-gray-900'>Total</span>
                                            <span className='text-lg font-bold text-orange-600'>${price + shipping_fee}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={placeOrder}
                                        disabled={!res}
                                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${res ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                            : 'bg-gray-300 cursor-not-allowed text-gray-500'
                                            }`}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Shipping