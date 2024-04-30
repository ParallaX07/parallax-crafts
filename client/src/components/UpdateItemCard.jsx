import PropTypes from "prop-types";
import { BsBoxSeam } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const UpdateItemCard = ({ item, deleteItem }) => {


    return (
        <div className="transition duration-300 bg-secondary dark:bg-brown-secondary p-5 rounded-lg shadow-lg flex flex-col gap-3 dark:text-dark-brown">
            <img
                src={item.image}
                alt={item.item_name}
                className="rounded-xl h-[210px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="flex flex-col justify-between space-y-2">
                <h2 className="text-xl font-bold">{item.item_name}</h2>
                <p className="text-lg font-medium">$ {item.price}</p>
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
                <Link to={`/category/${item?.subcategory_name}`}>
                    <p className="font-medium">
                        Category:{" "}
                        <span className="border-b-2 border-primary dark:border-brown-accent dark:hover:text-brown-accent hover:text-primary mb-3">
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
                <Link to={`/update/item/${item._id}`}>
                    <button className="mt-6 bg-primary dark:bg-brown-accent dark:text-dark-brown text-accent py-2 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-full font-bold">
                        Update Item
                    </button>
                </Link>
                <button onClick={()=> deleteItem(item)} className="mt-6 bg-red-500 dark:bg-red-700 text-accent dark:text-dark-brown py-2 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-full font-bold">
                    Delete Item
                </button>
            </div>
        </div>
    );
};

UpdateItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
};

export default UpdateItemCard;
