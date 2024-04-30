import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import notFoundAnimation from "../assets/notFound.json";

const Error404 = () => {
    return (
        <section className="mt-20 bg-accent h-full">
            <div className="bg-white justify-center items-center z-50 flex flex-col">
                <Lottie
                    animationData={notFoundAnimation}
                    loop={true}
                    style={{ maxHeight: "500px", maxWidth: "500px" }}
                />

                <Link
                    to="/"
                    className="text-accent font-bold text-lg px-4 py-2 bg-primary rounded-lg"
                >
                    Go to Home
                </Link>
            </div>
        </section>
    );
};

export default Error404;
