import { type User } from "firebase/auth"
import { IEvent, IParticipatedEventItem, IUserCollectionItem } from "../firebase/interfaces"

class FirebaseMapper {
    mapGoogleUserToUser(user: User): IUserCollectionItem {
        return {
            photoURL: user.photoURL,
            userId: user.uid,
            email: user.email,
            displayName: user.displayName,
            events: [],
        }
    }

    mapEventToUserParticipatedEvents(event: IEvent): IParticipatedEventItem {
        return {
            id: event.id,
            title: event.title,
            date: event.startDate,
        }
    }
}

export default new FirebaseMapper()
