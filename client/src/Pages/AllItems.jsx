import { Suspense, lazy, useContext, useEffect, useState } from "react";
import useDocumentTitle from "../utils/dynamicTitle";
import Loader from "../components/FunctionalComponents/Loader";
import axios from "axios";
import { MessageContext } from "./Root";
import { useMediaQuery } from "react-responsive";
const ItemCard = lazy(() => import('../components/ItemCard'));
const TableView = lazy(() => import('../components/TableView'));

const AllItems = () => {
    useDocumentTitle("All Craft Items | ParallaX Crafts");

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);

    const { notifyError } = useContext(MessageContext);
    const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsLoading(true);
        axios
            .get("https://parallax-crafts.vercel.app/allItems")
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                notifyError("Failed to fetch items!");
            });
    }, []);

    

    return (
        <section className="mt-20 dark:bg-dark-brown h-full mx-3 flex flex-col justify-center items-center">
            {isLoading ? (
                <div className="w-full h-dvh bg-white dark:bg-dark-brown flex justify-center items-center z-50">
                    {<Loader />}
                </div>
            ) : (
                <>
                    {isLargeScreen ? (
                        <Suspense fallback={<Loader/>}>
                            <TableView items={items} />
                        </Suspense>
                    ) : (
                        <Suspense fallback={<Loader/>}>
                            <div className="w-full lg:hidden grid grid-cols-1 gap-10 py-10">
                                {items.map((item) => (
                                    <ItemCard key={item._id} item={item} />
                                ))}
                            </div>
                        </Suspense>
                    )}
                </>
            )}
        </section>
    );
};

export default AllItems;
