const db = require("../../config/database");
const { Societe, Collaborateur } = db.models;
module.exports = async (req, res) => {
  companies = await Societe.findAll({
    limit: 3,
subQuery:false,
    order: [["createdAt","DESC"]],
    include: {
      model: Collaborateur,
      attributes: ["nom", "prenom"],
      where: {
        admin: true,
      },
    },
  });
  return res.send({
    companies,
  });
};
