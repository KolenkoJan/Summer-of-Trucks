import { observer } from "mobx-react-lite"
import { Text } from "../components/typography/Text"
import { Card } from "../components/cards/Card"
import { Table } from "../components/tables/Table"
import { useEffect, useState } from "react"
import { EventsStore } from "../stores/EventsStore"
import { CircularLoader } from "../components/loaders/CircularLoader"
import { Button } from "../components"
import QRCode from "react-qr-code"
import { PageContainer } from "../components/other/PageContainer"

export const DashboardRoute: React.FC = observer(() => {
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
                <Text variant="title-l">Objavljeni dogodki</Text>
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Address</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>QR-Code</th>
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
                                {eventsStore.dbEvents.map((dbEvent) => (
                                    <tr key={dbEvent.id}>
                                        <td>{dbEvent.title}</td>
                                        <td>{dbEvent.description}</td>
                                        <td>{dbEvent.startDate}</td>
                                        <td>{dbEvent.address}</td>
                                        <td>{dbEvent.latitude}</td>
                                        <td>{dbEvent.longitude}</td>
                                        <td>
                                            <QRCode size={64} value={dbEvent.id} style={{ height: "auto", width: "50px" }} />
                                        </td>
                                    </tr>
                                ))}

                                {!eventsStore.dbEvents.length && (
                                    <tr>
                                        <td colSpan={6}>
                                            <Text variant="body-s">Ni objavljenih dogodkov!</Text>
                                        </td>
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
