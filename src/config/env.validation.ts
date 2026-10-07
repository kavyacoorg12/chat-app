import Joi from "joi";

export const envValidationSchema=Joi.object({
  MONGODB_URI:Joi.string().required(),
  PORT:Joi.number().required()
})