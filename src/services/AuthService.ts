import { makeAutoObservable } from "mobx"

class _AuthService {
    isLoggedIn = false

    constructor() {
        makeAutoObservable(this)
    }
}

export const AuthService = new _AuthService()
