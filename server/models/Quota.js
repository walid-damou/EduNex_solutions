const Sequelize = require("sequelize");

const Quota = (db) => {
  db.define(
    "Quota",
    {
      // Model attributes are defined here

      quota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      Sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      indexes: [
        {
          unique: true,
          fields: ["ProviderId", "SocieteId"],
        },
      ],
    }
  );
};

module.exports = Quota;
