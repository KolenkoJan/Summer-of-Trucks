import { makeAutoObservable } from "mobx"
import { Interfaces, firebase } from "../firebase"
import { IUser } from "../firebase/collections/interfaces"

export class UserStore {
    users: Interfaces.IUser[] = []
    gettingError: Error | undefined
    isGettingUsersFromDb = false
    isDeletingUserFromDb: boolean[] = []
    isMakingUserAdmin: Record<string, boolean> = {}

    constructor() {
        makeAutoObservable(this)
    }

    async setUser<K extends keyof IUser, V extends IUser[K]>(user: Interfaces.IUser, key: K, value: V) {
        user[key] = value
    }

    async updateUser(user: Interfaces.IUser) {
        this.isMakingUserAdmin[user.id] = true
        try {
            await firebase.api.users.update(user.id, user)
        } catch (error) {
            alert(`Error updating user admin status: ${error.message}`)
        } finally {
            this.isMakingUserAdmin[user.id] = false
        }
    }

    async isGettingUsersFromDatabase() {
        this.isGettingUsersFromDb = true
        try {
            const users = await firebase.api.users.getMany()
            this.users = users
        } catch (error) {
            alert(`Error: ${error.message}`)
        } finally {
            this.isGettingUsersFromDb = false
        }
    }

    async removeUserFromDb(userID: number) {
        this.isDeletingUserFromDb[userID] = true

        try {
            await firebase.api.users.delete(this.users[userID].id)
            this.users.splice(userID, 1)
        } catch (error) {
            alert(`Error: ${error.message}`)
        } finally {
            this.isDeletingUserFromDb[userID] = false
        }
    }
}
