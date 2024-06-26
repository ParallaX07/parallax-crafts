import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "./Root";
import useDocumentTitle from "../utils/dynamicTitle";
import PasswordInput from "../components/FunctionalComponents/PasswordInput";
import Loader from "../components/FunctionalComponents/Loader";

const Login = () => {
    useDocumentTitle("Login | ParallaX Crafts");
    const { user, login, googleLogin, githubLogin, loading } =
        useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (loading) {
        return <Loader />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const passwordValue = password;

        try {
            await login(email, passwordValue);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                notifyError("User not found");
                return;
            } else if (error.code === "auth/wrong-password") {
                notifyError("Wrong password");
                return;
            } else {
                notifyError("Invalid email or password");
                return;
            }
        }

        if (!loading) {
            notifySuccess("Logged in successfully");
            navigate(location?.state ? location.state : "/");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin().then(() => {
                if (!loading) {
                    notifySuccess("Logged in successfully");
                    navigate(location?.state ? location.state : "/");
                }
            });
        } catch (error) {
            notifyError("An error occurred. Please try again later.");
        }
    };

    const handleGithubLogin = async () => {
        try {
            await githubLogin().then(() => {
                if (!loading) {
                    notifySuccess("Logged in successfully");
                    navigate(location?.state ? location.state : "/");
                }
            });
        } catch (error) {
            notifyError("An error occurred. Please try again later.");
        }
    };

    return (
        <section className="min-h-dvh w-full flex items-center justify-center mt-20 bg-[url('https://i.ibb.co/zJj4SWJ/31ef315a-a5a1-4217-901d-6e8fd6d10f55-1.jpg')] bg-contain">
            <div className="bg-secondary animate__animated animate__fadeIn xl:mx-auto xl:w-full custom-shadow p-4 xl:max-w-sm 2xl:max-w-md rounded-lg border-8 border-accent mx-3 mt-8">
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-900">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/register"
                        className="text-primary font-extrabold"
                    >
                        Register with email
                    </Link>
                </p>
                <form className="mt-2" onSubmit={(e) => handleLogin(e)}>
                    <div className="space-y-5">
                        <div>
                            <label className="text-base font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    className="flex h-10 w-full rounded-md border border-primary bg-transparent px-3 py-2 text-sm placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <PasswordInput
                                    name="password"
                                    placeholder="Password"
                                    onValueChange={(value) =>
                                        setPassword(value)
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-accent hover:bg-black/80"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
                <div className="mt-3 space-y-3">
                    <button
                        className="relative inline-flex w-full items-center justify-center rounded-md border border-secondary bg-primary px-3.5 py-2.5 font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                        type="button"
                        onClick={handleGoogleLogin}
                    >
                        <span className="mr-2 inline-block">
                            <FaGoogle className="h-6 w-6" />
                        </span>
                        Sign in with Google
                    </button>
                    <button
                        className="relative inline-flex w-full items-center justify-center rounded-md border border-secondary bg-primary px-3.5 py-2.5 font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-black"
                        type="button"
                        onClick={handleGithubLogin}
                    >
                        <span className="mr-2 inline-block">
                            <FaGithub className="h-6 w-6" />
                        </span>
                        Sign in with GitHub
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Login;
