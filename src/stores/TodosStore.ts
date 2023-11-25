import { makeAutoObservable } from "mobx"

export class TodosStore {
    todos = [1, 2, 3, 4, 5]

    constructor() {
        makeAutoObservable(this)
    }
}
