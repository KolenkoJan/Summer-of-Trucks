import { InovaLogoIcon } from "@src/icons"
import { observer } from "mobx-react-lite"
import { useNavigate, useMatch } from "react-router-dom"

export const SideMenuRoute: React.FC = observer(() => {
    const navigate = useNavigate()

    return (
        <div className="route-side-menu">
            <InovaLogoIcon size="l" isSelected={!!useMatch("/dashboard")} onClick={() => navigate("/dashboard")} />
            <InovaLogoIcon size="l" isSelected={!!useMatch("/profile")} onClick={() => navigate("/profile")} className="margin-top-xl" />
        </div>
    )
})
