const Sequelize = require("sequelize");
const SuperAdmin = (db) => {
  db.define(
    "SuperAdmin",
    {
      nom: {
        type: Sequelize.STRING,
      },
      prenom: {
        type: Sequelize.STRING,
      },
    },
    { Sequelize, paranoid: true }
  );
};
module.exports = SuperAdmin;
