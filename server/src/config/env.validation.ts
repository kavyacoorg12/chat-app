import Joi from "joi";

export const envValidationSchema=Joi.object({
  MONGODB_URI:Joi.string().required(),
  PORT:Joi.number().required(),
  JWT_SECRET:Joi.string().required(),
  JWT_EXPIRE_IN:Joi.number().positive().required(),
  COOKIE_MAX_AGE:Joi.number().positive().required(),
  FRONTEND_URL:Joi.string().uri().required(),
  CLOUDINARY_CLOUD_NAME:Joi.string().required(),
  CLOUDINARY_API_KEY:Joi.string().required(),
  CLOUDINARY_API_SECRET:Joi.string().required()
})