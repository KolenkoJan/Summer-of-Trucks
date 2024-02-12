import { GoogleAuthProvider, type User, signInWithPopup, signOut } from "firebase/auth"
import { makeAutoObservable } from "mobx"
import { type NavigateFunction } from "react-router-dom"
import { auth } from "../firebase"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000))

class _AuthService {
    isAdminAuth = true
    gettingError: Error | undefined
    isGettingAuth = false
    isGettingBackdrop = false
    authenticatedUser: User | null = null // Added user property to store user information
    private readonly auth = auth

    constructor() {
        makeAutoObservable(this, {}, { deep: false })
        this.getUserAuth()
    }

    async getUserAuth(): Promise<void> {
        this.isGettingBackdrop = true
        await sleep()
        this.isGettingBackdrop = false
        const storedUser = localStorage.getItem("user") // Retrieve user information from local storage

        try {
            storedUser
        } catch (error) {
            this.gettingError = error
            alert(`Error fetching user: ${this.gettingError?.message}`)
        } finally {
            if (storedUser) {
                this.authenticatedUser = JSON.parse(storedUser)
            }
        }
    }

    async signInWithGoogle(navigate: NavigateFunction): Promise<User | null> {
        this.isGettingAuth = true
        await sleep()
        this.auth.useDeviceLanguage()

        try {
            const signInResult = await signInWithPopup(this.auth, new GoogleAuthProvider())

            if (signInResult.user) {
                this.authenticatedUser = signInResult.user
                localStorage.setItem("user", JSON.stringify(this.authenticatedUser)) // Add user information to local storage
                navigate("/")
            }
            this.isGettingBackdrop = true
            await sleep()

            return signInResult.user
        } catch (error) {
            this.gettingError = error
            alert(`Error logging in: ${this.gettingError?.message}`)
            return null
        } finally {
            this.isGettingAuth = false
            this.isGettingBackdrop = false
        }
    }

    async logout(navigate: NavigateFunction): Promise<void> {
        this.isGettingBackdrop = true
        await sleep()
        const signOutResult = await signOut(this.auth)

        try {
            signOutResult
            this.authenticatedUser = null
            localStorage.removeItem("user") // Remove user information from local storage
            navigate("")
        } catch (error) {
            this.gettingError = error
            alert(`Error: ${this.gettingError?.message}`)
        } finally {
            this.isGettingBackdrop = false
        }
    }
}

export const AuthService = new _AuthService()
