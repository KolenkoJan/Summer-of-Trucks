import { Text } from "../typography/Text"
import "./Button.scss"

interface IButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    leftIcon?: React.ReactNode
    className?: string
}

export const Button: React.FC<IButtonProps> = ({ onClick, children, leftIcon, className }) => {
    const onClickClass = onClick ? "cursor-pointer" : ""

    return (
        <button className={`${onClickClass} ${className}`} onClick={onClick}>
            {leftIcon && <div className="left-icon">{leftIcon}</div>}
            {children && (
                <Text variant="body-m" color="on-primary" className={leftIcon ? "children-margin" : ""}>
                    {children}
                </Text>
            )}
        </button>
    )
}
