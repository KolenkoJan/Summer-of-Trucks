import React from "react"
import { IIconBaseProps, IconBase } from "../components/icon-base/IconBase"
import { theme } from "../theme"

export const DashboardLogoIcon: React.FC<IIconBaseProps> = (props) => {
    return (
        <IconBase {...props}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="13" height="12" rx="1.5" stroke={theme.color.textPrimary} />
                <rect x="0.5" y="0.5" width="13" height="12" rx="1.5" stroke={theme.color.textPrimary} />
                <rect x="0.5" y="15.5" width="13" height="13" rx="1.5" stroke={theme.color.textPrimary} />
                <rect x="16.5" y="0.5" width="13" height="20" rx="1.5" stroke={theme.color.textPrimary} />
                <rect x="0.5" y="-0.5" width="13" height="5" rx="1.5" transform="matrix(1 0 0 -1 16 28)" stroke={theme.color.textPrimary} />
            </svg>
        </IconBase>
    )
}
