import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { get_banners } from "../store/reducers/homeReducer";
import ridanImage from "../assets/Images/banner/ridan.jpg";
import ridanImage2 from "../assets/Images/banner/fashion.jpg";
import ridanImage3 from "../assets/Images/banner/Men.png";

const Banner = () => {
    const dispatch = useDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const timeoutRef = useRef(null);

    const carouselImages = [
        ridanImage,
        ridanImage2,
        ridanImage3
    ];

    useEffect(() => {
        dispatch(get_banners());
    }, [dispatch]);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setCurrentSlide((prev) => 
                prev === carouselImages.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => resetTimeout();
    }, [currentSlide]);

    const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? carouselImages.length - 1 : prev - 1));
    const nextSlide = () => setCurrentSlide(prev => (prev === carouselImages.length - 1 ? 0 : prev + 1));

    return (
        <div className="container w-full mx-auto">
            <div className="flex flex-col justify-center lg:flex-row gap-3 lg:gap-4">
                {/* Main Carousel - Mobile-first design */}
                <div className="relative w-full lg:w-[57%]">
                    <div className="relative h-40 xs:h-48 sm:h-56 md:h-96 overflow-hidden rounded-xl">
                        {carouselImages.map((image, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={image}
                                    className="w-full h-full object-cover object-center"
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Enhanced Indicators */}
                    <div className="absolute z-30 flex -translate-x-1/2 my-5 bottom-3 left-1/2 space-x-2">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-6 h-1 rounded-full transition-all duration-300 ${
                                    index === currentSlide ? 'bg-orange-500' : 'bg-gray-200/80'
                                }`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>

                    {/* Larger Controls for Mobile */}
                    <button
                        type="button"
                        className="absolute top-1/2 left-2 -translate-y-1/2 z-30 p-2 bg-white/30 rounded-full hover:bg-white/50 transition-colors sm:left-4"
                        onClick={prevSlide}
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="absolute top-1/2 right-2 -translate-y-1/2 z-30 p-2 bg-white/30 rounded-full hover:bg-white/50 transition-colors sm:right-4"
                        onClick={nextSlide}
                    >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Right Grid - Mobile Optimized */}
                <div className="lg:w-[33%] w-full grid lg:grid-cols-2 md:grid-cols-4 grid-cols-2 gap-2 sm:gap-3">
                    {/* XclusivePlus Card */}
                    <div className="relative rounded-xl overflow-hidden shadow-md h-40 sm:h-48">
                        <img
                            src="https://www-konga-com-res.cloudinary.com/image/upload/w_300,f_auto,fl_lossy,dpr_1.0,q_auto/v1721217481/contentservice/box%20banner.png_6YtnUQEK6.png"
                            alt="XclusivePlus"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2 sm:p-3">
                            <h3 className="text-white font-bold text-sm sm:text-base">XclusivePlus</h3>
                            <p className="text-orange-300 text-xs sm:text-sm">GET UP TO ₦1,000 OFF</p>
                        </div>
                    </div>

                    {/* Interest Card */}
                    <div className="relative rounded-xl overflow-hidden shadow-md h-40 sm:h-48 bg-blue-600 p-3 flex flex-col justify-center items-center">
                        <div className="text-center space-y-1">
                            <h3 className="text-white font-bold text-xl sm:text-2xl">Unlock 15%</h3>
                            <p className="text-white text-xs sm:text-sm">Annual Interest</p>
                            <p className="text-white font-semibold text-sm sm:text-base mt-1">JUST FOR YOU!</p>
                        </div>
                    </div>

                    {/* Product Cards */}
                    {[
                        {
                            img: "https://www-konga-com-res.cloudinary.com/image/upload/w_300,f_auto,fl_lossy,dpr_1.0,q_auto/v1714910034/contentservice/access%20new.png_r19IQgHfC.png",
                            title: "CeraVe",
                            text: "Visibly maintains moisture even after 48 hours"
                        },
                        {
                            img: "https://www-konga-com-res.cloudinary.com/image/upload/w_300,f_auto,fl_lossy,dpr_1.0,q_auto/v1724314744/contentservice/image%20%281%29.png_UzlEcf8H0.png",
                            button: true
                        }
                    ].map((item, index) => (
                        <div key={index} className="relative rounded-xl overflow-hidden shadow-md h-40 sm:h-48">
                            <img
                                src={item.img}
                                alt="Product"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2 sm:p-3">
                                {item.button ? (
                                    <button className="w-full bg-orange-500 text-white py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-orange-600 transition-colors">
                                        SHOP NOW
                                    </button>
                                ) : (
                                    <>
                                        <h3 className="text-white font-bold text-sm sm:text-base">{item.title}</h3>
                                        <p className="text-white text-xs sm:text-sm">{item.text}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;