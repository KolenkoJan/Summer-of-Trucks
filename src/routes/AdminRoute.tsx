import { observer } from "mobx-react-lite"
import { Card } from "../components/cards/Card"
import { TextField } from "../components/Inputs/textField/TextField"
import React, { useState } from "react"
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
            <Card className="flex flex-column gap-l a-card">
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

            <Card className="flex flex-column gap-l a-card">
                <TextField className="" placeholder="Title" value={store.event.title} onChange={(value) => store.setTodo("title", value)} />
                <TextField placeholder="Description" value={store.event.description} onChange={(value) => store.setTodo("description", value)} />
                <div>
                    <Button>Save</Button>
                </div>
            </Card>

            <Card className="flex flex-column gap-l a-card">
                <Text variant="title-l">Generalne informacije</Text>
                <TextField
                    schemaRule={eventsStore.eventSchema.getRule("title")}
                    placeholder="Ime..."
                    label="Ime dogodka"
                    onChange={(value) => eventsStore.setEvent("title", value)}
                    value={eventsStore.event.title}
                />
                <TextField
                    schemaRule={eventsStore.eventSchema.getRule("description")}
                    placeholder="Opis..."
                    label="Opis dogodka"
                    onChange={(value) => eventsStore.setEvent("description", value)}
                    value={eventsStore.event.description}
                />
                <TextField
                    schemaRule={eventsStore.eventSchema.getRule("startDate")}
                    type="date"
                    label="Datum začetka"
                    onChange={(value) => eventsStore.setEvent("startDate", value)}
                    value={eventsStore.event.startDate}
                />
                <Text variant="title-l">Lokacija dogodka</Text>
                <Text variant="body-s">Ima dogodek fizično lokacijo?</Text>
                <TextField placeholder="Naslov..." label="Fizični naslov dogodka" onChange={(value) => eventsStore.setEvent("address", value)} value={eventsStore.event.address} />
                <div className="flex gap-l">
                    <div className="flex flex-column gap-l">
                        <TextField placeholder="Latitude..." label="Latitude" type="number" onChange={(value) => eventsStore.setEvent("latitude", value)} value={eventsStore.event.latitude} />
                    </div>
                    <div className="flex flex-column gap-l">
                        <TextField placeholder="Longitude" label="Longitude" type="number" onChange={(value) => eventsStore.setEvent("longitude", value)} value={eventsStore.event.longitude} />
                    </div>
                </div>
                <div className="flex flex-column margin-top-xl justify-center items-center">
                    <Button disabled={!eventsStore.areAllFieldsValid} onClick={eventsStore.createEvent}>
                        Objavi dogodek
                    </Button>
                </div>
            </Card>

            <Card className="flex flex-column gap-l a-card">
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
                        {eventsStore.dbEvents.map((dbEvent, index) => (
                            <tr key={dbEvent.title}>
                                <td>{dbEvent.title}</td>
                                <td>{dbEvent.description}</td>
                                <td>{dbEvent.startDate}</td>
                                <td>{dbEvent.address}</td>
                                <td>{dbEvent.latitude}</td>
                                <td>{dbEvent.longitude}</td>
                                <td>
                                    <Button onClick={() => eventsStore.deleteEvent(index)}>-</Button>
                                </td>
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
