import Joi from "joi"
import { IUser } from "../interfaces"

export const UserSchema = () =>
    Joi.object<IUser>({
        id: Joi.string().optional(),
        displayName: Joi.string().required(),
        email: Joi.string().email().required(),
        isAdmin: Joi.boolean().optional(),
        photoURL: Joi.string(),
    }).required()
