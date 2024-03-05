import { observer } from "mobx-react-lite"
import "./Header.scss"
import { SideMenuIcon } from "../../icons/SideMenuIcon"
import { ButtonIcon } from "../button/ButtonIcon"
import { Avatar } from "../avatar/Avatar"
import { Button } from "../button/Button"
import { AuthService } from "../../services"
import { useNavigate } from "react-router-dom"
import { InovaLogoIcon } from "../../icons"

interface IHeaderProps {
    isSideMenuVisible?: () => void
}

export const Header: React.FC<IHeaderProps> = observer(({ isSideMenuVisible }) => {
    const navigate = useNavigate()
    return (
        <div className="header">
            <div className="flex gap-m items-center">
                <InovaLogoIcon size="m" onClick={() => navigate("/dashboard")} />
                <ButtonIcon onClick={isSideMenuVisible} className="hidden">
                    <SideMenuIcon size="s" />
                </ButtonIcon>
            </div>
            <div className="flex-right">
                <Avatar size="l" source={AuthService.authenticatedUser?.photoURL || undefined} onClick={() => navigate("/profile")} />
                {AuthService.authenticatedUser?.isAdmin && (
                    <Button className="button-header-hidden" onClick={() => navigate("/events")}>
                        Ustvari dogodek
                    </Button>
                )}
                <Button
                    className="button-header-hidden"
                    onClick={() => {
                        AuthService.logout(navigate)
                    }}
                >
                    Odjava
                </Button>
            </div>
        </div>
    )
})
