const Cours = require("../../models/Cours");
const Societe = require("../../models/Societe");
const Provider = require("../../models/Provider");
const sequelize = require("sequelize");
module.exports = async (req, res) => {
  cours_count = await Cours.count();
  partners_count = await Provider.count();
  companies_count = await Societe.count();
  companies = await Societe.findAll({ limit: 3, order: ["createdAt"] });
  companies_chart = await Societe.findAll({
    attributes: [
      [db.fn("count", db.col("id")), "count"],
      [db.fn("extract", sequelize.literal('month FROM "createdAt"')), "month"],
    ],
    group: ["month"],
  });
  return res.send({
    cours_count,
    partners_count,
    companies_count,
    companies_chart,
  });
};
