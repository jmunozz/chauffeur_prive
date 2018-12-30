'use strict';

const handleSignupEvent = require('./signupEvent');
const handlePhoneUpdateEvent = require('./phoneUpdateEvent');
const handleRideCreateEvent = require('./rideCreateEvent');
const handleRideCompleteEvent = require('./rideCompleteEvent');

module.exports = {
  handleSignupEvent,
  handlePhoneUpdateEvent,
  handleRideCreateEvent,
  handleRideCompleteEvent,
};
