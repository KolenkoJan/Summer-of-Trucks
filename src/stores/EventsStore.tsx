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
    isDeletingEvent: boolean[] = []
    isCreatingEvent = false
    isLoadingEvents = false
    gettingEventError: Error | undefined

    constructor() {
        makeAutoObservable(this)
        this.createEvent = this.createEvent.bind(this)
    }

    setEvent<K extends keyof IEvent, V extends IEvent[K]>(key: K, value: V | File) {
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
            const event = await FirebaseApi.Events.create(this.event as IEvent)
            this.dbEvents.push(event)
            console.log(this.event)
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
            await FirebaseApi.Events.delete(this.dbEvents[eventID].id)
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
            const events = await FirebaseApi.Events.getMany()
            this.dbEvents = events
        } catch (error) {
            this.gettingEventError = error
        } finally {
            this.isLoadingEvents = false
        }
    }
}
