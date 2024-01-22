import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Header } from "../components/header/Header"
import { SideMenu } from "./menus/SideMenu"
import { Outlet } from "react-router-dom"

export const HomeRoute = observer(() => {
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false)

    return (
        <div className="flex-container">
            <Header isSideMenuVisible={() => setIsSideMenuVisible(!isSideMenuVisible)} />
            <div className="flex-layout">
                <SideMenu isSideMenuVisible={isSideMenuVisible} />
                <Outlet />
            </div>
        </div>
    )
})
