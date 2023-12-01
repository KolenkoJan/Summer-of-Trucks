export const theme = {
    color: {
        primaryLight: "#42a5f5",
        primaryMain: "#1976d2",
        primaryDark: "#1565c0",
        onPrimary: "#fff",
        errorMain: "#d32f2f",
        errorLight: "#ef5350",
        errorDark: "#c62828",
        onError: "#fff",
        paper: "#fff",
        grey50: "#fafafa",
        grey100: "#f5f5f5",
        grey200: "#eeeeee",
        grey300: "#e0e0e0",
        grey400: "#e0e0e0",
        textPrimary: "rgba(0, 0, 0, 0.87)",
        textSecondary: "rgba(0, 0, 0, 0.6)",
        textDisabled: "rgba(0, 0, 0, 0.38)",
        divider: "rgba(0, 0, 0, 0.12)",
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

export type ThemeColor =
    | "primary-light"
    | "primary-main"
    | "primary-dark"
    | "on-primary"
    | "error-main"
    | "error-light"
    | "error-dark"
    | "on-error"
    | "grey-50"
    | "grey-100"
    | "grey-200"
    | "grey-300"
    | "grey-400"
    | "text-primary"
    | "text-secondary"
    | "text-disabled"
    | "divider"

export type ThemeSpacing = "xs" | "s" | "m" | "l" | "xl"
export type ThemeSize = "s" | "m" | "l"
