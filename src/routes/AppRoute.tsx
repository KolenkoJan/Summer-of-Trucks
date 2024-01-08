import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { AdminRoute } from "./AdminRoute"
import { ProfileRoute } from "./ProfileRoute"
import { SideMenu } from "./menus/SideMenu"
import { Header } from "../components/header/Header"
import { useState } from "react"

export const AppRoute = () => {
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false)

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible)
    }

    const router = createBrowserRouter([
        {
            path: "",
            element: (
                <div className="flex-container">
                    <Header isSideMenuVisible={toggleSideMenu} />
                    <div className="flex">
                        <SideMenu isSideMenuVisible={isSideMenuVisible} />
                        <Outlet />
                    </div>
                </div>
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

    return <RouterProvider router={router} />
}
