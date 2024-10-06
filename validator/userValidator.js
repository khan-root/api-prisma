import Joi from 'joi'
export const userSchema = Joi.object({
    name: Joi.string().required().messages({
        // "any.required": "{{#label}} is required!!",
        "string.empty": "Name can't be empty",
    }),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role:Joi.string().required()
})