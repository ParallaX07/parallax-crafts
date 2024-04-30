import { useContext, useEffect, useState } from "react";
import Loader from "../components/FunctionalComponents/Loader";
import { AuthContext } from "../Auth/AuthProvider";
import { MessageContext } from "./Root";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useDocumentTitle from "../utils/dynamicTitle";

const UpdateItem = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const [item, setItem] = useState(null);

    const navigate = useNavigate();

    const { id } = useParams();

    useDocumentTitle(`Update Craft Item | ParallaX Crafts`);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsLoading(true);
        axios
            .get(`https://parallax-crafts.vercel.app/item/${id}`)
            .then((res) => {
                setItem(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                notifyError("Failed to fetch item details!", err);
                setIsLoading(false);
            });
    }, []);

    // Check if the user is authorized to update the item
    useEffect(() => {
        if (item && user && user.email !== item.user_email) {
            notifyError("You are not authorized to update this item!");
            navigate("/my-items");
        }
    }, [item, user]);

    const handleUpdateItem = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const image = formData.get("image") || item?.image;
        const item_name = formData.get("item_name") || item?.item_name;
        const subcategory_name =
            formData.get("subcategory_name") || item?.subcategory_name;
        const price = formData.get("price") || item?.price;
        const rating = formData.get("rating") || item?.rating;
        const customization =
            formData.get("customization") || item?.customization;
        const processing_time =
            formData.get("processing_time") || item?.processing_time;
        const stock_status = formData.get("stock_status") || item?.stock_status;
        const user_email = formData.get("user_email") || user?.email;
        const user_name = formData.get("user_name") || user?.displayName;
        const short_description =
            formData.get("short_description") || item?.short_description;

        const updatedItem = {
            image,
            item_name,
            subcategory_name,
            price,
            rating,
            customization,
            processing_time,
            stock_status,
            user_email,
            user_name,
            short_description,
        };
        console.log(updatedItem);
        axios
            .put(`https://parallax-crafts.vercel.app/item/${id}`, updatedItem)
            .then(() => {
                notifySuccess("Item updated successfully!");
                setIsLoading(false);
                navigate(`/items/${id}`);
            })
            .catch((err) => {
                notifyError("Failed to update item!", err);
                setIsLoading(false);
            });
    };

    return (
        <section className="transiton duration-300 mt-20 bg-accent dark:bg-dark-brown lg:h-fit py-5 font-medium">
            {isLoading && (
                <div className=" w-full h-full bg-accent dark:bg-dark-brown bg-opacity-70 flex justify-center items-center z-50">
                    {<Loader />}
                </div>
            )}
            <div className="container mx-auto px-4 flex lg:flex-row flex-col justify-center gap-5">
                <div className="rounded-xl lg:w-1/3 lg:h-[calc(100dvh/2)]">
                    <Link to={`/items/${id}`}>
                        <img
                            src={item?.image}
                            alt={item?.item_name}
                            className="rounded-xl  object-contain"
                        />
                        <p className="text-3xl font-bold mt-3 border-b-2 border-transparent dark:text-brown-accent hover:border-primary hover:text-primary">{item?.item_name}</p>
                    </Link>
                </div>
                <form
                    className=" bg-secondary dark:bg-brown-secondary shadow-md rounded-2xl p-8 text-lg"
                    onSubmit={handleUpdateItem}
                >
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                className="rounded-xl p-3"
                                placeholder={item?.image}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">Item Name</label>
                            <input
                                type="text"
                                name="item_name"
                                placeholder={item?.item_name}
                                className="rounded-xl p-3"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">
                                Category Name{" "}
                                <span className="text-gray-500">
                                    ({item?.subcategory_name})
                                </span>
                            </label>
                            <select
                                name="subcategory_name"
                                className="rounded-xl p-3"
                            >
                                <option value={item?.subcategory_name}>
                                    Select an option
                                </option>
                                <option value="Clay-Made Pottery">
                                    Clay-Made Pottery
                                </option>
                                <option value="Stoneware">Stoneware</option>
                                <option value="Porcelain">Porcelain</option>
                                <option value="Terracotta">Terracotta</option>
                                <option value="Ceramics & Architectural">
                                    Ceramics & Architectural
                                </option>
                                <option value="Home Decor Pottery">
                                    Home Decor Pottery
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">Price</label>
                            <input
                                type="text"
                                name="price"
                                className="rounded-xl p-3"
                                placeholder={item?.price}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">Rating</label>
                            <input
                                type="text"
                                name="rating"
                                className="rounded-xl p-3"
                                placeholder={item?.rating}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">
                                Customization{" "}
                                <span className="text-gray-500">
                                    ({item?.customization})
                                </span>
                            </label>
                            <select
                                name="customization"
                                className="rounded-xl p-3"
                            >
                                <option value={item?.customization}>
                                    Select an option
                                </option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">
                                Processing Time
                            </label>
                            <input
                                type="text"
                                name="processing_time"
                                className="rounded-xl p-3"
                                placeholder={item?.processing_time}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">
                                Stock Status{" "}
                                <span className="text-gray-500">
                                    ({item?.stock_status})
                                </span>
                            </label>
                            <select
                                name="stock_status"
                                className="rounded-xl p-3"
                            >
                                <option value={item?.stock_status}>
                                    Select an option
                                </option>
                                <option value="Made to Order">
                                    Made to Order
                                </option>
                                <option value="In Stock">In Stock</option>
                            </select>
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="text-primary dark:text-secondary">
                            Short Description
                        </label>
                        <textarea
                            type="text"
                            name="short_description"
                            className="rounded-xl p-3"
                            placeholder={item?.short_description}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-6 bg-primary text-accent dark:bg-brown-accent dark:text-dark-brown py-2 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-full font-medium"
                    >
                        Update
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateItem;
