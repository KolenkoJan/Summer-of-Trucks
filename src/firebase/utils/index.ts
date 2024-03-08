import { toJS } from "mobx"

export const FirebaseUtils = {
    toBody<T extends object>(body: T): Omit<T, "id"> {
        const copy = structuredClone(toJS(body))
        delete (copy as { id: unknown }).id
        return copy
    },
}
