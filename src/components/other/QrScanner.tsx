import { observer } from "mobx-react-lite"
import { QrReader } from "react-qr-reader"

export const QrScanner: React.FC = observer(() => {
    return <QrReader constraints={{ facingMode: "environment" }} containerStyle={{ width: "100vw" }} />
})
