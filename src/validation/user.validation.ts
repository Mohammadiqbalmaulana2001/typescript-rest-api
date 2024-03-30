import Joi from "joi";
import UserType from "../types/user.type";

export const createUserValidation = (payload: UserType) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().allow('', null)
    })

    return schema.validate(payload)
}

export const loginUserValidation = (payload: UserType) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    return schema.validate(payload)
}