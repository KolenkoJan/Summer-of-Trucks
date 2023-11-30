import React from "react"
import { IIconBaseProps, IconBase } from "@src/components"
import { theme } from "../theme"

export const ProfileIcon: React.FC<IIconBaseProps> = (props) => {
    return (
        <IconBase {...props}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 12.25C8.69217 12.25 6 9.55783 6 6.25C6 2.94217 8.69217 0.25 12 0.25C15.3078 0.25 18 2.94217 18 6.25C18 9.55783 15.3078 12.25 12 12.25ZM12 1.81522C9.55826 1.81522 7.56522 3.80826 7.56522 6.25C7.56522 8.69174 9.55826 10.6848 12 10.6848C14.4417 10.6848 16.4348 8.69174 16.4348 6.25C16.4348 3.80826 14.4417 1.81522 12 1.81522Z"
                    fill={theme.color.textPrimary}
                />
                <path
                    d="M20.2773 22.25C19.8822 22.25 19.5546 21.93 19.5546 21.5441C19.5546 18.2971 16.1627 15.6618 12 15.6618C7.83726 15.6618 4.4454 18.2971 4.4454 21.5441C4.4454 21.93 4.11777 22.25 3.7227 22.25C3.32762 22.25 3 21.93 3 21.5441C3 17.5253 7.03747 14.25 12 14.25C16.9625 14.25 21 17.5253 21 21.5441C21 21.93 20.6724 22.25 20.2773 22.25Z"
                    fill={theme.color.textPrimary}
                />
            </svg>
        </IconBase>
    )
}
