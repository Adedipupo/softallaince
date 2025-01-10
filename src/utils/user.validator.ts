import Joi from "joi";

export const validateCreateUser = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error("any.invalid");
      }
      if (value.length < 5) {
        return helpers.error("any.invalid");
      }
      if (!/\d|[^A-Za-z0-9]/.test(value)) {
        return helpers.error("any.invalid");
      }

      return value;
    }, "Password validation"),
});