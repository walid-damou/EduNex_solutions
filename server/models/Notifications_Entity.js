const Sequelize = require("sequelize");

const Notifications_Entity = (db) => {
  db.define(
    "Notifications_Entity",
    {
      // Model attributes are defined here
      entity_type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      entity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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
module.exports = Notifications_Entity;
