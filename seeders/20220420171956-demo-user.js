/* eslint-disable no-undef */

module.exports = {
  async up (queryInterface, Sequelize) {     
      await queryInterface.bulkInsert('User', [{
        firstName: "Rene",
        lastName: "M",
        email: "rene@gmail.com"
     }], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('People', null, {});
  }
};
