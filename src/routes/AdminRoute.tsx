import { observer } from "mobx-react-lite"
import { Card } from "../components/cards/Card"
import { TextField } from "../components/Inputs/textField/TextField"
import React, { useEffect, useState } from "react"
import { EventsStore } from "../stores/EventsStore"
import { Button } from "../components"
import { Table } from "../components/tables/Table"
import { Text } from "../components/typography/Text"
import { CircularLoader } from "../components/loaders/CircularLoader"
import QRCode from "react-qr-code"
import { PageContainer } from "../components/other/PageContainer"

export const AdminRoute: React.FC = observer(() => {
    const [eventsStore] = useState(() => new EventsStore())

    const fetchData = async () => {
        await eventsStore.getEvents()
    }

    useEffect(() => {
        fetchData()
    }, [eventsStore.getEvents])

    return (
        <PageContainer>
            <Card className="gap-l">
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
                <div className="card-flex-row-lg flex flex-column gap-l">
                    <div className="flex flex-column gap-l">
                        <TextField placeholder="Latitude..." label="Latitude" type="number" onChange={(value) => eventsStore.setEvent("latitude", value)} value={eventsStore.event.latitude} />
                    </div>
                    <div className="flex flex-column gap-l">
                        <TextField placeholder="Longitude" label="Longitude" type="number" onChange={(value) => eventsStore.setEvent("longitude", value)} value={eventsStore.event.longitude} />
                    </div>
                </div>
                <TextField schemaRule={eventsStore.eventSchema.getRule("photo")} type="file" onChange={(value) => eventsStore.setEvent("photo", value)} value={eventsStore.event.photo} />
                <div className="flex flex-column margin-top-xl justify-center items-center">
                    <Button disabled={eventsStore.isCreatingEvent || !eventsStore.eventSchema.isValid} onClick={eventsStore.createEvent}>
                        Objavi dogodek
                    </Button>
                </div>
            </Card>
            <Card className="gap-xl">
                <Text variant="title-l">Vsi dogodki</Text>
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Address</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>QR Code</th>
                            <th>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventsStore.isLoadingEvents ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className="flex justify-center">
                                        <CircularLoader />
                                    </div>
                                </td>
                            </tr>
                        ) : eventsStore.gettingEventError && eventsStore.gettingEventError.message ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className="flex justify-center items-center gap-l">
                                        <Text color="error-main" variant="body-s" className="flex justify-center">
                                            {`Error fetching events: ${eventsStore.gettingEventError?.message}`}
                                        </Text>
                                        <Button onClick={fetchData}>Retry</Button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {eventsStore.dbEvents.map((dbEvent, index) => (
                                    <tr key={dbEvent.id}>
                                        <td>{dbEvent.title}</td>
                                        <td>{dbEvent.description}</td>
                                        <td>{dbEvent.startDate}</td>
                                        <td>{dbEvent.address}</td>
                                        <td>{dbEvent.latitude}</td>
                                        <td>{dbEvent.longitude}</td>
                                        <td>
                                            <QRCode value={dbEvent.id} style={{ height: "auto", width: "50px" }} />
                                        </td>
                                        <td>{dbEvent.userIds}</td>
                                        <td>
                                            <Button disabled={eventsStore.isDeletingEvent[index]} onClick={() => eventsStore.deleteEvent(index)}>
                                                -
                                            </Button>
                                        </td>
                                    </tr>
                                ))}

                                {!eventsStore.dbEvents.length && (
                                    <tr>
                                        <td colSpan={6}>Ni objavljenih dogodkov!</td>
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
