import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/FunctionalComponents/Loader";
import axios from "axios";
import ReactStars from "react-stars";
import { FaRegEdit } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import useDocumentTitle from "../utils/dynamicTitle";

const ItemsInCategory = () => {
    const category = useParams().name;
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useDocumentTitle(`${category} | ParallaX Crafts`);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsLoading(true);
        axios
            .get(
                `https://parallax-crafts.vercel.app/category/items/${category}`
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [category]);

    useDocumentTitle(`${category} | ParallaX Crafts`);

    return (
        <>
            {isLoading ? (
                <div className="w-full h-dvh flex justify-center items-center z-50">
                    {<Loader />}
                </div>
            ) : (
                <>
                    <section className="transition duration-300 pt-32 bg-accent dark:bg-dark-brown h-full dark:text-brown-accent">
                        <h1 className="text-3xl text-center font-medium">
                            Items in{" "}
                            <span className="text-primary font-bold capitalize">
                                {category}
                            </span>
                        </h1>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
                            {items.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-secondary dark:bg-brown-secondary dark:text-dark-brown p-5 rounded-lg shadow-lg flex flex-col gap-3 justify-between"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.item_name}
                                        className="rounded-xl h-[210px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />
                                    <div className="flex flex-col justify-between space-y-2">
                                        <h2 className="text-xl font-bold">
                                            {item.item_name}
                                        </h2>
                                        <p className="text-lg font-medium">
                                            $ {item.price}
                                        </p>
                                        <p className="text-lg font-medium">
                                            {item.short_description.length > 80
                                                ? `${item.short_description.slice(
                                                      0,
                                                      80
                                                  )}...`
                                                : item.short_description}
                                        </p>
                                        <a className="rating">
                                            <ReactStars
                                                count={5}
                                                value={Number(item?.rating)}
                                                size={24}
                                                color1={"#ffffff"}
                                                color2={"#FFAE00"}
                                                edit={false}
                                            />
                                        </a>

                                        <Link
                                            to={`/category/${item?.subcategory_name}`}
                                        >
                                            <p className="font-medium">
                                                Category:{" "}
                                                <span className="border-b-2 border-primary hover:text-primary mb-3">
                                                    {item?.subcategory_name}
                                                </span>
                                            </p>
                                        </Link>
                                        <div className="flex gap-5 lg:items-center font-medium my-2 flex-col lg:flex-row">
                                            <p className="flex gap-3 items-center">
                                                <FaRegEdit className="text-primary dark:text-dark-brown text-2xl" />
                                                {item?.customization}
                                            </p>
                                            <p className="flex gap-3 items-center">
                                                <TbTruckDelivery className="text-primary dark:text-dark-brown text-2xl" />
                                                {item?.processing_time}
                                            </p>
                                            <p className="flex gap-3 items-center">
                                                <BsBoxSeam className="text-primary dark:text-dark-brown text-2xl" />
                                                {item?.stock_status}
                                            </p>
                                        </div>
                                        <Link to={`/items/${item._id}`}>
                                            <button className="mt-6 bg-primary dark:bg-brown-accent dark:text-dark-brown text-accent py-2 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-full font-bold">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default ItemsInCategory;
