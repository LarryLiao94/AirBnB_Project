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
        previewImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
        previewImage: "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
        previewImage: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
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
        previewImage: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
        previewImage: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
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
        previewImage: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"
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
