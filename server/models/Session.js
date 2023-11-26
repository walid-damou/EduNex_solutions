const Sequelize = require("sequelize");
const Session = (db) => {
  db.define(
    "Session",
    {
      // Model attributes are defined here

      nom: {
        type: Sequelize.STRING,
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
      statut: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      Sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
};
module.exports = Session;
