import { ThemeSize, theme } from "../../theme"
import "./IconBase.scss"

export interface IIconBaseProps {
    children?: React.ReactNode
    size?: ThemeSize
    isSelected?: boolean
    onClick?: () => void
    className?: string
}

export const IconBase: React.FC<IIconBaseProps> = ({ size, isSelected, className, onClick, children }) => {
    const colorClass = isSelected ? `background-color-${theme.color.onPrimaryContainer}` : ""
    const onClickClass = onClick ? "cursor-pointer" : ""

    return (
        <div className={`icon-base icon-base-size-${size} ${colorClass} ${onClickClass} ${className}`} onClick={onClick}>
            {children}
        </div>
    )
}

IconBase.defaultProps = {
    size: "m",
}
