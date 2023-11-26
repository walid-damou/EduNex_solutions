const Sequelize = require("sequelize");

const Notifications_object = (db) => {
  db.define(
    "Notifications_object",
    {
      // Model attributes are defined here
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
module.exports = Notifications_object;
