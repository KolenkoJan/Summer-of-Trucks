import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, QueryConstraint, setDoc } from "firebase/firestore"
import { Interfaces, db } from "../.."
import { HTTPStatusCode } from "../../error"
import { EventSchema } from "./Schema"
import { FirebaseUtils } from "../../utils"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000)) // 1 second

const CollectionKey = "events" // collection

export const EventsApi = {
    async getMany(searchParams?: Interfaces.IEventSearchParams) {
        await sleep()

        const queryConstraints: QueryConstraint[] = []
        if (searchParams?.id) {
            queryConstraints.push(where("userIds", "array-contains", searchParams.id))
        }

        const snapshot = await getDocs(searchParams ? query(collection(db, CollectionKey), ...queryConstraints) : collection(db, CollectionKey))
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Interfaces.IEvent)
    },

    async getOne(eventId: string) {
        const snapshot = await getDoc(doc(db, CollectionKey, eventId))
        return { ...snapshot.data(), id: snapshot.id } as Interfaces.IEvent
    },

    async create(body: Omit<Interfaces.IEvent, "id">) {
        const schemaResult = EventSchema().validate(body)
        if (schemaResult.error) {
            throw new Error(HTTPStatusCode[400])
        }

        await sleep()
        const doc = await addDoc(collection(db, CollectionKey), body)
        return this.getOne(doc.id)
    },

    async update(eventId: string, _body: Interfaces.IEvent) {
        const body = FirebaseUtils.toBody(_body)

        const schemaResult = EventSchema().validate(body)
        if (schemaResult.error) {
            throw new Error(HTTPStatusCode[400])
        }

        await sleep()
        await setDoc(doc(db, CollectionKey, eventId), body)
        return this.getOne(eventId)
    },

    async delete(eventId: string) {
        await sleep()
        return deleteDoc(doc(db, CollectionKey, eventId))
    },

    async assignUserToEvent(eventId: string, userId: string) {
        const event = await this.getOne(eventId)

        event.userIds ??= []
        if (event.userIds.some((eventUserId) => eventUserId === userId)) {
            throw new Error(HTTPStatusCode[409])
        } else {
            event.userIds.push(userId)
            await this.update(eventId, event)
        }
    },
}
