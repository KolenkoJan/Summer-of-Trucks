export interface IEvent {
    id: string // firebase ID
    index: number
    photo: File | undefined
    title: string
    description: string
    startDate: string
    address: string
    latitude: number
    longitude: number
}
