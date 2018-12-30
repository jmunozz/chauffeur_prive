'use strict';

const Joi = require('../../lib/joi');

const signupSchema = Joi.object({
  type: Joi.string().required(),
  payload: Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string()
      .min(6)
      .required(),
  }),
});

const phoneUpdateSchema = Joi.object({
  type: Joi.string().required(),
  payload: Joi.object({
    id: Joi.objectId().required(),
    phone_number: Joi.string()
      .length(13)
      .required(),
  }),
});


const rideCreateSchema = Joi.object({
  type: Joi.string().required(),
  payload: Joi.object({
    id: Joi.objectId().required(),
    amount: Joi.number().positive().required(),
    rider_id: Joi.objectId().required(),
  }),
});

const rideCompleteSchema = Joi.object({
  type: Joi.string().required(),
  payload: Joi.object({
    id: Joi.objectId().required(),
    amount: Joi.number().positive().required(),
    rider_id: Joi.objectId().required(),
  }),
});



module.exports = {
  signupSchema,
  phoneUpdateSchema,
  rideCreateSchema,
  rideCompleteSchema,
};
