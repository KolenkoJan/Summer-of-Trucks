import { ReactNode } from "react"
import "../typography/Text.scss"
import { ThemeColor } from "../../theme"

interface ITextProps {
    children?: ReactNode
    variant?: "title-l" | "body-s" | "body-m"
    color?: ThemeColor
    className?: string
}

export const Text: React.FC<ITextProps> = ({ children, color, variant, className }) => {
    return <div className={`base-text color-${color} ${variant} ${className}`}>{children}</div>
}

Text.defaultProps = {
    variant: "body-m",
    color: "text-primary",
}
