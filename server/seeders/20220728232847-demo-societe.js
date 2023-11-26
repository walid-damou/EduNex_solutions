"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Societes",
      [
        {
          name: "Ja44énnat",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannat2121",
          createdAt: "2021-02-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannat0000",
          createdAt: "2020-07-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannat",
          createdAt: "2022-03-12",
          updatedAt: new Date(),
        },
        {
          name: "J8annat",
          createdAt: "2022-04-12",
          updatedAt: new Date(),
        },
        {
          name: "Jakknnat",
          createdAt: "2022-05-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannppat2",
          createdAt: "2022-03-12",
          updatedAt: new Date(),
        },

        {
          name: "Jannat5",
          createdAt: "2022-01-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannat28",
          createdAt: "2022-06-12",
          updatedAt: new Date(),
        },
        {
          name: "Jannat200",
          createdAt: "2022-07-12",
          updatedAt: new Date(),
        },
        {
          name: "Jansnat28",
          createdAt: "2022-06-12",
          updatedAt: new Date(),
        },
        {
          name: "Janenat200",
          createdAt: "2022-07-12",
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Collaborateurs",
      [
        {
          nom: "Jannat",
          prenom: "Mbappe",
          email: "aazaz@zaaz.fr",
          admin: true,
          instructor: false,
          SocieteId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nom: "Jannat",
          prenom: "Mbappe2",
          email: "aazaz@zaaz.fr",
          admin: true,
          instructor: false,
          SocieteId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nom: "Jansnat",
          prenom: "Mbappe",
          email: "aazaz@zaaz.fr",
          admin: true,
          instructor: false,
          SocieteId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nom: "Jannast",
          prenom: "Mbapwpe",
          email: "aazaz@zaaz.fr",
          admin: true,
          instructor: false,
          SocieteId: 2,
          createdAt: new Date(),
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
