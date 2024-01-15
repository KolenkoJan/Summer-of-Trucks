import { ComponentProps } from "react"
import "./Table.scss"

interface ITableProps extends ComponentProps<"table"> {
    children?: React.ReactNode
}

export const Table: React.FC<ITableProps> = ({ children, className, ...props }) => {
    return (
        <table className={`table base-text body-s ${className}`} {...props}>
            {children}
        </table>
    )
}
