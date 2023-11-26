const Sequelize = require("sequelize");

const Notification_change = (db) => {
  db.define(
    "Notification_change",
    {
      // Model attributes are defined here
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }
    },
    {
      Sequelize,
      paranoid: true,

      deletedAt: "deletedAt",
      // If you want to give a custom name to the deletedAt column
    }
  );
};
module.exports = Notification_change;
