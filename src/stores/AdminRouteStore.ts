import { makeAutoObservable } from "mobx"
import { ITodo } from "../firebase/interfaces"

export class AdminRouteStore {
    dbEvents: ITodo[] = []
    event: Partial<ITodo> = {}

    constructor() {
        makeAutoObservable(this)
    }

    setTodo<K extends keyof ITodo, V extends ITodo[K]>(key: K, value: V) {
        this.event[key] = value
    }

    createTodo() {
        this.dbEvents.push(this.event as ITodo)
        this.event = {}
    }
}
