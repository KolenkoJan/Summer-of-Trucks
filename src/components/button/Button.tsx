import "./Button.scss"

interface IButtonProps {
    variant?: "filled" | "outlined"
    children: React.ReactNode
    onClick?: () => void
}

export const Button: React.FC<IButtonProps> = ({ variant, onClick, children }) => {
    const onClickClass = onClick ? "cursor-pointer" : ""

    return (
        <button className={`${onClickClass} ${variant}`} onClick={onClick}>
            <p>{children}</p>
        </button>
    )
}

Button.defaultProps = {
    variant: "outlined",
}
