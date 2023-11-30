import { Text } from "../typography/Text"
import "./Button.scss"

interface IButtonProps {
    children: React.ReactNode
    onClick?: () => void
}

export const Button: React.FC<IButtonProps> = ({ onClick, children }) => {
    const onClickClass = onClick ? "cursor-pointer" : ""

    return (
        <button className={`${onClickClass}`} onClick={onClick}>
            <Text variant="body-m" color="on-primary">
                <strong>{children}</strong>
            </Text>
        </button>
    )
}
