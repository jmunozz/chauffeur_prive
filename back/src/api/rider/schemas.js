'use strict';

const Joi = require('../../lib/joi');
const { loyaltyStatuses } = require('../../constants/loyalty');

const getLoyaltyInfoSchema = Joi.object().keys({
  rider_id: Joi.objectId().required(),
});


const getAllLoyaltyInfoSchema = Joi.object().keys({
  page: Joi.number().min(0).default(0),
  size: Joi.number().min(1).max(200).default(20),
  status: Joi.valid(loyaltyStatuses),
  sort: Joi.valid('loyalty_points', 'rides_count').default('rides_count'),
})

module.exports = { 
  getLoyaltyInfoSchema,
  getAllLoyaltyInfoSchema,
};
