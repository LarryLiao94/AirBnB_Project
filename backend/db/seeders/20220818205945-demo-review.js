'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review: 'onereview',
        stars: 1
      },
      {
        userId: 2,
        spotId: 2,
        review: 'tworeview',
        stars: 2
      },
      {
        userId: 3,
        spotId: 3,
        review: 'threereview',
        stars: 3
      },
      {
        userId: 4,
        spotId: 4,
        review: 'fourreview',
        stars: 4
      },
      {
        userId: 5,
        spotId: 5,
        review: 'fivereview',
        stars: 5
      },
      {
        userId: 6,
        spotId: 6,
        review: 'sixreview',
        stars: 5
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete('Reviews', {});
  }
};
