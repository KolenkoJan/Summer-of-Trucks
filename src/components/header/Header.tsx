import { observer } from "mobx-react-lite"
import "./Header.scss"
import { SideMenuIcon } from "../../icons/SideMenuIcon"
import { ButtonIcon } from "../button/ButtonIcon"
import { Avatar } from "../avatar/Avatar"
import { Button } from "../button/Button"
import { AuthService } from "../../services"
import { useNavigate } from "react-router-dom"

interface IHeaderProps {
    isSideMenuVisible?: () => void
}

export const Header: React.FC<IHeaderProps> = observer(({ isSideMenuVisible }) => {
    const navigate = useNavigate()
    return (
        <div className="header">
            <ButtonIcon onClick={isSideMenuVisible} className="hidden">
                <SideMenuIcon size="s" />
            </ButtonIcon>
            <div className="flex-right">
                <Avatar
                    size="l"
                    source="https://s3-alpha-sig.figma.com/img/36d9/95b4/6b1cc8fee1e10ffb7ba71aab042d4c3f?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dE7FP3RL90U9UqriPh2hr8seDGIC9QZMkyfBd4aFaXPUohghA~rbZ7fUOq8-nIoURkSSzz1sheHE~DWptFokffjjwqsPQWaTQ0DRIYgCCty4dGVZlkgVKDC~LvS9-TOqhDpsochYXkHsMQtD5pgdQpTqxIa17GwyROUXq3FAh87t5hsq6HJ0n2Qz-nE8JNrdzzp8I5W373~5iRwsavWdLGA15Wi6JvwUYxo9DgBiXgn1bIEg8573~eaQ8TzXte1WifhoAFpN8t2Q~ELi2pIt2t6EkOzjwJCXEzdxWLFKEUVEvC3kGKfwC5DlW1ojGQXhkElbLgsr~5vQqAJ5Xkzpeg__"
                />
                <Button
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
