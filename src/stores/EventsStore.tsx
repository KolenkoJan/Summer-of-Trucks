import { makeAutoObservable } from "mobx"
import { IEvent } from "../firebase/interfaces"

export class EventsStore {
    dbEvents: IEvent[] = []
    event: Partial<IEvent> = {}

    constructor() {
        makeAutoObservable(this)
    }

    setEvent<K extends keyof IEvent, V extends IEvent[K]>(key: K, value: V) {
        this.event[key] = value
    }

    createEvent() {
        this.dbEvents.push(this.event as IEvent)
        this.event = {}
    }
}
