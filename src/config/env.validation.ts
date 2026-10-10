import Joi from "joi";

export const envValidationSchema=Joi.object({
  MONGODB_URI:Joi.string().required(),
  PORT:Joi.number().required(),
  JWT_SECRET:Joi.string().required(),
  JWT_EXPIRE_IN:Joi.number().positive().required()
})