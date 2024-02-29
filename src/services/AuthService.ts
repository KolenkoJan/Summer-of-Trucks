import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { makeAutoObservable } from "mobx"
import { type NavigateFunction } from "react-router-dom"
import { Interfaces, auth, firebase } from "../firebase"
import { HTTPStatusCode } from "../firebase/error"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))

class _AuthService {
    isAdminAuth = false
    gettingError: Error | undefined
    isGettingAuth = false
    isGettingAuthData = false
    authenticatedUser: Interfaces.IUser | undefined // Added user property to store user information
    private readonly auth = auth

    constructor() {
        makeAutoObservable(this, {}, { deep: true })
        this.isGettingUserAuth()
    }

    async isGettingUserAuth(): Promise<void> {
        this.isGettingAuthData = true
        await sleep()
        const storedUser = localStorage.getItem("user")
        // Retrieve user information from local storage
        const storedAdminUser = localStorage.getItem("isAdmin")

        if (storedUser) {
            this.authenticatedUser = JSON.parse(storedUser)
        }

        if (storedAdminUser) {
            this.isAdminAuth = true
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

            const user = await firebase.api.users.create({
                displayName: signInResult.user.displayName!,
                email: signInResult.user.email!,
                photoURL: signInResult.user.photoURL!,
            })

            if (signInResult.user) {
                this.authenticatedUser = user
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

    async signInWithGoogleAsAdmin(navigate: NavigateFunction): Promise<void> {
        this.isGettingAuth = true
        this.auth.useDeviceLanguage()

        try {
            await sleep()
            const signInResult = await signInWithPopup(this.auth, new GoogleAuthProvider())

            if (!signInResult.user.displayName || !signInResult.user.email || !signInResult.user.photoURL) {
                throw new Error(HTTPStatusCode[400])
            }

            const user = await firebase.api.users.create({
                displayName: signInResult.user.displayName!,
                email: signInResult.user.email!,
                photoURL: signInResult.user.photoURL!,
            })

            if (signInResult.user) {
                this.authenticatedUser = user
                localStorage.setItem("user", JSON.stringify(this.authenticatedUser))
                this.isAdminAuth = true
                localStorage.setItem("isAdmin", "true")
                navigate("/admin")
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
            localStorage.removeItem("isAdmin")
            this.authenticatedUser = undefined
            this.isAdminAuth = false
            navigate("")
        } catch (error) {
            this.gettingError = error
            alert(`Error: ${this.gettingError?.message}`)
        } finally {
            this.isGettingAuth = false
        }
    }
}

export const AuthService = new _AuthService()
