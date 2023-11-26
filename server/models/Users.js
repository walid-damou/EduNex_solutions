const Sequelize = require("sequelize");

const User = (db) => {
  db.define(
    "User",
    {
      // Model attributes are defined here

      username: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // defaults to true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      Sequelize,
      paranoid: true,

      deletedAt: "deletedAt",
      // If you want to give a custom name to the deletedAt column
    }
  );
};
module.exports = User;
