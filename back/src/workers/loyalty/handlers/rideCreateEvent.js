'use strict';

const logger = require('chpr-logger');
const { ObjectId } = require('mongodb');

const { handleMessageError } = require('../../../lib/workers');
const riderModel = require('../../../models/riders');
const { RIDE } = require('../../../constants/loyalty');

/**
 * Bus message handler for user ride creation event.
 *
 * @param   {Object} message The bus message object.
 * @param   {Object} messageFields The bus message metadata.
 * @returns {void}
 */
async function handleRideCreate(message, messageFields) {
  const { id: rideId, rider_id: riderId, amount: rideAmount} = message.payload;

  logger.info(
    { rider_id: riderId, ride_id: rideId, ride_amount: rideAmount },
    '[worker.handleRideCreate] Received user rideCreate event',
  );

  // TODO handle idempotency

  try {
    logger.info(
      { rider_id: riderId, ride_id: rideId, ride_amount: rideAmount},
      '[worker.handleRideCreate] Update rider',
    );
    await riderModel.createRide(
      ObjectId(riderId),
      {
        id: rideId,
        amount: rideAmount,
        status: RIDE.STATUS.CREATED,
      }
    );
  } catch (err) {
    handleMessageError(err, message, messageFields);
  }
}

module.exports = handleRideCreate;
