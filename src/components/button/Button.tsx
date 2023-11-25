import "./Button.scss"

interface IButtonProps {
    variant?: "filled" | "outlined"
    children: React.ReactNode
    onClick?: () => void
}

export const Button: React.FC<IButtonProps> = (props) => {
    return (
        <button className={props.variant} {...props}>
            {props.children}22
        </button>
    )
}

Button.defaultProps = {
    variant: "outlined",
}
