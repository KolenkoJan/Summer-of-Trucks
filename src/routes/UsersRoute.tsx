import { observer } from "mobx-react-lite"
import { PageContainer } from "../components/other/PageContainer"
import { Table } from "../components/tables/Table"
import { Card } from "../components/cards/Card"
import { useEffect, useState } from "react"
import { CircularLoader } from "../components/loaders/CircularLoader"
import { Text } from "../components/typography/Text"
import { Button } from "../components/button/Button"
import { Switch } from "../components/Inputs/switch/Switch"
import { UserStore } from "../stores/UserStore"

export const UsersRoute: React.FC = observer(() => {
    const [userStore] = useState(() => new UserStore())

    useEffect(() => {
        userStore.isGettingUsersFromDatabase()
    }, [])

    return (
        <PageContainer>
            <Card className="gap-xl">
                <Text variant="title-l"> Vsi uporabniki </Text>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Display name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userStore.isGettingUsersFromDb ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className="flex justify-center">
                                        <CircularLoader />
                                    </div>
                                </td>
                            </tr>
                        ) : userStore.gettingError && userStore.gettingError.message ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className="flex justify-center items-center gap-l">
                                        <Text color="error-main" variant="body-s" className="flex justify-center">
                                            {`Error fetching events: ${userStore.gettingError?.message}`}
                                        </Text>
                                        <Button>Retry</Button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {userStore.users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td className="">
                                            <Switch
                                                disabled={userStore.isMakingUserAdmin[user.id]}
                                                isChecked={user.isAdmin}
                                                onChange={(isChecked) => {
                                                    userStore.setUser(user, "isAdmin", isChecked)
                                                    userStore.updateUser(user)
                                                }}
                                            />
                                        </td>
                                        <td className="flex items-center justify-end">
                                            <Button disabled={userStore.isDeletingUserFromDb[index]} onClick={() => userStore.removeUserFromDb(index)}>
                                                -
                                            </Button>
                                        </td>
                                    </tr>
                                ))}

                                {!userStore.users.length && (
                                    <tr>
                                        <td colSpan={6}>Ni Userjev v bazi!</td>
                                    </tr>
                                )}
                            </>
                        )}
                    </tbody>
                </Table>
            </Card>
        </PageContainer>
    )
})
