import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { AdminRoute } from "./AdminRoute"
import { ProfileRoute } from "./ProfileRoute"
import { SideMenuRoute } from "./SideMenuRoute"
import { Avatar } from "@src/components/other/Avatar"

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
                index: true,
                element: <AdminRoute />,
            },
            {
                path: "profile",
                element: <ProfileRoute />,
            },
        ],
    },
])

export const AppRoute = () => {
    return <RouterProvider router={router} />
}
