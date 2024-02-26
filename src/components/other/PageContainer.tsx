interface IPageContainerProps {
    children: React.ReactNode
}

export const PageContainer: React.FC<IPageContainerProps> = ({ children }) => {
    return <div className="flex flex-1 flex-column items-center overflow-auto padding-xl gap-xl">{children}</div>
}
