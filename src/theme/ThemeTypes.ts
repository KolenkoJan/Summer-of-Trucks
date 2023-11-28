export const theme = {
    color: {
        primary: "primary",
        onPrimary: "on-primary",
        primaryContainer: "primary-container",
        onPrimaryContainer: "on-primary-container",
        secondary: "secondary",
        onSecondary: "on-secondary",
        secondaryContainer: "secondary-container",
        onSecondaryContainer: "on-secondary-container",
        surfaceContainerLowest: "surface-container-lowest",
        surfaceContainerLow: "surface-container-low",
        surfaceContainerMedium: "surface-container-medium",
        surfaceContainerHigh: "surface-container-high",
        surfaceContainerHighest: "surface-container-highest",
        onSurface: "on-surface",
    },

    spacing: {
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
    },

    size: {
        s: "s",
        m: "m",
        l: "l",
    },
    
}

export type ThemeColor = keyof typeof theme.color
export type ThemeSpacing = keyof typeof theme.spacing
export type ThemeSize = keyof typeof theme.size
