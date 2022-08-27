'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Trips', [
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2022-09-09'),
        endDate: new Date('2022-09-10')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2022-10-10'),
        endDate: new Date('2022-10-15')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2022-11-11'),
        endDate: new Date('2022-11-21')
      },
      {
        spotId: 4,
        userId: 4,
        startDate: new Date('2022-12-12'),
        endDate: new Date('2022-12-30')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete('Trips', {});
  }
};
