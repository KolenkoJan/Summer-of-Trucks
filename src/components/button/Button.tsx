import { Text } from "../typography/Text"
import "./Button.scss"

interface IButtonProps {
    children: React.ReactNode
    onClick?: () => void
    leftIcon?: React.ReactNode
}

export const Button: React.FC<IButtonProps> = ({ onClick, children, leftIcon }) => {
    const onClickClass = onClick ? "cursor-pointer" : ""
    const leftIconClass = leftIcon ? "left-icon" : ""

    return (
        <button className={`${onClickClass}`} onClick={onClick}>
            <div className={`${leftIconClass}`}>{leftIcon}</div>
            <Text variant="body-m" color="on-primary">
                {children}
            </Text>
        </button>
    )
}
