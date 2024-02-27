import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Header } from "../components/header/Header"
import { SideMenu } from "./menus/SideMenu"
import { Outlet } from "react-router-dom"

export const HomeRoute: React.FC = observer(() => {
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(false)

    return (
        <div className="flex flex-1 flex-column overflow-auto">
            <Header isSideMenuVisible={() => setIsSideMenuVisible(!isSideMenuVisible)} />
            <div className="flex flex-1 overflow-auto">
                <SideMenu isSideMenuVisible={isSideMenuVisible} toggleSideMenuOnSelect={() => setIsSideMenuVisible(!isSideMenuVisible)} />
                <Outlet />
            </div>
        </div>
    )
})
