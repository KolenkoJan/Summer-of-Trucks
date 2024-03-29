import Joi from "joi"
import { IEvent } from "./Interface"

export const EventSchema = () =>
    Joi.object<IEvent>({
        title: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.date().greater("now").required(),
        address: Joi.string().allow(""),
        latitude: Joi.number(),
        longitude: Joi.number(),
        photo: Joi.object(),
        userIds: Joi.array().items(Joi.string()).optional(),
    }).required()
