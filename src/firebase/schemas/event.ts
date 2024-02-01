import Joi from "joi"
import { IEvent } from "../interfaces"

export const getEventSchema = () => {
    return Joi.object<IEvent>({
        title: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.date().greater("now").required(),
        address: Joi.string().allow(""),
        latitude: Joi.number(),
        longitude: Joi.number(),
    }).required()
}
