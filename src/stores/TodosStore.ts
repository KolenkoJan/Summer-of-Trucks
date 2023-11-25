import { makeAutoObservable } from "mobx"

export class TodosStore {
    toggle = false

    todos = [1, 2, 3, 4, 5]

    constructor() {
        makeAutoObservable(this)
    }
}
