import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import Products from '../components/products/Products';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineKeyboardArrowRight, MdFilterList } from 'react-icons/md';
import { CiStar } from 'react-icons/ci';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';
import { price_range_product, query_products } from '../store/reducers/homeReducer';
import { useDispatch, useSelector } from 'react-redux';

const SearchProducts = () => {
    let [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const searchValue = searchParams.get('value');
    const { products, totalProduct, latest_product, priceRange, parPage } = useSelector(state => state.home);

    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRangeValues, setPriceRangeValues] = useState([priceRange.low, priceRange.high]);
    const [ratingFilter, setRatingFilter] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        dispatch(price_range_product());
    }, [dispatch]);

    useEffect(() => {
        setPriceRangeValues([priceRange.low, priceRange.high]);
    }, [priceRange]);

    useEffect(() => {
        dispatch(query_products({
            low: priceRangeValues[0],
            high: priceRangeValues[1],
            category,
            rating: ratingFilter,
            sortPrice: sortOption,
            pageNumber,
            searchValue
        }));
    }, [priceRangeValues, category, ratingFilter, pageNumber, sortOption, searchValue, dispatch]);

    const resetFilters = () => {
        setRatingFilter('');
        setPriceRangeValues([priceRange.low, priceRange.high]);
        setSortOption('');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0
        }).format(price).replace('NGN', '₦');
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <Headers />

            {/* Hero Banner */}
            <div className="relative hidden lg:block bg-gradient-to-r from-gray-800 to-indigo-700 h-52 md:h-64 flex items-center">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto pt-[9rem] text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Shop {category}</h1>
                        <div className="flex items-center justify-center text-white/90">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <MdOutlineKeyboardArrowRight className="mx-2" />
                            <Link to="/categories" className="hover:text-white transition-colors">All Categories</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Breadcrumb */}
            <div className="lg:hidden bg-gray-900 shadow-sm mt-[4rem] lg:mt-0 py-2 pb-3 px-4">
                <div className="flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                    <Link to="/" className="hover:text-orange-600 text-white">Home</Link>
                    <MdOutlineKeyboardArrowRight className="mx-1 text-gray-400" />
                    <Link to="/categories" className="hover:text-orange-600 text-white">All Categories</Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-0 lg:py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Mobile Toggle */}
                    {/* <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center justify-center gap-2 bg-gray-800 text-white py-3 px-4 rounded-lg mb-6"
                    >
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                    </button> */}

                    {/* Filters Sidebar */}
                    <aside className={`lg:w-80 xl:w-96 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                                <button
                                    onClick={resetFilters}
                                    className="text-sm text-gray-800 hover:text-gray-800"
                                >
                                    Reset all
                                </button>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-8">
                                <h3 className="font-semibold mb-4 text-gray-700">Price Range</h3>
                                <div className="mb-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">{formatPrice(priceRangeValues[0])}</span>
                                        <span className="text-sm text-gray-600">{formatPrice(priceRangeValues[1])}</span>
                                    </div>
                                    <div className="relative h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="absolute h-full bg-gray-800 rounded-full"
                                            style={{
                                                left: `${((priceRangeValues[0] - priceRange.low) / (priceRange.high - priceRange.low)) * 100}%`,
                                                right: `${100 - ((priceRangeValues[1] - priceRange.low) / (priceRange.high - priceRange.low)) * 100}%`
                                            }}
                                        ></div>
                                        <input
                                            type="range"
                                            min={priceRange.low}
                                            max={priceRange.high}
                                            value={priceRangeValues[0]}
                                            onChange={(e) => setPriceRangeValues([parseInt(e.target.value), priceRangeValues[1]])}
                                            className="absolute w-full h-2 opacity-0 cursor-pointer"
                                        />
                                        <input
                                            type="range"
                                            min={priceRange.low}
                                            max={priceRange.high}
                                            value={priceRangeValues[1]}
                                            onChange={(e) => setPriceRangeValues([priceRangeValues[0], parseInt(e.target.value)])}
                                            className="absolute w-full h-2 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[2000, 5000, 10000, 20000, 40000].map((price) => (
                                        <button
                                            key={price}
                                            onClick={() => setPriceRangeValues([0, price])}
                                            className={`text-sm py-2 px-3 rounded-lg border ${priceRangeValues[1] === price ?
                                                'border-gray-800 text-orange-600' :
                                                'border-gray-500 text-gray-500 hover:border-gray-800'
                                                }`}
                                        >
                                            Under {formatPrice(price)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="border-t pt-6">
                                <h3 className="font-semibold mb-4 text-gray-700">Customer Rating</h3>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <button
                                            key={stars}
                                            onClick={() => setRatingFilter(ratingFilter === stars ? '' : stars)}
                                            className={`flex items-center gap-3 w-full p-3 rounded-lg ${ratingFilter === stars ?
                                                'bg-gray-800border border-gray-800' :
                                                'hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    i < stars ?
                                                        <AiFillStar key={i} size={18} /> :
                                                        <CiStar key={i} size={18} />
                                                ))}
                                            </div>
                                            <span className="text-gray-600 text-sm">
                                                {stars === 5 ? '5 Stars' : `${stars}+ Stars`}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                    {/* Products Section */}
                    <div className="flex-1">
                        {/* Products Header */}
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden flex items-center gap-2 bg-gray-800 text-white py-2 px-4 rounded-lg"
                                    >
                                        <MdFilterList size={18} />
                                        Filters
                                    </button>
                                    <span className="text-gray-700 font-medium">
                                        {totalProduct} {totalProduct === 1 ? 'product' : 'products'}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <select
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-800 text-gray-700"
                                    >
                                        <option value="">Sort by</option>
                                        <option value="low-to-high">Price: Low to High</option>
                                        <option value="high-to-low">Price: High to Low</option>
                                    </select>
                                    <div className="hidden md:flex gap-2 bg-gray-100 p-1 rounded-lg">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}
                                        >
                                            <BsFillGridFill size={18} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}
                                        >
                                            <FaThList size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <ShopProducts products={products} styles={viewMode} />

                        {/* Pagination */}
                        {totalProduct > parPage && (
                            <div className="mt-8">
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

            <div className='hidden lg:block'>
                <Footer />
            </div>
        </div>
    );
};

export default SearchProducts;