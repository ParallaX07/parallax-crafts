import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
    return (
        <div className="transition duration-300 bg-secondary dark:bg-brown-secondary p-5 rounded-lg shadow-lg flex dark:text-dark-brown lg:flex-row flex-col gap-3">
            <img
                src={item.image}
                alt={item.item_name}
                className="rounded-xl max-h-[210px] md:min-w-[210px] object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="flex flex-col justify-between">
                <h2 className="text-xl font-bold ">{item.item_name}</h2>
                <p className="text-lg font-medium">$ {item.price}</p>
                <p className="text-lg font-medium">
                    {item.short_description.length > 80
                        ? `${item.short_description.slice(0, 80)}...`
                        : item.short_description}
                </p>
                
                <Link to={`/items/${item._id}`}>
                    <button className="mt-6 bg-primary text-accent dark:bg-brown-accent dark:text-dark-brown py-2 px-6 rounded-md shadow-md hover:bg-opacity-80 transition duration-300 w-full font-bold">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
};
export default ItemCard;
