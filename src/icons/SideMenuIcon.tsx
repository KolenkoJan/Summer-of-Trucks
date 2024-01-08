import React from "react"
import { IIconBaseProps, IconBase } from "../components/icon-base/IconBase"
import "./SideMenuIcon.scss"

export const SideMenuIcon: React.FC<IIconBaseProps> = (props) => {
    return (
        <IconBase {...props} className="side-menu-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="5" width="14" height="1.5" rx="1" fill="#007FFF"></rect>
                <rect x="1" y="9" width="14" height="1.5" rx="1" fill="#007FFF"></rect>
            </svg>
        </IconBase>
    )
}
