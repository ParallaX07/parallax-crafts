import {
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-accent dark:bg-brown-accent w-full transition duration-300">
            <div className="py-8 lg:px-10 px-3 bg-secondary dark:bg-brown-secondary flex lg:flex-row flex-col justify-between">
                <p className="flex items-center dark:text-dark-brown text-lg lg:justify-start justify-center lg:text-2xl gap-3 text-gray-600 font-bold lg:max-w-[500px]">
                    <HiOutlineMailOpen className="text-primary dark:text-brown-accent text-5xl" />
                    Get our emails for info on new items, sales and more.
                </p>
                <div className="relative lg:w-96 w-full mt-2">
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        className="bg-white lg:py-4 py-2 lg:px-6 px-4 shadow-md lg:text-xl text-base w-full"
                    />
                    <button>
                        <IoIosArrowDroprightCircle className="text-primary lg:text-5xl text-3xl absolute right-2 top-1" />
                    </button>
                </div>
            </div>
            <div className="bg-accent dark:bg-brown-accent lg:px-10 px-3 lg:pt-20 py-5 flex lg:flex-row flex-col lg:gap-20 gap-10 justify-evenly">
                <div className="flex flex-col gap-4 lg:max-w-[450px]">
                    <h2 className="text-2xl font-bold">About Us</h2>
                    <p className="text-gray-600 dark:text-black text-base text-balance w-full">
                        At{" "}
                        <span className="text-primary dark:text-dark-brown font-bold">ParallaX</span>{" "}
                        <span className="text-gray-900 dark:text-brown-secondary font-bold">Crafts</span>,
                        we love creating pottery that elevates your space.
                        Explore our unique collection and bring a touch of
                        nature home.
                    </p>
                    <hr className="border-t-2 border-primary dark:border-brown-secondary border-opacity-70" />
                    <div className="flex gap-3 w-full justify-evenly">
                        <a href="https://www.facebook.com/saal07/">
                            <FaFacebook className="text-2xl text-primary dark:text-dark-brown opacity-55" />
                        </a>
                        <a href="https://www.linkedin.com/in/saalimaraf/">
                            <FaLinkedinIn className="text-2xl text-primary dark:text-dark-brown opacity-55" />
                        </a>
                        <a href="https://www.instagram.com/ss_araf/">
                            <FaInstagram className="text-2xl text-primary dark:text-dark-brown opacity-55" />
                        </a>
                        <a href="https://twitter.com/ArafSaalim">
                            <FaXTwitter className="text-2xl text-primary dark:text-dark-brown opacity-55" />
                        </a>
                    </div>
                </div>
                {/* My account */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">My Account</h2>
                    <div className="flex gap-3 text-base text-balance flex-col justify-between dark:text-dark-brown text-gray-600">
                        <Link
                            to="/my-items"
                        >
                            My items
                        </Link>
                        <Link
                            to="/update-profile"
                        >
                            Update Profile
                        </Link>
                        <p>
                            Wishlist
                        </p>
                    </div>
                </div>
                {/* Browse */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Browse</h2>
                    <div className="flex gap-3 flex-col justify-between dark:text-dark-brown text-base text-balance text-gray-600">
                        <Link
                            to="/category/all-items"
                        >
                            All Items
                        </Link>
                        <Link
                            to="/category/Stoneware"
                        >
                            Stoneware
                        </Link>
                        <Link
                            to="/category/Clay-Made Pottery"
                        >
                            Clay-Made Pottery
                        </Link>
                        <Link
                            to="/category/Porcelain"
                        >
                            Porcelain
                        </Link>
                        <Link
                            to="/category/Terracotta"
                        >
                            Terracotta
                        </Link>
                        <Link
                            to="/category/Ceramics & Architectural"
                        >
                            Ceramics & Architectural
                        </Link>
                        <Link
                            to="/category/Home Decor Pottery"
                        >
                            Home Decor Pottery
                        </Link>
                    </div>
                </div>
                {/* Contact Information */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <div className="flex gap-3 flex-col justify-between text-gray-600 text-base text-balance dark:text-dark-brown">
                        <p className=" flex items-center gap-4">
                            <IoLocationSharp />
                            example@email.com
                        </p>
                        <p className=" flex items-center gap-4">
                            <FaPhoneAlt />
                            (+88) 0171-2345678
                        </p>
                        <p className=" flex items-center gap-4">
                            <MdOutlineEmail />
                            example@email.com
                        </p>
                    </div>
                </div>
            </div>
            <hr className="border-t-2 border-primary dark:border-brown-secondary border-opacity-70 w-full" />

            <div className="flex justify-between lg:flex-row flex-col lg:mx-20 mx-3 py-6">
                <p className="text-gray-600 dark:text-dark-brown text-base text-balance">
                    All rights reserved. ©
                </p>
                <p className="font-black text-base text-balance">
                    <a
                        href="https://www.linkedin.com/in/saalimaraf/"
                        className="text-blue-950 dark:text-black font-bold"
                    >
                        <span className="text-primary dark:text-dark-brown font-bold">ParallaX</span>{" "}
                        <span className="text-gray-900 dark:text-brown-secondary font-bold">Crafts</span>{" "}
                        | Saalim Araf
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
