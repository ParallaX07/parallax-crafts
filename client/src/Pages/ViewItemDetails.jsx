import axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/FunctionalComponents/Loader";
import ReactStars from "react-stars";
import { Tooltip } from "react-tooltip";
import { FaRegHeart, FaRegEdit } from "react-icons/fa";
import useDocumentTitle from "../utils/dynamicTitle";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";

const Error404 = lazy(() => import("../components/Error404"));

const ViewItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useDocumentTitle(`${item?.item_name} | ParallaX Crafts`);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsLoading(true);
        axios
            .get(`https://parallax-crafts.vercel.app/item/${id}`)
            .then((res) => {
                setItem(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [id]);

    if (!item && !isLoading) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Error404 />
            </Suspense>
        );
    }

    return (
        <section className="transition duration-300 mt-20 bg-accent h-full dark:bg-dark-brown">
            {isLoading ? (
                <div className="w-full h-dvh flex justify-center items-center z-50">
                    {<Loader />}
                </div>
            ) : (
                <>
                    <div className="flex lg:flex-row flex-col mx-3 py-10 px-8 gap-10 dark:text-brown-accent">
                        <div className=" lg:max-h-dvh lg:min-w-[50%] lg:max-w-[50%] min-w-full -mx-7 lg:-mx-0 p-2">
                            <img
                                src={item?.image}
                                alt={item?.item_name}
                                className="object-cover rounded-2xl lg:max-h-dvh"
                            />
                        </div>
                        <div className="space-y-7">
                            <h2 className="text-3xl font-bold">
                                {item?.item_name}
                            </h2>
                            <p className="font-medium text-base">
                                {item?.short_description}
                            </p>
                            <hr className="border-t-2 border-primary my-5" />
                            <p></p>
                            <a className="rating">
                                <ReactStars
                                    count={5}
                                    value={Number(item?.rating)}
                                    size={24}
                                    color1={"#EDE6D8"}
                                    color2={"#FFAE00"}
                                    edit={false}
                                />
                            </a>
                            <p className="text-lg font-medium text-primary">
                                $ {item?.price}
                            </p>
                            <hr className="border-t-2 border-primary my-5" />
                            <p className="flex gap-3 items-center">
                                <FaRegHeart className="text-primary text-2xl" />{" "}
                                Add to WishList
                            </p>
                            <Link to={`/category/${item?.subcategory_name}`}>
                                <p className="font-medium">
                                    Category:{" "}
                                    <span className="border-b-2 border-primary dark:hover:text-accent hover:text-primary">
                                        {item?.subcategory_name}
                                    </span>
                                </p>
                            </Link>
                            <hr className="border-t-2 border-primary my-5" />
                            <div className="flex gap-5 lg:items-center font-medium flex-col lg:flex-row">
                                <p className="flex gap-3 items-center">
                                    <FaRegEdit className="text-primary text-2xl" />
                                    {item?.customization}
                                </p>
                                <p className="flex gap-3 items-center">
                                    <TbTruckDelivery className="text-primary text-2xl" />
                                    {item?.processing_time}
                                </p>
                                <p className="flex gap-3 items-center">
                                    <BsBoxSeam className="text-primary text-2xl" />
                                    {item?.stock_status}
                                </p>
                            </div>
                            <hr className="border-t-2 border-primary my-5" />
                            <div className="w-full flex flex-col justify-center text-center">
                                <p className="text-primary font-bold">
                                    Added by
                                </p>
                                <div className="flex w-full gap-1 mt-3 items-center">
                                    <hr className="border-t-2 border-primary my-5 w-4/5" />
                                    <a className="profileImage">
                                        <img
                                            className="min-w-16 min-h-16 max-w-16 rounded-full"
                                            src={item?.user_image}
                                            alt=""
                                        />
                                    </a>
                                    <hr className="border-t-2 border-primary my-5 w-4/5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <Tooltip
                anchorSelect=".rating"
                place="left"
                style={{
                    backgroundColor: "rgba(177, 139, 94, 1)",
                    color: "rgb(255, 255, 255)",
                    borderColor: "rgba(177, 139, 94, 1)",
                    borderWidth: "2px",
                    fontWeight: "700",
                }}
            >
                {item?.rating}
            </Tooltip>
        </section>
    );
};

export default ViewItemDetails;
