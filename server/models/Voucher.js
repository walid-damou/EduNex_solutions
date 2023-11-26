const sequelize = require("sequelize");

const Voucher = (db) => {
  db.define(
    "Voucher",
    {
      code: {
        type: sequelize.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
    }
  );
};

module.exports = Voucher;
