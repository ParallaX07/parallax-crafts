import "./HomeBodyBanner.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Scrollbar } from "swiper/modules";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const breakpoints = {
    640: {
        slidesPerView: 1, // Show only one slide on smaller screens
        spaceBetween: 10, // Add some spacing between slides
    },
    // Up to 1024px (tablets)
    1024: {
        slidesPerView: 3, // Show two slides on medium-sized screens
        spaceBetween: 40, // Increase spacing for better visibility
    },
};

const HomeBannerCard = ({ item }) => {
    return (
        <div className="h-[500px] button-container transition duration-300">
            <img
                src={item.image}
                alt={item.item_name}
                loading="lazy"
                className="object-cover rounded-2xl border-primary dark:border-brown-secondary border-4"
            />
            <Link to={`/items/${item._id}`}><button className="px-7 py-2 hover:bg-accent dark:bg-brown-secondary bg-secondary text-primary dark:text-dark-brown border-primary dark:border-dark-brown border-2 font-bold">View Details</button></Link>
        </div>
    );
};

HomeBannerCard.propTypes = {
    item: PropTypes.object.isRequired,
};

const HomeBodyBanner = ({ items }) => {
    return (
        <Swiper
            scrollbar={{ hide: false }}
            loop={true}
            breakpoints={breakpoints}
            modules={[Scrollbar, Navigation, Pagination]}
            className="mySlider"
            pagination={{
                clickable: true,
            }}
        >
            {items.map((item) => (
                <SwiperSlide key={item._id}>
                    <HomeBannerCard item={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

HomeBodyBanner.propTypes = {
    items: PropTypes.array.isRequired,
};

export default HomeBodyBanner;
