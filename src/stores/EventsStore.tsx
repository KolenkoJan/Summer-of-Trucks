// EventsStore.ts

import { makeAutoObservable } from "mobx"
import { IEvent } from "../firebase/interfaces"
import { validateEvent } from "../firebase/validation/validate"
import { ValidationResult } from "joi"

export class EventsStore {
    dbEvents: IEvent[] = []
    event: Partial<IEvent> = {}
    validationErrors: string[] = []

    constructor() {
        makeAutoObservable(this)
        this.createEvent = this.createEvent.bind(this)
    }

    setEvent<K extends keyof IEvent, V extends IEvent[K]>(key: K, value: V) {
        this.event[key] = value
    }

    createEvent(): ValidationResult {
        const validationResult = validateEvent(this.event as Partial<IEvent>)
        console.log(validationResult.error)

        if (validationResult.error) {
            console.error("Validation Error:", validationResult)

            this.validationErrors = validationResult.error.details.map((detail) => detail.message)

            console.log(this.validationErrors)

            return validationResult
        }

        this.dbEvents.push(this.event as IEvent)
        this.event = {}
        this.validationErrors = []
        console.log(this.dbEvents)
    }

    deleteEvent(index: number) {
        this.dbEvents.splice(index, 1)
    }
}
