// EventsStore.ts

import { makeAutoObservable } from "mobx"
import { IEvent } from "../firebase/interfaces"
import { validateEvent } from "../firebase/validation/validate"
import { ValidationErrorItem, ValidationResult } from "joi"

export class EventsStore {
    dbEvents: IEvent[] = []
    event: Partial<IEvent> = {}
    validationResult: ValidationResult | null = null

    constructor() {
        makeAutoObservable(this)
        this.createEvent = this.createEvent.bind(this)
        this.getErrorForKey = this.getErrorForKey.bind(this)
    }

    setEvent<K extends keyof IEvent, V extends IEvent[K]>(key: K, value: V) {
        this.event[key] = value
    }

    createEvent() {
        this.validationResult = validateEvent(this.event as Partial<IEvent>)

        if (!this.validationResult?.error) {
            this.dbEvents.push(this.event as IEvent)
            this.event = {}
        }
    }

    deleteEvent(index: number) {
        this.dbEvents.splice(index, 1)
    }

    getErrorForKey(key: keyof IEvent): ValidationErrorItem | undefined {
        return this.validationResult?.error?.details.find((detail) => detail.context?.key === key)
    }
}
