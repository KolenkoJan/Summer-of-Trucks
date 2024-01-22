import { observer } from "mobx-react-lite"
import "./SideMenu.scss"
import { AuthService } from "../../services"
import { SideMenuNavLink } from "./SideMenuNavLink"
import { useState } from "react"

export interface ISideMenuProps {
    isSideMenuVisible?: boolean
}

export const SideMenu: React.FC<ISideMenuProps> = observer(({ isSideMenuVisible }) => {
    const isSideMenuVisibleClass = isSideMenuVisible ? "visible" : "hidden"

    return (
        <div className={`side-menu ${isSideMenuVisibleClass}`}>
            <ul className="list-items">
                <li>
                    <SideMenuNavLink to="/">Dashboard</SideMenuNavLink>
                </li>
                <li>
                    <SideMenuNavLink to="/components">Components</SideMenuNavLink>
                </li>
                {AuthService.isAdmin && (
                    <li>
                        <SideMenuNavLink to="/example">Example</SideMenuNavLink>
                    </li>
                )}
                <li>
                    <SideMenuNavLink to="/profile">Profile</SideMenuNavLink>
                </li>
            </ul>
        </div>
    )
})
