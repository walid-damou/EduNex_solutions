const Sequelize = require("sequelize");
const fields = {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  nom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  prenom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
  },
  email_institu: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  instructor: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  changedpass: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
};
const Collaborateur = (db) => {
  db.define("Collaborateur", fields, {
    Sequelize,
    paranoid: true,
    deletedAt: "deletedAt",
  });
};
module.exports.fields = fields;
module.exports = Collaborateur;
