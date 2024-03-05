import { QueryConstraint, query, addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, where, setDoc } from "firebase/firestore"
import { Interfaces, db } from "../.."
import { HTTPStatusCode } from "../../error"
import { UserSchema } from "./Schema"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000)) // 1 second

const c = "users" // collection

export const UserApi = {
    async getOne(searchParams: Interfaces.IUserSearchParams) {
        if (!Object.keys(searchParams).length) {
            throw new Error("Search params must have at least one key-value pair.")
        }

        if (searchParams.id) {
            const snapshot = await getDoc(doc(db, c, searchParams.id))
            return { ...snapshot.data(), id: snapshot.id } as Interfaces.IUser
        }

        const queryConstraints: QueryConstraint[] = [limit(1)]
        if (searchParams?.email) {
            queryConstraints.push(where("email", "==", searchParams.email))
        }

        const snapshot = await getDocs(query(collection(db, c), ...queryConstraints))

        if (!snapshot.docs?.[0]) {
            throw new Error(HTTPStatusCode[404])
        }

        return snapshot.docs?.map((doc) => ({ ...doc.data(), id: doc.id }) as Interfaces.IUser)?.[0] as Interfaces.IUser
    },

    async getMany() {
        await sleep()

        const snapshot = await getDocs(collection(db, c))
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Interfaces.IUser)
    },

    async create(body: Omit<Interfaces.IUser, "id">) {
        await sleep()

        const schemaResult = UserSchema().validate(body)
        if (schemaResult.error) {
            throw new Error(HTTPStatusCode[400])
        }

        try {
            return await this.getOne({ email: body.email })
        } catch (error) {
            if (error.message === HTTPStatusCode[404]) {
                const doc = await addDoc(collection(db, c), body)
                return this.getOne({ id: doc.id })
            }

            throw new Error(HTTPStatusCode[999])
        }
    },

    async update(userId: string, body: Omit<Interfaces.IUser, "id">) {
        await sleep()

        const schemaResult = UserSchema().validate(body)
        if (schemaResult.error) {
            throw new Error(HTTPStatusCode[400])
        }

        await setDoc(doc(db, c, userId), body)
        return this.getOne({ id: userId })
    },

    async delete(userId: string) {
        await sleep()
        return deleteDoc(doc(db, c, userId))
    },
}
