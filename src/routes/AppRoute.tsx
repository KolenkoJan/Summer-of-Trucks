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
                <>
                    <div>
                        <Header isSideMenuVisible={toggleSideMenu} />
                    </div>
                    <div className="flex-layout">
                        <SideMenu isSideMenuVisible={isSideMenuVisible} />
                        <Outlet />
                    </div>
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
    return <RouterProvider router={router} />
}
