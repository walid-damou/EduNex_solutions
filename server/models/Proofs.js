const Sequelize = require("sequelize");
const { connections } = require("../socket");

const Proof = (db) => {
  db.define("Proof", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
      validate: {
        inside: (value) => {
          const enums = ["accepted", "pending", "refused"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    file: {
      type: Sequelize.STRING,
    },
    name: { type: Sequelize.STRING },
    mimetype: { type: Sequelize.STRING },
    size: { type: Sequelize.INTEGER },
  });
};

module.exports = Proof;
