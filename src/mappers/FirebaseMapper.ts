import { type User as AuthUser } from "firebase/auth"
import { IEvent, IParticipatedEventItem, IUser } from "../firebase/interfaces"

class FirebaseMapper {
    mapGoogleUserToUser(user: AuthUser): IUser {
        return {
            id: "",
            photoURL: user.photoURL!,
            email: user.email!,
            displayName: user.displayName!,
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
