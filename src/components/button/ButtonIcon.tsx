import "./ButtonIcon.scss"

interface IButtonIconProps {
    children?: React.ReactNode
    onClick?: () => void
    className?: string
}

export const ButtonIcon: React.FC<IButtonIconProps> = ({ onClick, children, className }) => {
    return (
        <button className={`${className} button-icon`} onClick={onClick}>
            {children}
        </button>
    )
}
