// EventsStore.ts

import { makeAutoObservable } from "mobx"
import { IEvent } from "../firebase/interfaces"
import { ValidationResult } from "joi"
import { JoiSchema } from "../joi/JoiSchema"
import { getEventSchema } from "../firebase/schemas/event"

export class EventsStore {
    dbEvents: IEvent[] = []
    event: Partial<IEvent> = {}
    validationResult: ValidationResult | undefined = undefined
    eventSchema = JoiSchema(getEventSchema())

    get areAllFieldsValid(): boolean {
        return this.eventSchema.isValid
    }

    constructor() {
        makeAutoObservable(this)
        this.createEvent = this.createEvent.bind(this)
    }

    setEvent<K extends keyof IEvent, V extends IEvent[K]>(key: K, value: V) {
        this.event[key] = value
        this.eventSchema.validate(this.event)
        this.eventSchema.validateKey
    }

    createEvent() {
        this.eventSchema.validate(this.event)

        if (!this.eventSchema.isValid) {
            return
        }

        this.dbEvents.push(this.event as IEvent)
        this.event = {}
        this.eventSchema.clear()
    }

    deleteEvent(index: number) {
        this.dbEvents.splice(index, 1)
    }
}
