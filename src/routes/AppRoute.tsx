import { createBrowserRouter, RouterProvider, useLocation, useNavigate } from "react-router-dom"
import { LogInRoute } from "./LogInRoute"
import { observer } from "mobx-react-lite"
import { AuthService } from "../services"
import { HomeRoute } from "./HomeRoute"
import { useEffect } from "react"
import { AdminRoute } from "./AdminRoute"
import { ProfileRoute } from "./ProfileRoute"
import { DashboardRoute } from "./DashboardRoute"
import { BackdropPage } from "../pages/BackdropPage"
import { InovaLoadingPage } from "../pages/InovaLoadingPage"
import { ScanRoute } from "./ScanRoute"

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
    const key = AuthService.authenticatedUser || AuthService.isAdminAuth ? "authenticated" : "unauthenticated"

    let router: ReturnType<typeof createBrowserRouter>

    if (AuthService.authenticatedUser || AuthService.isAdminAuth) {
        router = createBrowserRouter([
            {
                path: "/",
                element: (
                    <>
                        {AuthService.isGettingAuth || AuthService.isGettingAuthData ? <BackdropPage /> : undefined}
                        <HomeRoute />
                    </>
                ),
                errorElement: <NotFoundRoute />,
                children: [
                    {
                        path: "/",
                        element: <DashboardRoute />,
                    },
                    {
                        path: "profile",
                        element: <ProfileRoute />,
                    },
                    AuthService.isAdminAuth
                        ? {
                              path: "admin",
                              element: <AdminRoute />,
                          }
                        : {
                              path: "scan",
                              element: <ScanRoute />,
                          },
                ],
            },
        ])
    } else {
        router = createBrowserRouter([
            {
                path: "/",
                element: (
                    <>
                        {AuthService.isGettingAuthData ? <InovaLoadingPage /> : undefined}
                        <LogInRoute />
                    </>
                ),
                errorElement: <NotFoundRoute />,
            },
        ])
    }

    return <RouterProvider key={key} router={router} />
})
