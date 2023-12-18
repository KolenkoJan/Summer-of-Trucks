import { observer } from "mobx-react-lite"
import "./Header.scss"
import { Button } from "../button/Button"

interface IHeaderProps {
    isSideMenuVisible?: () => void
}

export const Header: React.FC<IHeaderProps> = observer(({ isSideMenuVisible }) => {
    return (
        <div className="header">
            <Button
                leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="5" width="14" height="1.5" rx="1" fill="#007FFF"></rect>
                        <rect x="1" y="9" width="14" height="1.5" rx="1" fill="#007FFF"></rect>
                    </svg>
                }
                className="menu-button"
                onClick={() => {
                    isSideMenuVisible()
                }}
            ></Button>
        </div>
    )
})
