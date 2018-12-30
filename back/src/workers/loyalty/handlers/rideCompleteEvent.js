'use strict';

const logger = require('chpr-logger');
const { ObjectId } = require('mongodb');

const { handleMessageError } = require('../../../lib/workers');
const riderModel = require('../../../models/riders');
const { RIDE, loyaltyBonus, loyaltyStatuses } = require('../../../constants/loyalty');

/**
 * Bus message handler for user ride creation event.
 *
 * @param   {Object} message The bus message object.
 * @param   {Object} messageFields The bus message metadata.
 * @returns {void}
 */
async function handleRideComplete(message, messageFields) {
  const { id: rideId, rider_id: riderId, amount: rideAmount} = message.payload;

  logger.info(
    { rider_id: riderId, ride_id: rideId, ride_amount: rideAmount },
    '[worker.handleRideComplete] Received user rideCreate event',
  );

  // TODO handle idempotency

  try {
    logger.info(
      { rider_id: riderId, ride_id: rideId, ride_amount: rideAmount},
      '[worker.handleRideComplete] Update rider',
    );
 
    const rider = await riderModel.findOneById(ObjectId(riderId));
    const ride = rider.rides.find(r => r.id === rideId);
    if (ride && ride.status === RIDE.STATUS.COMPLETED) throw new Error('ride already handled');
    await riderModel.collection().updateOne(
        { _id: ObjectId(riderId), "rides.id": rideId },
        { $set: {
            "rides.$.status": RIDE.STATUS.COMPLETED,
            "rides.$.amount": rideAmount,
            loyalty_points: calculateNewLoyaltyPoints(rider, rideAmount),
            status: calculateNewStatus(rider),
        }},
    );
  } catch (err) {
    handleMessageError(err, message, messageFields);
  }
}

/**
 * 
 * Calculate new rider loyalty_points after ride from event is applied.
 * 
 * @param {Object} rider the rider object.
 * @param {Integer} rideAmount the ride amount from event.
 * @return {Integer} new loyalty_points
 */
function calculateNewLoyaltyPoints(rider, rideAmount) {
    const { loyalty_points: loyaltyPoints, status } = rider;
    const bonus = loyaltyBonus[loyaltyStatuses.indexOf(status)];
    return loyaltyPoints + (Math.floor(rideAmount) * bonus);
}
/**
 * 
 * Define new rider status after ride from event is applied.
 * 
 * @param {Object} rider the rider object.
 * @return {String} new status.
 */
function calculateNewStatus(rider) {
    const rides = rider.rides.filter(ride => ride.status === RIDE.STATUS.COMPLETED).length + 1;
    if (rides < 20) return loyaltyStatuses[0];
    if (rides < 50) return loyaltyStatuses[1];
    if (rides < 100) return loyaltyStatuses[2];
    return loyaltyStatuses[3];
}

module.exports = handleRideComplete;
