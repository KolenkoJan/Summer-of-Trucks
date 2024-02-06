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
    isSavingId: boolean[] = []
    isVisible = false
    isSaving = false
    error: Error | undefined

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
        this.isVisible = true

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
            alert(error)
        } finally {
            this.isVisible = false
        }
    }

    async deleteEvent(eventID: number) {
        this.isSavingId[eventID] = true
        try {
            await FirebaseApi.Events.delete(this.dbEvents[eventID].id)
            this.dbEvents.splice(eventID, 1)
        } catch (error) {
            alert(error)
        } finally {
            this.isSavingId[eventID] = false
        }
    }

    async getEvents() {
        this.isSaving = true
        try {
            const events = await FirebaseApi.Events.getMany()
            this.dbEvents = events
        } catch (error) {
            this.error = error
        } finally {
            this.isSaving = false
        }
    }
}
