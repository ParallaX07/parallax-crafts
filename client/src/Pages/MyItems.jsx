import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Loader from "../components/FunctionalComponents/Loader";
import UpdateItemCard from "../components/UpdateItemCard";
import Swal from "sweetalert2";
import { MessageContext } from "./Root";
import useDocumentTitle from "../utils/dynamicTitle";

const MyItems = () => {
    const [items, setItems] = useState([]);
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const { notifyError, notifySuccess } = useContext(MessageContext);

    useDocumentTitle("My Items | ParallaX Crafts");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsLoading(true);
        const url =
            filter === "all"
                ? `https://parallax-crafts.vercel.app/items/${user?.email}`
                : `https://parallax-crafts.vercel.app/items/${user?.email}/${filter}`;
        axios
            .get(url)
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                Swal.fire("Error", err, "error");
                setIsLoading(false);
            });
    }, [filter]);

    const deleteItem = (itemToDelete) => {
        //ask for confirmation
        Swal.fire({
            title: `Do you want to delete the item?`,
            showDenyButton: true,
            confirmButtonText: "Yes, delete it",
            denyButtonText: `No, don't delete`,
            icon: "question",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setIsLoading(true);
                axios
                    .delete(
                        `https://parallax-crafts.vercel.app/item/${itemToDelete._id}`
                    )
                    .then(() => {
                        const newItems = items.filter(
                            (item) => item._id !== itemToDelete._id
                        );
                        setItems(newItems);
                        setIsLoading(false);
                    })
                    .catch(() => {
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
                            (cat) => cat.name === itemToDelete.subcategory_name
                        );

                        if (!categoryToUpdate) {
                            throw new Error("Category not found");
                        }

                        const newQuantity = categoryToUpdate.quantity - 1;

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
                            throw new Error(
                                "Failed to update category quantity"
                            );
                        }
                        notifySuccess(
                            "Category quantity updated successfully!"
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        notifyError(error.message);
                    });

                Swal.fire("Item deleted!", "", "success");
            } else if (result.isDenied) {
                return;
            }
        });
    };

    return (
        <section className="transition duration-300 pt-28 bg-accent dark:bg-dark-brown h-full">
            <div className="border-2 border-primary dark:border-brown-accent bg-accent dark:bg-dark-brown p-4 mx-3 lg:mx-10 flex justify-between flex-col lg:flex-row text-lg">
                <p className="font-bold dark:text-brown-secondary">
                    Welcome{" "}
                    <span className="text-primary font-extrabold">
                        {user.displayName}
                    </span>
                    , your items are shown below
                </p>
                <div className="flex gap-2 items-center">
                    <p className="font-bold dark:text-brown-secondary">Filter by customization: </p>
                    <select
                        name="filter"
                        id=""
                        className="rounded-xl p-1 font-medium"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
            {isLoading ? (
                <div className="w-full h-dvh bg-accent dark:bg-dark-brown flex justify-center items-center z-50">
                    {<Loader />}
                </div>
            ) : (
                <>
                    {items.length === 0 ? (
                        <p className="font-bold text-primary w-full text-center h-[calc(100dvh-200px)] justify-center items-center flex text-4xl ">
                            No items for this customization
                        </p>
                    ) : (
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mx-3 lg:mx-10 mt-5">
                            {items.map((item) => (
                                <UpdateItemCard
                                    key={item._id}
                                    item={item}
                                    deleteItem={deleteItem}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default MyItems;
