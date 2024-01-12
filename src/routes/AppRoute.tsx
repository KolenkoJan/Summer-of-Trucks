import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation, useNavigate } from "react-router-dom"
import { AdminRoute } from "./AdminRoute"
import { ProfileRoute } from "./ProfileRoute"
import { SideMenu } from "./menus/SideMenu"
import { Header } from "../components/header/Header"
import { useState } from "react"
import { ProfilePage } from "../pages/ProfilePage"
import { AuthService } from "../services"

export const AppRoute = () => {
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false)
    const url = window.location.href

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible)
    }

    if (url === "http://localhost:8085/" && AuthService.isLoggedIn) {
        window.location.replace("http://localhost:8085/home")
    }

    if (url !== "http://localhost:8085/" && !AuthService.isLoggedIn) {
        window.location.replace("http://localhost:8085")
    }

    const router = createBrowserRouter([
        {
            index: true,
            path: "",
            element: <ProfilePage />,
        },
        {
            path: "home",
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
                    path: "",
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
