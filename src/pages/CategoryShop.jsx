import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import Products from '../components/products/Products';
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import ShopProducts from '../components/products/ShopProducts';
import BottomNav from ".././components/BottomNav"
import Pagination from '../components/Pagination';
import { price_range_product, query_products } from '../store/reducers/homeReducer';
import { useDispatch, useSelector } from 'react-redux';

const CategoryShops = () => {
    let [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const { products, totalProduct, latest_product, priceRange, parPage } = useSelector(state => state.home)

    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(1)
    const [styles, setStyles] = useState('grid')
    const [filter, setFilter] = useState(true)
    const [state, setState] = useState({ values: [priceRange.low, priceRange.high] })
    const [rating, setRatingQ] = useState('')
    const [sortPrice, setSortPrice] = useState('')

    useEffect(() => {
        dispatch(price_range_product())
    }, [])
    useEffect(() => {
        setState({
            values: [priceRange.low, priceRange.high]
        })
    }, [priceRange])

    useEffect(() => {
        dispatch(
            query_products({
                low: state.values[0] || '',
                high: state.values[1] || '',
                category,
                rating,
                sortPrice,
                pageNumber
            })
        )
    }, [state.values[0], state.values[1], category, rating, pageNumber, sortPrice])

    const resetRating = () => {
        setRatingQ('')
        dispatch(query_products({
            low: state.values[0],
            high: state.values[1],
            category,
            rating: '',
            sortPrice,
            pageNumber
        }))
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Headers />

            {/* Enhanced Banner Section */}
            <section className='bg-orange-600 hidden lg:block h-60 relative'>
                <div className='absolute inset-0 bg-black/30'>
                    <div className='container mx-auto h-full px-4'>
                        <div className='flex flex-col items-center justify-center h-full text-center text-white'>
                            <h1 className='text-4xl font-bold mb-3'>Shop Products</h1>
                            <div className='flex items-center text-lg'>
                                <Link to='/' className='hover:text-orange-200 transition-colors'>Home</Link>
                                <MdOutlineKeyboardArrowRight className='mx-2' />
                                <span className='text-orange-200'>Category Products</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <div className='flex block lg:hidden items-center px-5 py-1 text-lg'>
                <Link to='/' className='hover:text-orange-200 text-sm transition-colors'>Home</Link>
                <MdOutlineKeyboardArrowRight className='mx-2' />
                <span className='text-orange-600 text-sm'>Categories</span>
                <MdOutlineKeyboardArrowRight className='mx-2' />
                <span className='text-orange-600 text-sm'>{category}</span>
            </div>
            <section className='flex-1 py-3 lg:py-8 mb-20 mx-0 lg:mx-[120px]'>
                <div className='container mx-auto px-4'>
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setFilter(!filter)}
                        className='lg:hidden w-full mb-6 py-3 bg-orange-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors'
                    >
                        {filter ? 'Hide Filters' : 'Show Filters'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>

                    <div className='flex flex-col lg:flex-row gap-8'>
                        {/* Filters Sidebar */}
                        <div className={`lg:w-72 xl:w-80 ${filter ? 'block' : 'hidden lg:block'}`}>
                            <div className='bg-white p-6 rounded-lg shadow-md'>
                                <h2 className='text-xl font-bold mb-6 border-b pb-4'>Filter Products</h2>

                                {/* Price Filter */}
                                <div className='mb-8'>
                                    <h3 className='font-semibold mb-4'>Price Range (₦)</h3>
                                    <div className='space-y-3'>
                                        {[
                                            { label: 'Under 2,000', value: [0, 2000] },
                                            { label: '2,000 - 5,000', value: [2000, 5000] },
                                            { label: '5,000 - 10,000', value: [5000, 10000] },
                                            { label: '10,000 - 20,000', value: [10000, 20000] },
                                            { label: '20,000 - 40,000', value: [20000, 40000] },
                                            { label: '40,000+', value: [40000, priceRange.high] }
                                        ].map((range, idx) => (
                                            <label key={idx} className='flex items-center gap-3 p-2 hover:bg-orange-50 rounded cursor-pointer'>
                                                <input
                                                    type="checkbox"
                                                    className='w-3 h-3 text-orange-600 border-gray-300 rounded focus:ring-orange-500'
                                                    checked={state.values[0] === range.value[0] && state.values[1] === range.value[1]}
                                                    onChange={() => setState({ values: range.value })}
                                                />
                                                <span className='text-gray-700 font-base text-sm'>{range.label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Custom Price Range Inputs */}
                                    <div className='flex gap-2 w-[100%] items-center'>
                                        <input
                                            type="number"
                                            placeholder='₦Min'
                                            // Fixed syntax with proper parentheses
                                            onChange={e => setState(prev => ({
                                                values: [Number(e.target.value), prev.values[1]]
                                            }))}
                                            className='flex-1 w-[80px]  border rounded-md text-sm focus:ring-2 focus:ring-orange-500'
                                        />
                                        <span className='text-gray-400'>-</span>
                                        <input
                                            type="number"
                                            placeholder='₦Max'
                                            // Fixed syntax with proper parentheses
                                            onChange={e => setState(prev => ({
                                                values: [prev.values[0], Number(e.target.value)]
                                            }))}
                                            className='flex-1 w-[80px] p-2 border rounded-md text-sm focus:ring-2 focus:ring-orange-500'
                                        />
                                    </div>
                                </div>

                                {/* Rating Filter */}
                                <div className='border-t pt-6'>
                                    <h3 className='font-semibold mb-4'>Customer Rating</h3>
                                    <div className='space-y-3'>
                                        {[5, 4, 3, 2, 1].map((stars) => (
                                            <button
                                                key={stars}
                                                onClick={() => setRatingQ(stars)}
                                                className={`w-full flex items-center gap-2 p-2 rounded-lg ${rating === stars ? 'bg-orange-50 border border-orange-200' : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className='flex text-orange-400'>
                                                    {[...Array(5)].map((_, i) =>
                                                        i < stars ? <AiFillStar key={i} /> : <CiStar key={i} />
                                                    )}
                                                </div>
                                                <span className='text-sm text-gray-600'>{stars === 5 ? '5 Stars' : `${stars}+ Stars`}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className='flex-1'>
                            {/* Products Header */}
                            <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
                                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-semibold'>{totalProduct} Products</span>
                                    </div>

                                    <div className='flex items-center gap-4 w-full md:w-auto'>
                                        <select
                                            className='px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500'
                                            onChange={(e) => setSortPrice(e.target.value)}
                                        >
                                            <option value="">Sort By</option>
                                            <option value="low-to-high">Price: Low to High</option>
                                            <option value="high-to-low">Price: High to Low</option>
                                        </select>

                                        <div className='hidden md:flex gap-1 bg-gray-100 p-1 rounded-md'>
                                            <button
                                                onClick={() => setStyles('grid')}
                                                className={`p-2 rounded-md ${styles === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'}`}
                                            >
                                                <BsFillGridFill size={18} />
                                            </button>
                                            <button
                                                onClick={() => setStyles('list')}
                                                className={`p-2 rounded-md ${styles === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600'}`}
                                            >
                                                <FaThList size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <ShopProducts products={products} styles={styles} />

                            {/* Pagination */}
                            {totalProduct > parPage && (
                                <div className='mt-8'>
                                    <Pagination
                                        pageNumber={pageNumber}
                                        setPageNumber={setPageNumber}
                                        totalItem={totalProduct}
                                        parPage={parPage}
                                        showItem={Math.floor(totalProduct / parPage)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className='hidden lg:block'>
                <Footer />
            </div>

            <div className='block lg:hidden'>
                <BottomNav />
            </div>
        </div>
    )
}

export default CategoryShops;

