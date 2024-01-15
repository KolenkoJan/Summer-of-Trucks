import { NavLink } from "react-router-dom"
import { Text } from "../../components/typography/Text"
import { ThemeColor } from "../../theme"

interface ISideMenuNavLinkProps {
    children?: React.ReactNode
    className?: string
    textClassName?: string
    variant?: "title-l" | "body-s" | "body-m"
    color?: ThemeColor
    to: string
}

export const SideMenuNavLink: React.FC<ISideMenuNavLinkProps> = ({ textClassName, children, to, className, variant, color }) => {
    return (
        <NavLink to={to} className={className}>
            <Text variant={variant} color={color} className={textClassName}>
                {children}
            </Text>
        </NavLink>
    )
}
