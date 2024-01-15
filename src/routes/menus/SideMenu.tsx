import { observer } from "mobx-react-lite"
import "./SideMenu.scss"
import { useNavigate } from "react-router-dom"
import { Text } from "../../components/typography/Text"
import { AuthService } from "../../services"

interface ISideMenuProps {
    isSideMenuVisible?: boolean
}

export const SideMenu: React.FC<ISideMenuProps> = observer(({ isSideMenuVisible }) => {
    const navigate = useNavigate()
    const isSideMenuVisibleClass = isSideMenuVisible ? "visible" : "hidden"

    return (
        <div className={`side-menu ${isSideMenuVisibleClass}`}>
            <ul className="list-items">
                <li>
                    <a onClick={() => navigate("/")}>
                        <Text variant="body-s">Dashboard</Text>
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate("/components")}>
                        <Text variant="body-s">Components</Text>
                    </a>
                </li>
                {AuthService.isAdmin && (
                    <li>
                        <a onClick={() => navigate("/example")}>
                            <Text variant="body-s">Example</Text>
                        </a>
                    </li>
                )}
                <li>
                    <a onClick={() => navigate("/profile")}>
                        <Text variant="body-s">Profile</Text>
                    </a>
                </li>
            </ul>
        </div>
    )
})
