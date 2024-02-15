import { GoogleAuthProvider, type User, signInWithPopup, signOut } from "firebase/auth"
import { makeAutoObservable } from "mobx"
import { type NavigateFunction } from "react-router-dom"
import { auth } from "../firebase"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))

class _AuthService {
    isAdminAuth = true
    gettingError: Error | undefined
    isGettingAuth = false
    isGettingAuthData = false
    authenticatedUser: User | null = null // Added user property to store user information
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

        if (storedUser) {
            this.authenticatedUser = JSON.parse(storedUser)
        }
        this.isGettingAuthData = false
    }

    async signInWithGoogle(navigate: NavigateFunction): Promise<void> {
        this.isGettingAuth = true
        this.auth.useDeviceLanguage()

        try {
            await sleep()
            const signInResult = await signInWithPopup(this.auth, new GoogleAuthProvider())

            if (signInResult.user) {
                this.authenticatedUser = signInResult.user
                localStorage.setItem("user", JSON.stringify(this.authenticatedUser)) // Add user information to local storage
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
            localStorage.removeItem("user") // Remove user information from local storage
            this.authenticatedUser = null
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
