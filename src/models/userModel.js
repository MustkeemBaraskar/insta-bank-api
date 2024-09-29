const Joi = require("joi");

const userSchema = Joi.object({
  userName: Joi.string().required(),
  birthDate: Joi.date().iso().required(), // iso format for date validation
  education: Joi.string().required(),
  job: Joi.string().required(),
  cast: Joi.string().required(),
  subCast: Joi.string().required(),
  devak: Joi.string().required(),
  ras: Joi.string().required(),
  gan: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+','B-', 'O+', 'O-','AB+','AB-').required(),
  demands: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  religion: Joi.string().required(),
  caste: Joi.string().required(),
  photos: Joi.array().items(Joi.string()).required(), // for multiple photos are expected
});

const validateUser = (data) => {
  return userSchema.validate(data);
};

module.exports = { validateUser };
