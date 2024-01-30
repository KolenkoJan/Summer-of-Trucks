// EventsStore.ts

import { makeAutoObservable } from "mobx"
import { IEvent } from "../firebase/interfaces"
import { validateEvent } from "../firebase/validation/event"
import { ValidationErrorItem, ValidationResult } from "joi"

export class EventsStore {
    dbEvents: IEvent[] = []
    event: Partial<IEvent> = {}
    validationResult: ValidationResult | undefined = undefined

    get areAllFieldsValid(): boolean {
        return !this.validationResult?.error
    }

    constructor() {
        makeAutoObservable(this)
        this.validationResult = validateEvent({} as Partial<IEvent>)
        this.createEvent = this.createEvent.bind(this)
        this.getErrorForKey = this.getErrorForKey.bind(this)
    }

    setEvent<K extends keyof IEvent, V extends IEvent[K]>(key: K, value: V) {
        this.event[key] = value
        this.validationResult = validateEvent(this.event as Partial<IEvent>)
    }

    createEvent() {
        this.validationResult = validateEvent(this.event as Partial<IEvent>)

        if (!this.validationResult?.error) {
            this.dbEvents.push(this.event as IEvent)
            this.event = {}
            this.validationResult = validateEvent({} as Partial<IEvent>)
        }
    }

    deleteEvent(index: number) {
        this.dbEvents.splice(index, 1)
    }

    getErrorForKey(key: keyof IEvent): ValidationErrorItem | undefined {
        if (this.validationResult?.error) {
            return this.validationResult.error.details.find((detail) => detail.context?.key === key)
        }
        return undefined
    }
}
