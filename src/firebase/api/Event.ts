import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { Interfaces, db } from ".."

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000)) // 1 second

export const Events = {
    async getMany() {
        await sleep()
        const snapshot = await getDocs(collection(db, "events"))
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Interfaces.IEvent)
    },

    async getOne(eventId: string) {
        const snapshot = await getDoc(doc(db, "events", eventId))
        return { ...snapshot.data(), id: snapshot.id } as Interfaces.IEvent
    },

    async create(body: Interfaces.IEvent) {
        await sleep()
        const doc = await addDoc(collection(db, "events"), body)
        return this.getOne(doc.id)
    },

    async update(eventId: string, body: Interfaces.IEvent) {
        await sleep()
        await updateDoc(doc(db, "events", eventId), {
            body,
        })
        return this.getOne(body.id)
    },

    async delete(eventId: string) {
        await sleep()
        return deleteDoc(doc(db, "events", eventId))
    },
}
