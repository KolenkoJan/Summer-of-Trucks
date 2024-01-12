import { observer } from "mobx-react-lite"
import { AuthService } from "../services"
import { ProfilePage } from "../pages/ProfilePage"

interface IPrivateRouteProps {
    children?: React.ReactNode
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = observer(({ children }) => {
    return AuthService.isLoggedIn ? <>{children}</> : <ProfilePage />
})
