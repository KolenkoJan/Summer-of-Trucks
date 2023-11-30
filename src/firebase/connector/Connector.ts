import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { Interfaces, db } from ".."

export const FirebaseConnector = {
    events: {
        get: async () => {
            const snapshot = await getDocs(collection(db, "events"))
            const events = snapshot.docs.map((doc) => doc.data())
            return events as Interfaces.IEvent[]
        },

        create: async (body: Interfaces.IEvent) => {
            const document = doc(db, "events")
            return setDoc(document, body)
        },

        update: async (body: Interfaces.IEvent) => {
            const document = doc(db, "events", "id")
            return updateDoc(document, {
                body,
            })
        },

        delete: async (eventId: string) => {
            const document = doc(db, "events", eventId)
            return deleteDoc(document)
        },
    },
}
