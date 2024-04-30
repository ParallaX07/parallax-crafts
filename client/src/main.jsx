import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import AuthProvider from "./Auth/AuthProvider";
import PrivateRoute from "./Auth/PrivateRoute";
import { lazy } from "react";

const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const AddItem = lazy(() => import("./Pages/AddItem"));
const AllItems = lazy(() => import("./Pages/AllItems"));
const ViewItemDetails = lazy(() => import("./Pages/ViewItemDetails"));
const MyItems = lazy(() => import("./Pages/MyItems"));
const HomeBody = lazy(() => import("./components/HomeBody"));
const ItemsInCategory = lazy(() => import("./Pages/ItemsInCategory"));
const UpdateItem = lazy(() => import("./Pages/UpdateItem"));
const UpdateProfile = lazy(() => import("./Pages/UpdateProfile"));
const Error404 = lazy(() => import("./components/Error404"));

import { ThemeProvider } from "./utils/ThemeContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <HomeBody />
                    </Suspense>
                ),
            },
            {
                path: "/all-items",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AllItems />
                    </Suspense>
                ),
            },
            {
                path: "/items/:id",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ViewItemDetails />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/add-item",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <AddItem />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/login",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "/register",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: "/my-items",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <MyItems />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/update/item/:id",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <UpdateItem />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
            {
                path: "/category/:name",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <ItemsInCategory />
                    </Suspense>
                ),
            },
            {
                path: "/update-profile",
                element: (
                    <PrivateRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <UpdateProfile />
                        </Suspense>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);
