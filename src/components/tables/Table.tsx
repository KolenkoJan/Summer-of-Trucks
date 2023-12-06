import "./Table.scss"

interface ITableProps {
    children?: React.ReactNode
}

export const Table: React.FC<ITableProps> = ({ children }) => {
    return <table className="table base-text body-s">{children}</table>
}
