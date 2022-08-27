'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Images', [
      {
        imageableId: 1,
        imageableType: 'spot',
        url: 'PC/image1'
      },
      {
        imageableId: 2,
        imageableType: 'spot',
        url: 'PC/image2'
      },
      {
        imageableId: 3,
        imageableType: 'spot',
        url: 'PC/image3'
      },
      {
        imageableId: 4,
        imageableType: 'spot',
        url: 'PC/image4'
      },
      {
        imageableId: 1,
        imageableType: 'review',
        url: 'PC/image5'
      },
      {
        imageableId: 2,
        imageableType: 'review',
        url: 'PC/image6'
      },
      {
        imageableId: 3,
        imageableType: 'review',
        url: 'PC/image7'
      },
      {
        imageableId: 4,
        imageableType: 'review',
        url: 'PC/image8'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete('Images', {});
  }
};
