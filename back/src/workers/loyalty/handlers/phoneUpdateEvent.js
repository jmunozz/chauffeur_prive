'use strict';

const logger = require('chpr-logger');
const { ObjectId } = require('mongodb');

const { handleMessageError } = require('../../../lib/workers');
const riderModel = require('../../../models/riders');


/**
 * Bus message handler for user updated phone events
 *
 * @param   {Object} message The bus message object.
 * @param   {Object} messageFields The bus message metadata.
 * @returns {void}
 */
async function handlePhoneUpdate(message, messageFields) {
    const { id: riderId, phone_number: phoneNumber } = message.payload;
  
    logger.info(
      { rider_id: riderId, rider_phone_number: phoneNumber },
      '[worker.handlePhoneUpdate] Received user PhoneUpdate event',
    );
  
    // TODO handle idempotency
  
    try {
      logger.info(
        { rider_id: riderId, rider_phone_number: phoneNumber },
        '[worker.handlePhoneUpdate] Update rider',
      );
      await riderModel.updateOne(
        ObjectId(riderId), 
        { phone_number: phoneNumber }
      );
    } catch (err) {
      handleMessageError(err, message, messageFields);
    }
  }
  
  module.exports = handlePhoneUpdate;