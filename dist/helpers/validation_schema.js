"use strict";

// import Joi from "joi";
// export const UserValidation=(data)=>{
//  const schema=Joi.object(
//     {
//         firstName:Joi.string().lowercase().required(),
//         lastName: Joi.string().lowercase().required(),
//         email:Joi.string().email().lowercase().required(),
//         password:Joi.string().min(2).required()
// });
// return schema.validate(data);
// }
const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required()
});
module.exports = {
  authSchema
};