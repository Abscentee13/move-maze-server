const Joi = require('joi');

const IdSchema = Joi.number()
  .integer()
  .min(1)
  .max(2_147_483_647)
  .required()
  .messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.min': 'ID must be a positive integer',
    'number.max': 'ID must be less than 2,147,483,647',
    'any.required': 'ID is required',
  });

const userSchema = Joi.object({
  name: Joi.string().required().min(4).max(64),
  email: Joi.string().email().required().min(3).max(255),
  avatarUrl: Joi.string().uri().min(8).max(255),
  password: Joi.string().required().min(6).max(64),
});

const gameSchema = Joi.object({
  voteAverage: Joi.number().required().min(0).max(5),
  title: Joi.string().required().min(1).max(255),
  rating: Joi.number().integer().required().min(0).max(5),
  description: Joi.string().required().min(1).max(255),
  posterUrl: Joi.string().uri().required().min(8).max(255),
});

//TODO: Add more schemas here

module.exports = {
  IdSchema,
  userSchema,
  gameSchema,
};
