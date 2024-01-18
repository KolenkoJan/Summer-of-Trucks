import { observer } from "mobx-react-lite"
import { Card } from "../components/cards/Card"
import { TextField } from "../components/Inputs/textField/TextField"
import { useState } from "react"
import { AdminRouteStore } from "../stores/AdminRouteStore"
import { EventsStore } from "../stores/EventsStore"
import { Button } from "../components"
import { Table } from "../components/tables/Table"
import { Text } from "../components/typography/Text"

export const AdminRoute: React.FC = observer(() => {
    const [store] = useState(() => new AdminRouteStore())
    const [eventsStore] = useState(() => new EventsStore())

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
                <TextField className="" placeholder="Title" value={store.event.title} onChange={(value) => store.setTodo("title", value)} />
                <TextField placeholder="Description" value={store.event.description} onChange={(value) => store.setTodo("description", value)} />
                <div>
                    <Button onClick={() => store.createTodo()}>Save</Button>
                </div>
            </Card>

            <Card className="a-card">
                <Text variant="title-l">Generalne informacije</Text>
                <Text variant="body-m">Ime dogodka</Text>
                <TextField placeholder="Ime..." onChange={(value) => eventsStore.setEvent("title", value)} value={eventsStore.event.title} />
                <Text variant="body-m">Opis dogodka</Text>
                <TextField placeholder="Opis..." onChange={(value) => eventsStore.setEvent("description", value)} value={eventsStore.event.description} />
                <Text variant="body-m">Datum začetka</Text>
                <TextField type="date" onChange={(value) => eventsStore.setEvent("startDate", value)} value={eventsStore.event.startDate} />
                <Text variant="title-l">Lokacija dogodka</Text>
                <Text variant="body-s">Ima dogodek fizično lokacijo?</Text>
                <Text variant="body-m">Fizični naslov dogodka</Text>
                <TextField placeholder="Naslov..." onChange={(value) => eventsStore.setEvent("address", value)} value={eventsStore.event.address} />
                <div className="flex-gap">
                    <div className="flex-column-gap">
                        <Text variant="body-m">Latitude</Text>
                        <TextField placeholder="Latitude..." type="number" onChange={(value) => eventsStore.setEvent("latitude", value)} value={eventsStore.event.latitude} />
                    </div>
                    <div className="flex-column-gap">
                        <Text variant="body-m">Longitude</Text>
                        <TextField placeholder="Longitude" type="number" onChange={(value) => eventsStore.setEvent("longitude", value)} value={eventsStore.event.longitude} />
                    </div>
                </div>
                <div className="button-center">
                    <Button onClick={() => eventsStore.createEvent()}>Objavi dogodek</Button>
                </div>
            </Card>

            <Card className="a-card">
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Address</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventsStore.dbEvents.map((dbEvent) => (
                            <tr key={dbEvent.title}>
                                <td>{dbEvent.title}</td>
                                <td>{dbEvent.description}</td>
                                <td>{dbEvent.startDate}</td>
                                <td>{dbEvent.address}</td>
                                <td>{dbEvent.latitude}</td>
                                <td>{dbEvent.longitude}</td>
                            </tr>
                        ))}

                        {!eventsStore.dbEvents.length && (
                            <tr>
                                <td colSpan={2}>Ni objavljenih dogodkov!</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </div>
    )
})
