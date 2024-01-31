import { createBrowserRouter, RouterProvider, useLocation, useNavigate } from "react-router-dom"
import { ComponentsRoute } from "./ComponentsRoute"
import { LogInRoute } from "./LogInRoute"
import { observer } from "mobx-react-lite"
import { AuthService } from "../services"
import { HomeRoute } from "./HomeRoute"
import { useEffect } from "react"
import { AdminRoute } from "./AdminRoute"
import { ProfileRoute } from "./ProfileRoute"
import { DashboardRoute } from "./DashboardRoute"

/**
 * Navigates back
 */
const NotFoundRoute = observer(() => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        navigate(location.pathname.slice(0, location.pathname.lastIndexOf("/")))
    }, [location.pathname])

    return <div>Navigating...</div>
})

export const AppRoute = observer(() => {
    let router: ReturnType<typeof createBrowserRouter>

    if (AuthService.isLoggedIn) {
        router = createBrowserRouter([
            {
                path: "",
                element: <HomeRoute />,
                errorElement: <NotFoundRoute />,
                children: [
                    {
                        path: "components",
                        element: <ComponentsRoute />,
                    },
                    {
                        path: "",
                        element: <DashboardRoute />,
                    },
                    {
                        path: "profile",
                        element: <ProfileRoute />,
                    },
                    AuthService.isAdmin
                        ? {
                              path: "example",
                              element: <AdminRoute />,
                          }
                        : {},
                ],
            },
        ])
    } else {
        router = createBrowserRouter([
            {
                path: "",
                element: <LogInRoute />,
                errorElement: <NotFoundRoute />,
            },
        ])
    }

    return <RouterProvider router={router} />
})
