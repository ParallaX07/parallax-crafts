import { IoMdLogOut } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../Pages/Root";
import { FaUserAstronaut } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../utils/ThemeContext";

const NavBar = () => {
    const active = "text-primary dark:text-brown-accent";
    const inactive = "hover:text-primary dark:hover:text-brown-accent";

    const { user, logout, loading } = useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const handleLogout = async () => {
        try {
            await logout();
            notifySuccess("Logged out successfully");
        } catch (error) {
            notifyError("An error occurred. Please try again later.");
        }
    };

    /**
     * Represents the logged out state of the Navbar component.
     * @type {JSX.Element}
     */
    const loggedOutState = (
        <>
            <div className="gap-2 items-center lg:flex hidden">
                <FaUserAstronaut className="text-primary" />
                <NavLink
                    to="/register"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Register
                </NavLink>
                <p>/</p>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Login
                </NavLink>
            </div>
        </>
    );

    /**
     * Represents the logged-in state of the Navbar component.
     * @returns {JSX.Element} The JSX element representing the logged-in state.
     */
    const loggedInState = (
        <>
            <div className="flex gap-2 items-center">
                <a className="profileImage" href="/update-profile">
                        <img
                            className="size-12 rounded-full"
                            src={user?.photoURL}
                            alt=""
                        />
                </a>

                <button
                    onClick={handleLogout}
                    className="lg:py-2 lg:px-3 rounded-full bg-primary text-primary bg-opacity-20 border-primary border-2 hidden lg:flex items-center gap-2"
                >
                    <IoMdLogOut className="size-6" /> Logout
                </button>
            </div>
        </>
    );

    const [dropDown, setDropDown] = useState(false);

    /**
     * Toggles the dropdown state.
     */
    const handleDropDown = () => {
        setDropDown(!dropDown);
    };

    useEffect(() => {
        /**
         * Handles the click event outside of the dropdown and hamburger elements.
         * If the click is outside and the dropdown is open, it closes the dropdown.
         * @param {Event} event - The click event object.
         */
        const handleClickOutside = (event) => {
            if (
                dropDown &&
                event.target.closest(".dropdown") === null &&
                event.target.closest(".hamburger") === null
            ) {
                setDropDown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropDown]);

    const loadingSkeleton = (
        <div className="flex gap-2 items-center animate-pulse">
            <div className="profileImage bg-gray-200 rounded-full h-12 w-12 dark:bg-white"></div>
            <button className="lg:py-2 lg:px-3 rounded-full bg-gray-200 text-gray-200 dark:text-white bg-opacity-20 border-gray-200 dark:border-white border-2 hidden lg:flex items-center gap-2">
                <div className="h-6 w-6 bg-gray-200 dark:bg-white rounded-full"></div>
                Getting info
            </button>
        </div>
    );

    const navItems = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-items"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    All Items
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/add-item"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Add Item
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/my-items"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    My Items
                </NavLink>
            </li>
        </>
    );

    return (
        <header className="flex fixed w-full top-0 z-50 custom-shadow bg-white font-poppins dark:bg-dark-brown transition duration-300 dark:text-brown-secondary">
            <nav className="lg:px-5 px-3 py-2 flex justify-between text-sm items-center lg:text-lg font-extrabold w-full border-2">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        className="lg:size-16 size-14"
                        src="https://i.ibb.co/VSL8zbg/6a08ae6a-c5ce-4b92-bcb6-0ad129c2b8d3-modified.png"
                        alt="logo"
                    />
                    <div>
                        <h1 className="text-primary transition duration-300 dark:text-brown-secondary text-lg lg:text-2xl font-black flex lg:flex-row flex-col lg:gap-2">
                            ParallaX{" "}
                            <span className="text-black dark:text-brown-accent">
                                Crafts
                            </span>
                        </h1>
                        <p className="text-gray-400 dark:text-primary text-xs lg:text-sm font-extrabold">
                            HANDCRAFT
                        </p>
                    </div>
                </Link>
                <ul className="hidden lg:flex gap-4">{navItems}</ul>{" "}
                <div className="flex items-center gap-3 relative">
                    {loading
                        ? loadingSkeleton
                        : user
                        ? loggedInState
                        : loggedOutState}{" "}
                    {/* right most element */}
                    <TiThMenu
                        onClick={handleDropDown}
                        className="lg:hidden flex size-6 text-primary dark:text-brown-secondary hamburger"
                    />
                    <div
                        className={`dropdown ${
                            dropDown ? "flex" : "hidden"
                        } absolute top-6 right-1 rounded-lg bg-white dark:bg-dark-brown py-3 px-5 font-medium border border-primary dark:border-brown-secondary w-44 z-10`}
                    >
                        <ul className="flex flex-col gap-3 font-medium text-lg">
                            {navItems}
                            {user ? (
                                <li
                                    onClick={handleLogout}
                                    className="flex gap-2 items-center"
                                >
                                    <IoMdLogOut className="text-primary dark:text-brown-secondary" />
                                    Logout
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `${active}`
                                                    : `${inactive}`
                                            }
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `${active}`
                                                    : `${inactive}`
                                            }
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="w-12 h-12 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
                    </label>
                </div>
            </nav>
            <Tooltip
                anchorSelect=".profileImage"
                place="top"
                style={{
                    backgroundColor: "rgba(177, 139, 94, 1)",
                    color: "rgb(255, 255, 255)",
                    borderColor: "rgba(177, 139, 94, 1)",
                    borderWidth: "2px",
                    fontWeight: "700",
                }}
            >
                {user?.displayName}
            </Tooltip>
        </header>
    );
};

export default NavBar;
