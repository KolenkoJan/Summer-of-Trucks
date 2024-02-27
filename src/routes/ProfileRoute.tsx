import { observer } from "mobx-react-lite"
import { Card } from "../components/cards/Card"
import { Avatar } from "../components/avatar/Avatar"
import { AuthService } from "../services"
import { Text } from "../components/typography/Text"
import { Button } from "../components"
import { useNavigate } from "react-router-dom"
import { PageContainer } from "../components/other/PageContainer"

export const ProfileRoute = observer(() => {
    const navigate = useNavigate()
    return (
        <PageContainer>
            <Card className="gap-l items-flex-start">
                <div className="flex gap-l items-center">
                    <Avatar source={AuthService.authenticatedUser?.photoURL || undefined} />
                    <div className="flex flex-column">
                        <Text>{AuthService.authenticatedUser?.displayName}</Text>
                        <Text>{AuthService.authenticatedUser?.email}</Text>
                    </div>
                </div>
                <Button onClick={() => AuthService.logout(navigate)}>Odjavi se</Button>
            </Card>
        </PageContainer>
    )
})
