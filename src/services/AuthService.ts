import { makeAutoObservable } from "mobx"
import { type NavigateFunction } from "react-router-dom"

class _AuthService {
    isLoggedIn = true
    isAdmin = true

    constructor() {
        makeAutoObservable(this)
    }

    logIn = () => {
        this.isLoggedIn = true
    }

    logOut = (navigate: NavigateFunction) => {
        this.isLoggedIn = false
        navigate("/")
    }
}

export const AuthService = new _AuthService()
