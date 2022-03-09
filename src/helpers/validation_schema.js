import Joi from "joi";

export const registerValidation = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).required(),
    lastName: Joi.string().min(5).required(),
    role: Joi.string().min(5).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
}

export const blogValidation = (blog) => {
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    desc: Joi.string().min(6).required(),
    photo: Joi.string().min(3).required(),
    categories: Joi.string().min(6).required(),
  });
  return schema.validate(blog);
}

export const queryValidation = (query) => {
  const schema = Joi.object(
    {
      name: Joi.string().min(2),
      email: Joi.string().min(2).required().email(),
      message: Joi.string().min(10),
    });
  return schema.validate(query);
}
