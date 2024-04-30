import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import { MessageContext } from "./Root";
import Loader from "../components/FunctionalComponents/Loader";
import useDocumentTitle from "../utils/dynamicTitle";

const AddItem = () => {
    const { user } = useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(false);

    useDocumentTitle("Add New Craft Item | ParallaX Crafts");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleAddItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = formData.get("image");
        const item_name = formData.get("item_name");
        const subcategory_name = formData.get("subcategory_name");
        const price = formData.get("price");
        const rating = formData.get("rating");
        const customization = formData.get("customization");
        const processing_time = formData.get("processing_time");
        const stock_status = formData.get("stock_status");
        const user_email = user?.email;
        const user_name = user?.displayName;
        const short_description = formData.get("short_description");
        const user_image = user?.photoURL;

        if (isNaN(price) || isNaN(rating)) {
            notifyError("Price and rating must be numbers");
            return;
        }

        const item = {
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
            user_image,
        };

        setIsLoading(true);
        // Add item to the database
        axios
            .post("https://parallax-crafts.vercel.app/allItems", item)
            .then(() => {
                notifySuccess("Item added successfully!");
                setIsLoading(false);
                e.target.reset();
            })
            .catch(() => {
                notifyError("Failed to add item!");
                setIsLoading(false);
            });

        //update category quantity
        axios
            .get("https://parallax-crafts.vercel.app/allcategories")
            .then((response) => {
                if (!response.data) {
                    throw new Error("Failed to fetch categories");
                }
                const categories = response.data;
                const categoryToUpdate = categories.find(
                    (cat) => cat.name === subcategory_name
                );

                if (!categoryToUpdate) {
                    throw new Error("Category not found");
                }

                const newQuantity = categoryToUpdate.quantity + 1;

                const updatedCategory = {
                    ...categoryToUpdate,
                    quantity: newQuantity,
                };

                return axios.patch(
                    `https://parallax-crafts.vercel.app/allCategories/${categoryToUpdate._id}`,
                    updatedCategory,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            })
            .then((response) => {
                if (!response.data) {
                    throw new Error("Failed to update category quantity");
                }
                notifySuccess("Category quantity updated successfully!");
            })
            .catch((error) => {
                console.error(error);
                notifyError(error.message);
            });
    };

    return (
        <section className="transition duration-300 mt-20 bg-accent dark:bg-dark-brown lg:h-fit py-5 font-medium">
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full bg-accent dark:bg-dark-brown bg-opacity-70 flex justify-center items-center z-50">
                    {<Loader />}
                </div>
            )}
            <div className="container mx-auto px-4">
                <form
                    className=" bg-secondary dark:bg-brown-secondary shadow-md rounded-2xl p-8 text-lg"
                    onSubmit={handleAddItem}
                >
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                className="rounded-xl p-3"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">Item Name</label>
                            <input
                                type="text"
                                name="item_name"
                                className="rounded-xl p-3"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">
                                Category Name
                            </label>
                            <select
                                name="subcategory_name"
                                className="rounded-xl p-3"
                                required
                            >
                                <option value="">Select an option</option>
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
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">Rating</label>
                            <input
                                type="text"
                                name="rating"
                                className="rounded-xl p-3"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">
                                Customization
                            </label>
                            <select
                                name="customization"
                                className="rounded-xl p-3"
                                required
                            >
                                <option value="">Select an option</option>
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
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">Stock Status</label>
                            <select
                                name="stock_status"
                                className="rounded-xl p-3"
                                required
                            >
                                <option value="">Select an option</option>
                                <option value="Made to Order">
                                    Made to Order
                                </option>
                                <option value="In Stock">In Stock</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">User Email</label>
                            <input
                                type="text"
                                name="user_email"
                                className="rounded-xl p-3 bg-white cursor-not-allowed"
                                disabled
                                placeholder={user?.email}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-primary dark:text-secondary">User Name</label>
                            <input
                                type="text"
                                name="user_name"
                                className="rounded-xl p-3 bg-white cursor-not-allowed"
                                disabled
                                placeholder={user?.displayName}
                            />
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
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-6 bg-primary text-accent py-2 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-full dark:text-dark-brown font-medium"
                    >
                        Add
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddItem;
