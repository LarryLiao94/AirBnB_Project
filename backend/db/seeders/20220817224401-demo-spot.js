'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: 'first address',
        city: 'firstCity',
        state: 'firstState',
        country: 'firstCountry',
        lat: 111.11,
        lng: 111.11,
        name: "firstName",
        description: 'first description of the first spot',
        price: 11.11,
        previewImage: "first url"
      },
      {
        ownerId: 2,
        address: 'second address',
        city: 'secondCity',
        state: 'secondState',
        country: 'secondCountry',
        lat: 222.22,
        lng: 222.22,
        name: "secondName",
        description: 'second description of the first spot',
        price: 22.22,
        previewImage: "second url"
      },
      {
        ownerId: 3,
        address: 'third address',
        city: 'thirdCity',
        state: 'thirdState',
        country: 'thirdCountry',
        lat: 333.33,
        lng: 333.33,
        name: "thirdName",
        description: 'third description of the first spot',
        price: 33.33,
        previewImage: "third url"
      },
      {
        ownerId: 4,
        address: 'fourth address',
        city: 'fourthCity',
        state: 'fourthState',
        country: 'fourthCountry',
        lat: 444.44,
        lng: 444.44,
        name: "fourthName",
        description: 'fourth description of the first spot',
        price: 44.44,
        previewImage: "fourth url"
      },
      {
        ownerId: 5,
        address: 'fifth address',
        city: 'fifthCity',
        state: 'fifthState',
        country: 'fifthCountry',
        lat: 555.55,
        lng: 555.55,
        name: "fifthName",
        description: 'fifth description of the first spot',
        price: 55.55,
        previewImage: "fifth url"
      },
      {
        ownerId: 6,
        address: 'sixth address',
        city: 'sixthCity',
        state: 'sixthState',
        country: 'sixthCountry',
        lat: 666.66,
        lng: 666.66,
        name: "sixthName",
        description: 'sixth description of the first spot',
        price: 66.66,
        previewImage: "sixth url"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ["firstName", 'secondName', 'thirdName', 'fourthName', 'fifthName', 'sixthName'] }
    }, {});
  }
};
