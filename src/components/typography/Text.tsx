import { ReactNode } from "react";
import "../typography/Text.scss";

interface ITextProps {
    children?: ReactNode
    variant?: "title-l" | "body-s" | "body-m"
    className?: string
}

export const Text: React.FC<ITextProps> = ({ children, variant, className }) => {
    return (
        <div className={`base-text ${variant} ${className}`}>
            {children}
        </div>
    )
}

Text.defaultProps = {
    variant: "body-m",
}

