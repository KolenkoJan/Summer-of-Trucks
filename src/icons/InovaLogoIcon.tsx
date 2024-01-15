import React from "react"
import { IIconBaseProps, IconBase } from "../components/icon-base/IconBase"
import { theme } from "../theme"

export const InovaLogoIcon: React.FC<IIconBaseProps> = (props) => {
    return (
        <IconBase {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 32" fill="none">
                <rect x="8.11816" y="0.117188" width="7.92846" height="7.82213" transform="rotate(90 8.11816 0.117188)" fill={theme.color.textPrimary} />
                <rect x="8.11816" y="11.0944" width="18.9063" height="7.82213" transform="rotate(90 8.11816 11.0944)" fill={theme.color.textPrimary} />
                <rect x="31.5858" y="0.117188" width="7.92846" height="20.2072" transform="rotate(90 31.5858 0.117188)" fill={theme.color.textPrimary} />
                <rect x="31.5858" y="11.0944" width="7.92846" height="20.2072" transform="rotate(90 31.5858 11.0944)" fill={theme.color.textPrimary} />
                <rect x="31.5858" y="22.0715" width="7.92846" height="20.2072" transform="rotate(90 31.5858 22.0715)" fill={theme.color.textPrimary} />
            </svg>
        </IconBase>
    )
}
