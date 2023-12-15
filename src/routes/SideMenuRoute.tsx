import { DashboardLogoIcon, InovaLogoIcon, ProfileIcon } from "../icons"
import { observer } from "mobx-react-lite"
import { useNavigate, useMatch } from "react-router-dom"

export const SideMenuRoute: React.FC = observer(() => {
    const navigate = useNavigate()

    return (
        <div className="route-side-menu">
            <InovaLogoIcon size="l" />
            <DashboardLogoIcon size="l" isSelected={!!useMatch("")} onClick={() => navigate("")} />
            <ProfileIcon size="l" isSelected={!!useMatch("/profile")} onClick={() => navigate("/profile")} className="margin-top-m" />
        </div>
    )
})
