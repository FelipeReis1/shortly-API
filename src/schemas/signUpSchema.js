import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().min(1).email().required(),
  password: joi.string().min(1).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

export default signUpSchema;
