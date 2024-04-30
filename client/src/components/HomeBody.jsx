import { Link } from "react-router-dom";
import { Suspense, memo, useEffect, useState } from "react";
import axios from "axios";
import { lazy } from "react";

const BannerSlider = lazy(() => import("./BannerSlider/BannerSlider"));
const CategoryHeader = lazy(() => import("./CategoryHeader"));
const HomeBodyBanner = lazy(() => import("./HomebodyBanner/HomeBodyBanner"));
import useDocumentTitle from "../utils/dynamicTitle";

const HomeBody = () => {
    const [categories, setCategories] = useState([]);
    const [bannerItems, setBannerItems] = useState([]);

    useDocumentTitle("Home | ParallaX Crafts");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, bannerItemsResponse] = await Promise.all([
                    axios.get("https://parallax-crafts.vercel.app/allcategories"),
                    axios.get("https://parallax-crafts.vercel.app/randomItems")
                ]);

                setCategories(categoriesResponse.data);
                setBannerItems(bannerItemsResponse.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="transiton duration-300 relative mt-20 lg:h-[calc(100vh-80px)]">
                <div
                    className="absolute inset-0 bg-cover bg-center dark:bg-opacity-90"
                    style={{
                        backgroundImage:
                            "url('https://i.ibb.co/k2tj8VS/slider.jpg')",
                    }}
                ></div>
                <div className="relative h-full dark:bg-brown-secondary dark:bg-opacity-55">
                    <Suspense fallback={<div>Loading...</div>}>
                        <BannerSlider />
                    </Suspense>
                </div>
            </section>
            <section className="transiton duration-300 lg:mt-44 mt-16 flex lg:flex-row flex-col lg:gap-64 gap-20 justify-center items-center mx-3 transition duration-300">
                <div className="relative">
                    <img
                        src="https://i.ibb.co/vcFxvNT/history-logo.png"
                        alt=""
                        className="absolute border-4 border-white dark:border-brown-secondary rounded-full lg:-top-16 -top-14 -left-5 lg:-left-20 animate-spin-slow lg:size-auto size-36"
                    />
                    <img src="https://i.ibb.co/DLP35Nb/cms-01.jpg" alt="" />
                    <img
                        src="https://i.ibb.co/GpRChPB/cms-02.jpg"
                        alt=""
                        className="absolute -bottom-16 lg:-right-32 border-4 border-white dark:border-brown-secondary rounded-tr-full rounded-tl-full lg:size-auto size-48 -right-2"
                    />
                </div>
                <div className="text-start flex flex-col lg:items-start items-center">
                    <p className="uppercase font-medium text-primary dark:text-brown-secondary text-lg mb-5">
                        More nature in more homes
                    </p>
                    <p className="text-gray-700 dark:text-brown-accent font-bold text-4xl lg:max-w-[400px] mb-10">
                        Handmade with patience and love for the artisanal craft
                    </p>
                    <div className="flex items-center gap-5 mb-5">
                        <img src="https://i.ibb.co/wNv4pZb/01-2.png" alt="" />
                        <div>
                            <p className="text-xl text-gray-600 dark:text-brown-accent font-bold dark:hover:text-brown-secondary hover:text-primary">
                                High quality product
                            </p>
                            <p className="text-primary  dark:text-brown-accent opacity-70">
                                Each item is made with care and attention to
                                detail.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mb-16">
                        <img src="https://i.ibb.co/b2D3TtQ/02-2.png" alt="" />
                        <div>
                            <p className="text-xl text-gray-600 dark:text-brown-accent font-bold dark:hover:text-brown-secondary hover:text-primary">
                                Natural fibers
                            </p>
                            <p className="text-primary dark:text-brown-accent opacity-70">
                                {" "}
                                Sustainable style that never goes out of
                                fashion.
                            </p>
                        </div>
                    </div>
                    <Link to="/all-items">
                        <button className="bg-primary dark:bg-brown-accent hover:bg-accent hover:text-primary text-accent dark:text-dark-brown py-3 px-6 rounded-md shadow-md hover:bg-opacity-85 dark:hover:bg-opacity-85 transition duration-300 font-bold">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </section>
            <section className="lg:mt-40 mt-5 bg-secondary dark:bg-brown-secondary lg:py-16 p-3 flex flex-col items-center justify-center transition duration-300">
                <p className="text-primary dark:text-brown-accent font-medium text-lg">
                    Shop by Categories
                </p>
                <p className="text-center font-bold text-4xl text-gray-800 dark:text-dark-brown my-5">
                    Designed by artists, made <br /> by us, just for you.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8">
                    {categories.map((category) => (
                        <Suspense
                            key={category._id}
                            fallback={<div>Loading...</div>}
                        >
                            <CategoryHeader category={category} />
                        </Suspense>
                    ))}
                </div>
            </section>

            <section className="transition duration-300 flex lg:flex-row flex-col lg:gap-20 gap-5 justify-center items-center my-10">
                <div className="space-y-2 flex flex-col items-start justify-start">
                    <img src="https://i.ibb.co/ZcxB5Wh/01.png" alt="" />
                    <p className="text-gray-600 dark:text-brown-secondary text-xl font-medium hover:text-primary dark:hover:text-brown-secondary">
                        Free Shipping
                    </p>
                    <p className="text-gray-400 italic dark:text-brown-accent ">
                        Free shipping for orders over $130
                    </p>
                </div>
                <div className="space-y-2 flex flex-col items-start justify-start">
                    <img src="https://i.ibb.co/ftY1tMc/02.png" alt="" />
                    <p className="text-gray-600 dark:text-brown-secondary text-xl font-medium hover:text-primary dark:hover:text-brown-secondary">
                        Money Guarantee
                    </p>
                    <p className="text-gray-400 italic dark:text-brown-accent ">
                        Within 30 days for an exchange
                    </p>
                </div>
                <div className="space-y-2 flex flex-col items-start justify-start">
                    <img src="https://i.ibb.co/GWsMLRJ/03.png" alt="" />
                    <p className="text-gray-600 dark:text-brown-secondary text-xl font-medium hover:text-primary dark:hover:text-brown-secondary">
                        24/7 online support
                    </p>
                    <p className="text-gray-400 italic dark:text-brown-accent ">
                        24 hrs a day, 7 days a week
                    </p>
                </div>
                <div className="space-y-2 flex flex-col items-start justify-start">
                    <img src="https://i.ibb.co/JCK3h1f/04.png" alt="" />
                    <p className="text-gray-600 dark:text-brown-secondary text-xl font-medium hover:text-primary dark:hover:text-brown-secondary">
                        Flexible Payment
                    </p>
                    <p className="text-gray-400 italic dark:text-brown-accent ">
                        Pay with Multiple Credit Cards
                    </p>
                </div>
            </section>

            <section className="transition duration-300 flex gap-10 mx-3 justify-center lg:flex-row flex-col lg:mb-16 mb-5 lg:mx-[164px]">
                <div className="bg-[url('https://i.ibb.co/8xv7J0v/cms-04.jpg')] p-5 w-full flex flex-col justify-center">
                    <p className="text-sm font-bold text-primary">
                        HANDMADE ITEMS
                    </p>
                    <p className="font-bold text-3xl">
                        Chemical Free <br /> Bowl & Ceramic <br />
                        Plates
                    </p>
                </div>
                <div className="p-2 bg-[#8E6E49] dark:bg-brown-secondary lg:w-1/2">
                    <div className="h-full border-2 border-white dark:border-secondary border-dashed p-4 flex flex-col gap-3 justify-center text-center text-white dark:text-secondary">
                        <p className="text-sm font-medium">
                            BUY MORE - SAVE MORE
                        </p>
                        <p className="text-3xl font-extrabold">
                            Big Season Sale <br /> 35% OFF
                        </p>
                        <Link to="/all-items">
                            <button className="bg-white dark:bg-secondary hover:bg-secondary dark:hover:bg-accent text-[#3f3121] text-sm font-bold py-3 px-7">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className=" transition duration-300 flex flex-col items-center lg:pb-16 pb-5 mx-3 lg:mx-[164px]">
                <p className="text-sm font-bold text-primary dark:text-brown-accent">
                    BEST SELLER
                </p>
                <h2 className="font-bold text-3xl mb-5 lg:mb-10 dark:text-brown-secondary">
                    Our Products
                </h2>
                <Suspense fallback={<div>Loading...</div>}>
                    <HomeBodyBanner items={bannerItems} />
                </Suspense>
            </section>
        </>
    );
};

export default memo(HomeBody);

