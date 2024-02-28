import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, QueryConstraint, setDoc } from "firebase/firestore"
import { Interfaces, db } from ".."
import { HTTPStatusCode } from "../error"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000)) // 1 second

const c = "events" // collection

export const Events = {
    async getMany(searchParams?: Interfaces.IEventSearchParams) {
        await sleep()

        const queryConstraints: QueryConstraint[] = []
        if (searchParams?.id) {
            queryConstraints.push(where("userIds", "array-contains", searchParams.id))
        }

        const snapshot = await getDocs(searchParams ? query(collection(db, c), ...queryConstraints) : collection(db, c))
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Interfaces.IEvent)
    },

    async getOne(eventId: string) {
        const snapshot = await getDoc(doc(db, c, eventId))
        return { ...snapshot.data(), id: snapshot.id } as Interfaces.IEvent
    },

    async create(body: Interfaces.IEvent) {
        await sleep()
        const doc = await addDoc(collection(db, c), body)
        return this.getOne(doc.id)
    },

    async update(eventId: string, body: Interfaces.IEvent) {
        await sleep()
        await setDoc(doc(db, c, eventId), body)
        return this.getOne(body.id)
    },

    async delete(eventId: string) {
        await sleep()
        return deleteDoc(doc(db, c, eventId))
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
