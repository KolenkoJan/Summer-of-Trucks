import { makeAutoObservable } from "mobx"
import { Navigate, useNavigate } from "react-router-dom"

class _AuthService {
    isLoggedIn = false

    constructor() {
        makeAutoObservable(this)
    }
}

export const AuthService = new _AuthService()
