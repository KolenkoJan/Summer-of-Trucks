import { CircularLoader } from "../components/loaders/CircularLoader"
import { InovaLogoIcon } from "../icons"
import "./InovaLoadingPage.scss"

export const InovaLoadingPage: React.FC = () => {
    return (
        <div className="flex flex-column gap-l justify-center items-center loading-page">
            <InovaLogoIcon size="l" className="logo" />
            <CircularLoader circleClassName="black" />
        </div>
    )
}
