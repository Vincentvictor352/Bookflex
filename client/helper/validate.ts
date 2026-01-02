import Joi from "joi";

export const CreateUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  message: Joi.string().min(4).required().messages({
    "string.empty": "message is required",
    "string.min": "message must be at least 4 characters",
  }),
});
