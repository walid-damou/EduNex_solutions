"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Providers",
      [
        {
          nom: "CISCO",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          nom: "HUAWEI",
          createdAt: "2022-04-12",
          updatedAt: new Date(),
        },
        {
          nom: "APPLE",
          createdAt: "2022-05-12",
          updatedAt: new Date(),
        },
        {
          nom: "Juniper",
          createdAt: "2022-03-12",
          updatedAt: new Date(),
        },

        {
          nom: "Fortinet",
          createdAt: "2022-01-12",
          updatedAt: new Date(),
        },
        {
          nom: "Microsoft",
          createdAt: "2022-06-12",
          updatedAt: new Date(),
        },
        {
          nom: "Oracle",
          createdAt: "2022-07-12",
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
