import { observer } from "mobx-react-lite"
import "./SideMenu.scss"
import { AuthService } from "../../services"
import { SideMenuNavLink } from "./SideMenuNavLink"

export interface ISideMenuProps {
    isSideMenuVisible?: boolean
    toggleSideMenuOnSelect?: () => void
}

export const SideMenu: React.FC<ISideMenuProps> = observer(({ isSideMenuVisible, toggleSideMenuOnSelect }) => {
    const isSideMenuVisibleClass = isSideMenuVisible ? "visible" : "hidden"

    return (
        <div className={`side-menu ${isSideMenuVisibleClass}`}>
            <ul className="list-items">
                <li>
                    <SideMenuNavLink onClick={() => toggleSideMenuOnSelect && toggleSideMenuOnSelect()} to="/">
                        Dashboard
                    </SideMenuNavLink>
                </li>
                {AuthService.authenticatedUser?.isAdmin && (
                    <>
                        <li>
                            <SideMenuNavLink onClick={() => toggleSideMenuOnSelect && toggleSideMenuOnSelect()} to="/events">
                                Events
                            </SideMenuNavLink>
                        </li>
                        <li>
                            <SideMenuNavLink onClick={() => toggleSideMenuOnSelect && toggleSideMenuOnSelect()} to="/users">
                                Users
                            </SideMenuNavLink>
                        </li>
                    </>
                )}
                <li>
                    <SideMenuNavLink onClick={() => toggleSideMenuOnSelect && toggleSideMenuOnSelect()} to="/scan">
                        Scan
                    </SideMenuNavLink>
                </li>
                <li>
                    <SideMenuNavLink onClick={() => toggleSideMenuOnSelect && toggleSideMenuOnSelect()} to="/profile">
                        Profile
                    </SideMenuNavLink>
                </li>
            </ul>
        </div>
    )
})
