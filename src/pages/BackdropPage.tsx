import { CircularLoader } from "../components/loaders/CircularLoader"
import "./BackdropPage.scss"

export const BackdropPage: React.FC = () => {
    return (
        <div className="flex justify-center items-center backdrop">
            <CircularLoader className="white" />
        </div>
    )
}
