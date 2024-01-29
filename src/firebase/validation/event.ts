import Joi, { ValidationResult } from "joi"
import { IEvent } from "../interfaces"

export const eventSchema = Joi.object<IEvent>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().greater("now").required(),
    address: Joi.string().allow(""),
    latitude: Joi.number(),
    longitude: Joi.number(),
})

export const validateEvent = (event: Partial<IEvent>): ValidationResult<IEvent> => {
    return eventSchema.validate(event, { abortEarly: false })
}
