// EventsStore.ts

import { makeAutoObservable } from "mobx"
import { IEvent } from "../firebase/interfaces"
import { validateEvent } from "../firebase/validation/event"
import { ValidationErrorItem, ValidationResult } from "joi"

export class EventsStore {
    dbEvents: IEvent[] = []
    event: Partial<IEvent> = {}
    validationResult: ValidationResult | undefined = undefined
    modifiedFields: Set<keyof IEvent> = new Set()

    constructor() {
        makeAutoObservable(this)
        this.validationResult = validateEvent({} as Partial<IEvent>)
        this.createEvent = this.createEvent.bind(this)
        this.getErrorForKey = this.getErrorForKey.bind(this)
    }

    setEvent<K extends keyof IEvent, V extends IEvent[K]>(key: K, value: V) {
        this.event[key] = value
        this.modifiedFields.add(key)
        this.validationResult = validateEvent(this.event as Partial<IEvent>)
    }

    createEvent() {
        this.validationResult = validateEvent(this.event as Partial<IEvent>)

        if (!this.validationResult?.error) {
            this.dbEvents.push(this.event as IEvent)
            this.event = {}
            this.modifiedFields.clear()
            this.validationResult = validateEvent({} as Partial<IEvent>)
        }
    }

    deleteEvent(index: number) {
        this.dbEvents.splice(index, 1)
    }

    getErrorForKey(key: keyof IEvent): ValidationErrorItem | undefined {
        if (this.modifiedFields.has(key) && this.validationResult?.error) {
            return this.validationResult.error.details.find((detail) => detail.context?.key === key)
        }
        return undefined
    }

    getRequiredMessage(key: keyof IEvent): string | undefined {
        if (this.validationResult?.error) {
            const errorForKey = this.validationResult.error.details.find((detail) => detail.context?.key === key)
            return errorForKey ? "obvezno*" : undefined
        }
        return undefined
    }

    areAllFieldsValid(): boolean {
        return !this.validationResult?.error
    }
}
