import { observer } from "mobx-react-lite"
import "./SideMenu.scss"
import { NavLink, useNavigate } from "react-router-dom"
import { Text } from "../../components/typography/Text"
import { AuthService } from "../../services"

interface ISideMenuProps {
    isSideMenuVisible?: boolean
}

export const SideMenu: React.FC<ISideMenuProps> = observer(({ isSideMenuVisible }) => {
    const isSideMenuVisibleClass = isSideMenuVisible ? "visible" : "hidden"

    return (
        <div className={`side-menu ${isSideMenuVisibleClass}`}>
            <ul className="list-items">
                <li>
                    <NavLink to={"/"}>
                        <Text variant="body-s" color="text-secondary" className="text-hover">
                            Dashboard
                        </Text>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/components"}>
                        <Text variant="body-s" color="text-secondary" className="text-hover">
                            Components
                        </Text>
                    </NavLink>
                </li>
                {AuthService.isAdmin && (
                    <li>
                        <NavLink to={"/example"}>
                            <Text variant="body-s" color="text-secondary" className="text-hover">
                                Example
                            </Text>
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink to={"/profile"}>
                        <Text variant="body-s" color="text-secondary" className="text-hover">
                            Profile
                        </Text>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
})
