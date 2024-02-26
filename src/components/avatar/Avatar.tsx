import { ThemeSize } from "../../theme/ThemeTypes"
import "../../theme/Theme.scss"
import { observer } from "mobx-react-lite"
import "./Avatar.scss"

interface IAvatarProps {
    source: string | undefined
    size?: ThemeSize
    onClick?: () => void
    className?: string
}

export const Avatar: React.FC<IAvatarProps> = observer(({ source, size, onClick, className }) => {
    const onClickClass = onClick ? "cursor-pointer" : ""
    return <img src={source} onClick={onClick} className={`avatar width-${size} height-${size} ${className} ${onClickClass}`} />
})

Avatar.defaultProps = {
    size: "l",
}
