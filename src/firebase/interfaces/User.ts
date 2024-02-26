import { IParticipatedEventItem } from "./ParticipatedEvents"

export interface IUserCollectionItem {
    userId: string
    email: string | null
    displayName: string | null
    photoURL: string | null
    events: IParticipatedEventItem[]
}
