import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { makeAutoObservable } from "mobx"
import { type NavigateFunction } from "react-router-dom"
import { Interfaces, auth } from "../firebase"
import { FirebaseApi } from "../firebase/api"
import { HTTPStatusCode } from "../firebase/error"
import { UserStore } from "../stores/UserStore"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))

class _AuthService {
    isGettingAuth = false
    isGettingAuthData = false
    authenticatedUser: Interfaces.IUser | undefined // Added user property to store user information
    userStore: UserStore = new UserStore()
    private readonly auth = auth

    constructor() {
        makeAutoObservable(this, {})
        this.isGettingUserAuth()
    }

    async isGettingUserAuth(): Promise<void> {
        this.isGettingAuthData = true
        await sleep()
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            this.authenticatedUser = JSON.parse(storedUser)
        } else {
            this.authenticatedUser = undefined
        }
        this.isGettingAuthData = false
    }

    async signInWithGoogle(navigate: NavigateFunction): Promise<void> {
        this.isGettingAuth = true
        this.auth.useDeviceLanguage()

        try {
            await sleep()

            const signInResult = await signInWithPopup(this.auth, new GoogleAuthProvider())

            if (!signInResult.user.displayName || !signInResult.user.email || !signInResult.user.photoURL) {
                throw new Error(HTTPStatusCode[400])
            }

            const user = await FirebaseApi.User.create({
                displayName: signInResult.user.displayName!,
                email: signInResult.user.email!,
                photoURL: signInResult.user.photoURL!,
                isAdmin: false,
            })

            if (signInResult.user) {
                this.authenticatedUser = user
                this.userStore.users.push(this.authenticatedUser)
                localStorage.setItem("user", JSON.stringify(this.authenticatedUser))
                navigate("/dashboard")
            }
        } catch (error) {
            alert(`Error logging in: ${error.message}`)
        } finally {
            await sleep()
            this.isGettingAuth = false
        }
    }

    async logout(navigate: NavigateFunction): Promise<void> {
        this.isGettingAuth = true
        try {
            await sleep()
            await signOut(this.auth)
            localStorage.removeItem("user")
            this.authenticatedUser = undefined
            navigate("")
        } catch (error) {
            alert(`Error: ${error.message}`)
        } finally {
            this.isGettingAuth = false
        }
    }
}

export const AuthService = new _AuthService()
