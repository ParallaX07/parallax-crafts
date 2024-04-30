import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const sortItems = (items, sortBy, sortOrder) => {
    return [...items].sort((a, b) => {
        if (!sortBy) return 0;
        if (sortBy === "price") {
            const priceA = parseFloat(a[sortBy].replace("$", ""));
            const priceB = parseFloat(b[sortBy].replace("$", ""));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        } else {
            return sortOrder === "asc"
                ? a[sortBy].localeCompare(b[sortBy])
                : b[sortBy].localeCompare(a[sortBy]);
        }
    });
};

const TableView = ({items}) => {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = useCallback(
        (column) => {
            if (sortBy === column) {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
                setSortBy(column);
                setSortOrder("asc");
            }
        },
        [sortBy, sortOrder]
    );

    const sortedItems = useMemo(
        () => sortItems(items, sortBy, sortOrder),
        [items, sortBy, sortOrder]
    );

    const showFullImage = (image) => {
        const fullImage = document.createElement("div");
        fullImage.classList.add(
            "fixed",
            "top-0",
            "left-0",
            "w-full",
            "h-full",
            "bg-black",
            "bg-opacity-80",
            "z-50",
            "flex",
            "justify-center",
            "items-center"
        );
        fullImage.innerHTML = `<img src="${image}" alt="Full Image" class="max-h-full max-w-full object-contain" />`;
        fullImage.addEventListener("click", () => {
            fullImage.remove();
        });
        document.body.appendChild(fullImage);
    };

    return (
        <table className=" border-x-2 border-t-2 w-fit border-primary dark:border-brown-accent table-auto overflow-auto hidden lg:block my-10 rounded-lg transition duration-300">
            <thead className="">
                <tr className="text-left font-medium text-xl dark:text-dark-brown dark:bg-brown-accent bg-primary text-accent">
                    <th className="px-4 py-2">Image</th>
                    <th
                        className="px-4 py-2 cursor-pointer"
                        onClick={() => handleSort("item_name")}
                    >
                        Item{" "}
                        {sortBy === "item_name" && (
                            <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                        )}
                    </th>
                    <th
                        className="px-4 py-2 cursor-pointer"
                        onClick={() => handleSort("subcategory_name")}
                    >
                        Category{" "}
                        {sortBy === "subcategory_name" && (
                            <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                        )}
                    </th>
                    <th
                        className="px-4 py-2 cursor-pointer"
                        onClick={() => handleSort("price")}
                    >
                        Price{" "}
                        {sortBy === "price" && (
                            <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                        )}
                    </th>
                    <th
                        className="px-4 py-2 cursor-pointer"
                        onClick={() => handleSort("stock_status")}
                    >
                        Stock Status{" "}
                        {sortBy === "stock_status" && (
                            <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                        )}
                    </th>
                    <th className="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody className=" text-lg dark:text-brown-accent">
                {sortedItems.map((item, index) => (
                    <tr
                        key={item._id}
                        className={`border-b-2 border-primary dark:border-brown-accent ${index % 2 === 0 ? 'bg-accent dark:bg-dark-brown' : 'bg-secondary dark:bg-dark-brown'}`}
                    >
                        <td className="px-4 py-2">
                            <img
                                src={item.image}
                                alt={item.item_name}
                                className="w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer hover:scale-110 transition-transform duration-500 ease-in-out"
                                onClick={() => showFullImage(item.image)}
                            />
                        </td>
                        <td className="px-4 py-2">{item.item_name}</td>
                        <td className="px-4 py-2">{item.subcategory_name}</td>
                        <td className="px-4 py-2">$ {item.price}</td>
                        <td className="px-4 py-2">{item.stock_status}</td>
                        <td className="">
                            <Link
                                to={`/items/${item._id}`}
                                className="bg-primary text-accent dark:bg-brown-accent dark:text-dark-brown py-2 px-4 mr-3 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-full font-bold"
                            >
                                View Details
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

TableView.propTypes = {
    items: PropTypes.array.isRequired,
};

export default TableView;
