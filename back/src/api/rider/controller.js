'use strict';

const HttpStatus = require('http-status-codes');
const logger = require('chpr-logger');

const Joi = require('../../lib/joi');
const riders = require('../../models/riders');

const { getLoyaltyInfoSchema, getAllLoyaltyInfoSchema } = require('./schemas');

/**
 * Get current rider status
 *
 * @param {Object} req express request
 * @param {Object} res express response
 *
 * @returns {Object} response
 */
async function getLoyaltyInfo(req, res) {
  const { error, value: validatedParams } = Joi.validate(
    req.params,
    getLoyaltyInfoSchema,
  );

  if (error) {
    logger.error({ error }, '[loyalty#getLoyaltyInfo] Error: invalid body');
    return res.sendStatus(HttpStatus.BAD_REQUEST);
  }

  const { rider_id: riderId } = validatedParams;
  logger.info(
    { rider_id: riderId },
    '[loyalty#getLoyaltyInfo] Rider info requested',
  );

  const rider = await riders.findOneById(riderId, { name: 1, status: 1, loyalty_points: 1, rides: 1 });
  if (!rider) {
    logger.info(
      { rider_id: riderId },
      '[loyalty#getLoyaltyInfo] User does not exist',
    );
    return res.sendStatus(HttpStatus.NOT_FOUND);
  }

  return res.send(rider);
}



/**
 * Get all rider loyalty infos
 *
 * @param {Object} req express request
 * @param {Object} res express response
 *
 * @returns {Object} response
 */
async function getAllLoyaltyInfo(req, res) {


 

  const { error, value: validatedParams } = Joi.validate(
    Object.assign({}, req.query, req.params),
    getAllLoyaltyInfoSchema,
  );

  if (error) {
    logger.error({ error }, '[loyalty#getAllLoyaltyInfo] Error: invalid body');
    return res.sendStatus(HttpStatus.BAD_REQUEST);
  }

  
  const { sort, page, size, status } = validatedParams;
  const pipeline = [];
  if (status) {
    pipeline.push({ $match: { status }});
  }
  pipeline.push(
    {
      $project: {
        name: 1, 
        status: 1, 
        rides: 1,
        loyalty_points: 1,
        rides_count: { $size: "$rides" }
      }
    }
  );
  const cursor = await riders.collection().aggregate(pipeline);
  cursor.sort({ [sort]: -1 }).skip(page * size).limit(size);
  const allRiders = await cursor.toArray();
  return res.send(allRiders);

}


module.exports = {
  getLoyaltyInfo,
  getAllLoyaltyInfo,
};
