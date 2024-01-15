import "./Card.scss"

interface ICardProps {
    className?: string
    children?: React.ReactNode
}

export const Card: React.FC<ICardProps> = ({ className, children }) => {
    return <div className={`card ${className}`}>{children}</div>
}
