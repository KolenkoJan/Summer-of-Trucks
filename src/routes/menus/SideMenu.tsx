import { observer } from "mobx-react-lite"
import "./SideMenu.scss"
import { NavLink } from "react-router-dom"
import { Text } from "../../components/typography/Text"
import { AuthService } from "../../services"
import { SideMenuNavLink } from "./SideMenuNavLink"

interface ISideMenuProps {
    isSideMenuVisible?: boolean
}

export const SideMenu: React.FC<ISideMenuProps> = observer(({ isSideMenuVisible }) => {
    const isSideMenuVisibleClass = isSideMenuVisible ? "visible" : "hidden"

    return (
        <div className={`side-menu ${isSideMenuVisibleClass}`}>
            <ul className="list-items">
                <li>
                    <SideMenuNavLink to="/" textClassName="text-hover" color="text-secondary" variant="body-s">
                        Dashboard
                    </SideMenuNavLink>
                </li>
                <li>
                    <SideMenuNavLink to="/components" textClassName="text-hover" color="text-secondary" variant="body-s">
                        Components
                    </SideMenuNavLink>
                </li>
                {AuthService.isAdmin && (
                    <li>
                        <SideMenuNavLink to="/example" textClassName="text-hover" color="text-secondary" variant="body-s">
                            Example
                        </SideMenuNavLink>
                    </li>
                )}
                <li>
                    <SideMenuNavLink to="/profile" textClassName="text-hover" color="text-secondary" variant="body-s">
                        Profile
                    </SideMenuNavLink>
                </li>
            </ul>
        </div>
    )
})
