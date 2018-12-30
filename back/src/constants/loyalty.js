'use strict';

const loyaltyStatuses = ['bronze', 'silver', 'gold', 'platinum'];
const loyaltyBonus = [1, 3, 5, 10];

module.exports = {
  loyaltyStatuses,
  loyaltyBonus,
  RIDE: {
    STATUS: {
      CREATED: 'created',
      COMPLETED: 'completed',
      CANCELLED: 'cancelled',
    }
  }
};
