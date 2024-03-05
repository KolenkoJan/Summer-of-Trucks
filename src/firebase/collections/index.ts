import { EventSchema, EventsApi } from "./events"
import { UserSchema, UserApi } from "./users"

export * as Interfaces from "./interfaces"

export const firebase = {
    api: {
        events: EventsApi,
        users: UserApi,
    },
    schema: {
        event: EventSchema,
        user: UserSchema,
    },
}
