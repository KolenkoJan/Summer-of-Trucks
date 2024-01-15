import { observer } from "mobx-react-lite"
import { Card } from "../components/cards/Card"
import { TextField } from "../components/Inputs/textField/TextField"
import { useState } from "react"
import { AdminRouteStore } from "../stores/AdminRouteStore"
import { Button } from "../components"
import { Table } from "../components/tables/Table"

export const AdminRoute: React.FC = observer(() => {
    const [store] = useState(() => new AdminRouteStore())

    return (
        <div className="container padding-xl gap-xl">
            <Card className="a-card">
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.dbEvents.map((dbEvent) => (
                            <tr key={dbEvent.title}>
                                <td>{dbEvent.title}</td>
                                <td>{dbEvent.description}</td>
                            </tr>
                        ))}

                        {!store.dbEvents.length && (
                            <tr>
                                <td colSpan={2}>TODO lista je prazna</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>

            <Card className="a-card">
                <TextField className="" placeholder="Title" value={store.event.title} onChange={(value) => store.setEvent("title", value)} />
                <TextField placeholder="Description" value={store.event.description} onChange={(value) => store.setEvent("description", value)} />
                <div>
                    <Button onClick={() => store.createEvent()}>Save</Button>
                </div>
            </Card>
        </div>
    )
})
