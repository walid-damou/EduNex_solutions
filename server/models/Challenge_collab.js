const Sequelize = require("sequelize");
const ChallengeCollab = (db) => {
  db.define(
    "ChallengeCollab",
    {
      // Model attributes are defined here

      statut: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      datedebut: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      datefin: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      coursefini: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { Sequelize, paranoid: true }
  );
};
module.exports = ChallengeCollab;
