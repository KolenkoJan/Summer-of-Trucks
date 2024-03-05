// EventsStore.ts

import { makeAutoObservable } from "mobx"
import { ValidationResult } from "joi"
import { JoiSchema } from "../joi/JoiSchema"
import { Interfaces, firebase } from "../firebase"

export class EventsStore {
    dbEvents: Interfaces.IEvent[] = []
    event: Partial<Interfaces.IEvent> = {}
    validationResult: ValidationResult | undefined = undefined
    eventSchema = JoiSchema(firebase.schema.event())
    isDeletingEvent: boolean[] = []
    isCreatingEvent = false
    isLoadingEvents = false
    gettingEventError: Error | undefined

    constructor() {
        makeAutoObservable(this)
        this.createEvent = this.createEvent.bind(this)
    }

    setEvent<K extends keyof Interfaces.IEvent, V extends Interfaces.IEvent[K]>(key: K, value: V) {
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
            this.isCreatingEvent = true
            const event = await firebase.api.events.create(this.event as Interfaces.IEvent)
            this.dbEvents.push(event)
            this.event = {}
            this.eventSchema.clear()
        } catch (error) {
            alert(error)
        } finally {
            this.isCreatingEvent = false
        }
    }

    async deleteEvent(eventID: number) {
        this.isDeletingEvent[eventID] = true
        try {
            await firebase.api.events.delete(this.dbEvents[eventID].id)
            this.dbEvents.splice(eventID, 1)
        } catch (error) {
            alert(error)
        } finally {
            this.isDeletingEvent[eventID] = false
        }
    }

    async getEvents() {
        this.isLoadingEvents = true
        try {
            const events = await firebase.api.events.getMany()
            this.dbEvents = events
        } catch (error) {
            this.gettingEventError = error
        } finally {
            this.isLoadingEvents = false
        }
    }
}
