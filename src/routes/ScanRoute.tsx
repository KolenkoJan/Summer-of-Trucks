import { observer } from "mobx-react-lite"
import { QrScanner } from "../components/other/QrScanner"
import { PageContainer } from "../components/other/PageContainer"

export const ScanRoute: React.FC = observer(() => {
    return (
        <PageContainer>
            <QrScanner />
        </PageContainer>
    )
})
