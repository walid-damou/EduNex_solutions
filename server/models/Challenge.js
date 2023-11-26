const Sequelize = require("sequelize");
const Challenge = (db) => {
  db.define(
    "Challenge",
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
      prix: {
        type: Sequelize.INTEGER,
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
module.exports = Challenge;
