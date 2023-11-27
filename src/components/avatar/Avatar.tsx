import { ThemeSize } from "@src/theme";
import { observer } from "mobx-react-lite";

interface IAvatarProps {
    source: string
    size?: ThemeSize
    onClick?: () => void
    className?: string
}

export const Avatar: React.FC<IAvatarProps> = observer(({ source, size, onClick, className}) => {
    return (
        <img 
        src={source} 
        onClick={onClick} 
        className={`avatar width-${size} height-${size} ${className}`}/>
    )
})

Avatar.defaultProps = {
    size: "l",
}