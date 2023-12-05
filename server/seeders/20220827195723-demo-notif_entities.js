"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Notifications_Entities",
      [
        {
          entity: "Cours",
          description: "Course added",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Cours",
          description: "Course removed",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Cours",
          description: "Course updated",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Voucher",
          description: "Voucher asigned to collab",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Voucher",
          description: "Voucher added to societe",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Request",
          description: "sent a request to enroll to",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Request",
          description: "has accepted your request to enroll",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Request",
          description: "has rejected your request to enroll",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Session",
          description: "Collab added to Session ",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Proof",
          description: "has submited a proof of course completion",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Proof",
          description: "has submited a proof of certification",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Proof",
          description: "Course completion accepted",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Proof",
          description: "Certification accepted",
          createdAt: "2022-02-12",
          updatedAt: new Date(),
        },
        {
          entity: "Provider",
          description: "Provider added",
          createdAt: "2022-02-12",
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
