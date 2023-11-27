import { createRoot } from "react-dom/client"
import { AppRoute } from "@src/routes"
import "./Main.scss"
import "./theme/ThemeDefault.scss"
import "./theme/Theme.scss"

const root = createRoot(document.getElementById("root"))

root.render(<AppRoute />)
