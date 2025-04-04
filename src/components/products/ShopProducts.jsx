import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import Ratings from '../Ratings'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_card, messageClear, add_to_wishlist } from '../../store/reducers/cardReducer'

const ShopProducts = ({ styles, products }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.card)

    const add_card = (id) => {
        
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

    const add_wishlist = (pro) => {

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
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0 lg:gap-2'>
        {products.map((p, i) => (
            <div
                key={i}
                className='bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative flex flex-col'
            >
                <div className='relative flex-1'>
                    {p.discount && (
                        <div className='absolute left-2 top-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10'>
                            {p.discount}% OFF
                        </div>
                    )}
                    <div className='aspect-square overflow-hidden'>
                        <img
                            className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                            src={p.images[0]}
                            alt={p.name}
                            loading='lazy'
                        />
                    </div>
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300' />

                    <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <button
                            onClick={() => add_wishlist(p)}
                            className='w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-all'
                            aria-label="Add to wishlist"
                        >
                            <AiFillHeart className='w-5 h-5' />
                        </button>
                        <Link
                            to={`/product/details/${p.slug}`}
                            className='w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-all'
                            aria-label="View product details"
                        >
                            <FaEye className='w-5 h-5' />
                        </Link>
                        <button
                            onClick={() => add_card(p._id)}
                            className='w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-all'
                            aria-label="Add to cart"
                        >
                            <AiOutlineShoppingCart className='w-5 h-5' />
                        </button>
                    </div>
                </div>

                <div className="py-3 px-2 text-gray-700">
                    <h2 className="text-sm md:text-base font-semibold line-clamp-1">
                        {p.name}
                    </h2>

                    <div className="flex py-1 font-semibold">
                        <Ratings ratings={p.rating} />
                    </div>

                    <div className="flex flex-row flex-wrap items-center gap-4 mt-1 md:gap-1">
                        <span className="text-[15px] font-base text-black">
                            ₦ {(p.price - (p.price * p.discount) / 100).toLocaleString()}
                        </span>
                        
                        {p.discount > 0 && (
                            <del className="text-gray-500 text-[13px] font-base">
                                ₦ {p.price.toLocaleString()}
                            </del>
                        )}
                    </div>
                </div>
            </div>
        ))}
    </div>
    )
}

export default ShopProducts