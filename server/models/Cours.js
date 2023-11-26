const Sequelize = require("sequelize");
const Cours = (db) => {
  db.define(
    "Cours",
    {
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

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
    },
    {
      Sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
      hooks: {
        beforeCreate: async (cours, options) => {
          if (!cours.image) {
            provider = await db.models.Provider.findOne({
              where: { id: cours.ProviderId },
            });

            cours.image = provider.image;
            console.log(cours.image);
            console.log(provider);
          }
        },
      },
    },
    {
      indexes: [
        {
          name: "cours_trigram",
          fields: ["nom"],
          using: "GIN",
          concurrently: true,
          operator: "gin_trgm_ops",
        },
      ],
    }
  );
};
module.exports = Cours;
