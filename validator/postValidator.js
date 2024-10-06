import Joi from "joi";

export const postSchema = Joi.object({

    title:Joi.string().trim().min(1).required(),
    content: Joi.string().required(),
    published:Joi.boolean().strict().required(),
})