import { Text } from "../typography/Text"
import "./Button.scss"

interface IButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    leftIcon?: React.ReactNode
    className?: string
    disabled?: boolean
}

export const Button: React.FC<IButtonProps> = ({ onClick, disabled, children, leftIcon, className }) => {
    const onClickClass = onClick ? "cursor-pointer" : ""

    return (
        <button disabled={disabled} className={`${onClickClass} ${className} button`} onClick={onClick}>
            {leftIcon && <div className="left-icon">{leftIcon}</div>}
            {children && (
                <Text variant="body-m" color="on-primary" className={leftIcon ? "children-margin" : ""}>
                    {children}
                </Text>
            )}
        </button>
    )
}
