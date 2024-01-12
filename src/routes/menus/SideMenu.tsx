import { observer } from "mobx-react-lite"
import "./SideMenu.scss"
import { useNavigate } from "react-router-dom"
import { Text } from "../../components/typography/Text"

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
                    <a>
                        <Text variant="body-s">Dashboard</Text>
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate("/home")}>
                        <Text variant="body-s">Admin</Text>
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate("/home/profile")}>
                        <Text variant="body-s">Profile</Text>
                    </a>
                </li>
            </ul>
        </div>
    )
})
