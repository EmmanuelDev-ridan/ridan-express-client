import React, { useEffect } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Ratings from '../Ratings'
import { add_to_card, messageClear, add_to_wishlist } from '../../store/reducers/cardReducer'

const FeatureProducts = ({ products }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.card)

    const add_card = (id, e) => {
        e.preventDefault()
        e.stopPropagation()
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }))
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage])

    const add_wishlist = (pro, e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }

    return (
        <div className='w-full max-w-7xl mx-auto py-0 lg:py-4 px-2 lg:px-4'>

            <div className="flex border border-gray-200 bg-transparent lg:bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 rounded-lg justify-between items-center mb-3 lg:mb-8 shadow-sm">
                <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-orange-500 lg:text-white ">
                        Special For You
                    </h2>
                    <span className="w-12 h-1 bg-orange-500 lg:bg-white mt-2 rounded-full block" />
                </div>
                <Link
                    to="/products"
                    className="text-orange-600 lg:text-white font-medium hover:underline transition-colors flex items-center gap-1"
                >
                    See All
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-1 lg:gap-4'>
                {products.map((p, i) => (
                    <div key={i} className='bg-white rounded-lg shadow-sm transition-all duration-300 group overflow-hidden relative flex flex-col border border-gray-100 hover:border-orange-200'>
                        <Link to={`/product/details/${p.slug}`} className='relative flex-1'>
                            {p.discount && (
                                <div className='absolute left-2 top-2 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-sm'>
                                    {p.discount}% OFF
                                </div>
                            )}
                            <div className='aspect-square overflow-hidden bg-gray-50'>
                                <img
                                    className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-2'
                                    src={p.images[0]}
                                    alt={p.name}
                                    loading='lazy'
                                />
                            </div>
                        </Link>

                        {/* Action Buttons */}
                        <div className='absolute top-40 hidden lg:flex right-3 flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <button
                                onClick={(e) => add_wishlist(p, e)}
                                className='w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-orange-600 hover:text-white text-gray-800 transition-all'
                                aria-label="Add to wishlist"
                            >
                                <AiFillHeart className='w-4 h-4' />
                            </button>
                            <button
                                onClick={(e) => add_card(p._id, e)}
                                className='w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-orange-600 hover:text-white text-gray-800 transition-all'
                                aria-label="Add to cart"
                            >
                                <AddShoppingCartIcon className='w-5 h-5' />
                            </button>
                        </div>

                        <div className='absolute top-2 right-2 lg:hidden flex gap-1'>
                            <button
                                onClick={(e) => add_card(p._id, e)}
                                className='w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow hover:bg-orange-600 hover:text-white transition-all'
                                aria-label="Add to cart"
                            >
                                <ShoppingCartOutlinedIcon className='w-4 h-4 text-orange-600 hover:text-white' />
                            </button>
                        </div>

                        <div className="py-3 px-3 text-gray-700 flex flex-col gap-1">
                            <Link to={`/product/details/${p.slug}`} className='hover:text-orange-600'>
                                <h2 className="text-sm font-semibold line-clamp-1">
                                    {p.name}
                                </h2>
                            </Link>

                            <div className="flex items-center gap-1">
                                <Ratings ratings={p.rating} />
                                <span className="text-xs text-gray-500">({p.rating})</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1 mt-1">
                                <span className="text-base font-bold text-orange-600">
                                    ₦{(p.price - (p.price * p.discount) / 100).toLocaleString()}
                                </span>
                                {p.discount > 0 && (
                                    <del className="text-gray-400 text-sm">
                                        ₦{p.price.toLocaleString()}
                                    </del>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeatureProducts