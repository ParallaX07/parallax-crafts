import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./BannerSliderStyles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function BannerSlider() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty("--progress", 1 - progress);
    };

    return (
        <Swiper
            spaceBetween={30}
            loop={true}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className="transition duration-300 flex justify-between lg:gap-28 gap-10 items-center lg:flex-row flex-col py-8">
                    <div className="lg:h-[450px] h-48 animate__animated animate__pulse animate__slow animate__infinite">
                        <img
                            src="https://i.ibb.co/M1FxFKj/slider-02.png"
                            alt=""
                        />
                    </div>
                    <div className="flex items-center justify-center flex-col">
                        <p className="lg:max-w-[600px] mx-3 lg:text-3xl text-lg text-gray-700 dark:text-dark-brown">
                            <span className="text-primary dark:text-brown-accent font-extrabold">
                                Where the Earth Meets Your Hearth
                            </span>{" "}
                            <br /> Discover handcrafted ceramics that bring
                            warmth and beauty to your home.
                        </p>
                        <Link to="/all-items">
                            <button className="mt-6 bg-primary dark:bg-brown-accent text-lg text-accent dark:text-secondary py-3 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-fit font-bold">
                                Browse Collection
                            </button>
                        </Link>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex justify-between lg:gap-28 gap-10 items-center lg:flex-row-reverse flex-col py-8">
                    <div className="lg:h-[450px] h-48 animate__animated animate__pulse animate__slow animate__infinite">
                        <img
                            src="https://i.ibb.co/hcB20JW/slider-01-1.png"
                            alt=""
                        />
                    </div>
                    <div className="flex items-center justify-center flex-col">
                        <p className="lg:max-w-[600px] mx-3 lg:text-3xl text-lg text-gray-700 dark:text-dark-brown">
                            <span className="text-primary dark:text-brown-accent font-extrabold">
                                From Oven to Oasis
                            </span>{" "}
                            <br /> Unleash the potential of your space with
                            stunning stoneware, porcelain, and terracotta
                        </p>
                        <Link to="/all-items">
                            <button className="mt-6 bg-primary dark:bg-brown-accent text-lg text-accent dark:text-secondary py-3 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-fit font-bold">
                                Browse Collection
                            </button>
                        </Link>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex justify-between lg:gap-28 gap-10 items-center lg:flex-row flex-col py-8">
                    <div className="lg:h-[450px] h-48 animate__animated animate__pulse animate__slow animate__infinite">
                        <img
                            src="https://i.ibb.co/LCv3gpD/cms-03-1.png"
                            alt=""
                        />
                    </div>
                    <div className="flex items-center justify-center flex-col">
                        <p className="lg:max-w-[600px] mx-3 lg:text-3xl text-lg text-gray-700 dark:text-dark-brown">
                            <span className="text-primary dark:text-brown-accent font-extrabold">
                                Pottery So Fine, It&apos;s Practically Criminal
                            </span>{" "}
                            <br /> Elevate your everyday with handcrafted
                            ceramics that steal the show
                        </p>
                        <Link to="/all-items">
                            <button className="mt-6 bg-primary dark:bg-brown-accent text-lg text-accent dark:text-secondary py-3 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-fit font-bold">
                                Browse Collection
                            </button>
                        </Link>
                    </div>
                </div>
            </SwiperSlide>

            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </Swiper>
    );
}
