import Joi from "joi";

interface ProduxtValidation {
    name: string;
    price: number;
}

export const createProductValidation = (payload: ProduxtValidation) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().allow('',null)
    })

    return schema.validate(payload)
}