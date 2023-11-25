import React from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider, useRouteError, Outlet } from "react-router-dom"
import { AdminRoute, ProfileRoute, SideMenuRoute } from "@src/routes"
import "./Main.scss"
import "./theme/ThemeDefault.scss"
import "./theme/Theme.scss"
// import "./Theme.scss"

export default function ErrorPage() {
    const error = useRouteError()

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{(error as { statusText: string })?.statusText || (error as { message: string })?.message}</i>
            </p>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "",
        element: (
            <>
                <SideMenuRoute />
                <Outlet />
            </>
        ),
        children: [
            {
                path: "dashboard",
                element: <AdminRoute />,
            },
            {
                path: "profile",
                element: <ProfileRoute />,
            },
        ],
    },
])

const root = createRoot(document.getElementById("root"))

root.render(<RouterProvider router={router} fallbackElement={<ErrorPage />} />)
