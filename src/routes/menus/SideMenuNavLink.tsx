import { NavLink, type NavLinkProps } from "react-router-dom"
import { Text } from "../../components/typography/Text"
import "../../routes/menus/SideMenu.scss"

interface ISideMenuNavLinkProps extends NavLinkProps {
    children?: React.ReactNode
}

export const SideMenuNavLink: React.FC<ISideMenuNavLinkProps> = ({ children, ...rest }) => {
    return (
        <NavLink {...rest}>
            <Text variant="body-s" color="text-secondary" className="text-hover">
                {children}
            </Text>
        </NavLink>
    )
}
