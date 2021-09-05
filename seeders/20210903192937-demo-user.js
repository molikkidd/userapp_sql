'use strict';
// Where we are seeding our information
// for this instance it is coming from faker
// application will run this function first 

const faker = require('faker');

const seedArray = [];
for (let i = 0; i < 100; i++) {
  // create data object
    const newObject = {
        name: faker.name.findName(),
        age: 30,
        email: faker.internet.email(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    // send data objects to seedArray
    seedArray.push(newObject);
}

console.log(seedArray);
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', seedArray, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
