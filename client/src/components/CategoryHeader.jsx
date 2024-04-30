import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CategoryHeader = ({category}) => {
    return (
        <Link to={`/category/${category.name}`}>
            <div className='flex flex-col justify-center items-center'>
                <img src={category.image} alt={category.name} loading='lazy' className='lg:size-72 hover:scale-110 hover:transition-transform size-52 object-cover rounded-full border-4 border-accent dark:border-brown-accent' />
                <p className='text-lg font-bold text-gray-600  dark:text-dark-brown mt-3'>{category.name}</p>
                <p className='italic text-base font-bold text-gray-600 dark:text-dark-brown '>{category.quantity} Products</p>
            </div>
        </Link>
    );
};

CategoryHeader.propTypes = {
    category: PropTypes.object.isRequired
};

export default CategoryHeader;