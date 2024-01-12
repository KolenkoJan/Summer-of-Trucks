import "./Card.scss"

interface ICardProps {
    className?: string
    children?: React.ReactNode
    variant?: "filled" | "outlined"
}

export const Card: React.FC<ICardProps> = ({ className, children, variant }) => {
    return <div className={`card ${variant} ${className}`}>{children}</div>
}

Card.defaultProps = {
    variant: "filled",
}
