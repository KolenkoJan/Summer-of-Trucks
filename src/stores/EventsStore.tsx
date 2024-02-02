// EventsStore.ts

import { makeAutoObservable } from "mobx"
import { IEvent } from "../firebase/interfaces"
import { ValidationResult } from "joi"
import { JoiSchema } from "../joi/JoiSchema"
import { getEventSchema } from "../firebase/schemas/Event"
import { FirebaseApi } from "../firebase/api"

export class EventsStore {
    dbEvents: IEvent[] = []
    event: Partial<IEvent> = {}
    validationResult: ValidationResult | undefined = undefined
    eventSchema = JoiSchema(getEventSchema())

    constructor() {
        makeAutoObservable(this)
        this.createEvent = this.createEvent.bind(this)
    }

    setEvent<K extends keyof IEvent, V extends IEvent[K]>(key: K, value: V) {
        this.event[key] = value
        this.eventSchema.validateKey(key, this.event)
    }

    async createEvent() {
        this.eventSchema.validate(this.event)

        if (!this.eventSchema.isValid) {
            alert("Validation failed!")
            return
        }

        try {
            const event = await FirebaseApi.Events.create(this.event as IEvent)
            this.dbEvents.push(event)
            this.event = {}
            this.eventSchema.clear()
        } catch (error) {
            alert(error.message)
        }
    }

    deleteEvent(index: number) {
        this.dbEvents.splice(index, 1)
    }
}
